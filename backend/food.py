import eventlet
eventlet.monkey_patch()
import time
import numpy as np
from flask import Flask
from flask_socketio import SocketIO
from ultralytics import YOLO
import cv2

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

model = YOLO("models/yolo11s.pt") 
class_names = model.names  

print("YOLO Class Names Loaded:", class_names)

FOOD_PRICES = {
    "sandwich": 50.0,
    "pizza": 100.0,
    "donut": 40.0,
    "cake": 60.0,
    "hot dog": 70.0
}

LOW_DEMAND_THRESHOLD = 0  
MEDIUM_DEMAND_THRESHOLD = 1  
HIGH_DEMAND_THRESHOLD = 2  

FOOD_EMOJIS = {
    "sandwich": "🥪",
    "pizza": "🍕",
    "donut": "🍩",
    "cake": "🎂",
    "hot dog": "🌭"
}

def adjust_prices(food_counts):
    """Adjust food prices dynamically based on demand."""
    updated_prices = {}

    for food, count in food_counts.items():
        base_price = FOOD_PRICES.get(food, 50.0)  

        if count >= HIGH_DEMAND_THRESHOLD:
            updated_prices[food] = round(base_price * 1.2, 2)  
        elif count <= LOW_DEMAND_THRESHOLD:
            updated_prices[food] = round(base_price * 0.8, 2) 
        else:
            updated_prices[food] = base_price  

    return updated_prices

def generate_marketing_messages(food_counts):
    """Generate targeted marketing messages based on demand trends with emojis."""
    marketing_messages = []

    for food, count in food_counts.items():
        emoji = FOOD_EMOJIS.get(food, "🍽️") 

        if count >= HIGH_DEMAND_THRESHOLD:
            marketing_messages.append(f"🔥 {emoji} {food.capitalize()} is Selling Fast! Get yours before it's gone!")
        elif count == MEDIUM_DEMAND_THRESHOLD:
            marketing_messages.append(f"⭐ {emoji} {food.capitalize()} is a customer favorite! Order now!")
        elif count <= LOW_DEMAND_THRESHOLD:
            marketing_messages.append(f"💥 {emoji} Limited-Time Deal on {food.capitalize()}! Grab yours now!")

    return marketing_messages

def process_video():
    """Process video, detect food items, and emit updates to frontend."""
    cap = cv2.VideoCapture("videos/Food.mp4")

    if not cap.isOpened():
        print("Error: Could not open video file.")
        return

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            print("Restarting video...")
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  
            continue

        results = model(frame)
        food_counts = {food: 0 for food in FOOD_PRICES}  

        for result in results:
            if not hasattr(result, 'boxes') or not hasattr(result.boxes, 'cls'):
                continue  

            class_ids = result.boxes.cls.cpu().numpy()

            for class_id in class_ids:
                food_name = class_names.get(int(class_id), "unknown")  

                if food_name in FOOD_PRICES:
                    food_counts[food_name] += 1

        marketing_messages = generate_marketing_messages(food_counts)

        updated_prices = adjust_prices(food_counts)

        socketio.emit("update_marketing_data", {
            "marketing_messages": marketing_messages,
            "updated_prices": updated_prices
        })

        time.sleep(0.2)  

    cap.release()

@app.route("/")
def index():
    return "✅ Targeted marketing and dynamic pricing backend is running!"

@socketio.on("connect")
def connect():
    print("Client connected.")
    socketio.start_background_task(process_video)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5001, debug=True)
