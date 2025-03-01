import time
import numpy as np
import eventlet
from flask import Flask
from flask_socketio import SocketIO
from ultralytics import YOLO
import cv2

eventlet.monkey_patch()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Load YOLO model (Ensure this is trained for food detection)
model = YOLO("yolov8n.pt")  # Replace with a custom model if needed
class_names = model.names  # Maps class index to name

print("🔍 YOLO Class Names Loaded:", class_names)

# Predefined food items with base prices
FOOD_PRICES = {
    "sandwich": 50.0,
    "pizza": 100.0,
    "donut": 40.0,
    "cake": 60.0,
    "hot dog": 70.0
}

# Demand thresholds for marketing
LOW_DEMAND_THRESHOLD = 1  # Promote items detected ≤ this value
MEDIUM_DEMAND_THRESHOLD = 2  # Regular demand
HIGH_DEMAND_THRESHOLD = 4  # Trending items

def generate_marketing_messages(food_counts):
    """Generate targeted marketing messages based on demand trends."""
    marketing_messages = []

    for food, count in food_counts.items():
        if count >= HIGH_DEMAND_THRESHOLD:
            marketing_messages.append(f"🔥 {food.capitalize()} is Selling Fast! Get yours before it's gone!")
        elif count == MEDIUM_DEMAND_THRESHOLD:
            marketing_messages.append(f"🍽️ {food.capitalize()} is a customer favorite! Order now!")
        elif count <= LOW_DEMAND_THRESHOLD:
            marketing_messages.append(f"💥 Limited-Time Deal on {food.capitalize()}! Grab yours now!")

    return marketing_messages

def process_video():
    """Process video, detect food items, and emit updates to frontend."""
    cap = cv2.VideoCapture("Food.mp4")

    if not cap.isOpened():
        print("❌ Error: Could not open video file.")
        return

    while cap.isOpened():
        ret, frame = cap.read()

        if not ret:
            print("🔄 Restarting video...")
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Restart video from beginning
            continue

        results = model(frame)
        food_counts = {food: 0 for food in FOOD_PRICES}  # Initialize food count

        for result in results:
            if not hasattr(result, 'boxes') or not hasattr(result.boxes, 'cls'):
                continue  # Skip if results are not properly formatted

            class_ids = result.boxes.cls.cpu().numpy()

            for class_id in class_ids:
                food_name = class_names.get(int(class_id), "unknown")  # Map class ID to name

                if food_name in FOOD_PRICES:
                    food_counts[food_name] += 1

        # Generate targeted marketing messages
        marketing_messages = generate_marketing_messages(food_counts)

        # Emit data for targeted marketing
        socketio.emit("update_marketing_data", {
            "marketing_messages": marketing_messages
        })

        time.sleep(0.2)  # Slight delay for smoother processing

    cap.release()

@app.route("/")
def index():
    return "✅ Targeted marketing backend is running!"

@socketio.on("connect")
def connect():
    print("🔗 Client connected.")
    socketio.start_background_task(process_video)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5001, debug=True)
