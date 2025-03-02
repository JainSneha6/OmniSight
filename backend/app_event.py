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

model = YOLO("models/yolov8s.pt")

GRID_ROWS = 10
GRID_COLS = 20
PEAK_THRESHOLD = 15  
QUEUE_SPLIT_THRESHOLD = 12
SMOOTHING_FACTOR = 0.2  

def estimate_wait_time(queue_length):
    base_time = 2  
    return queue_length * base_time

def process_video():
    cap = cv2.VideoCapture("videos/Queue.mp4")
    
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    cell_width = frame_width // GRID_COLS
    cell_height = frame_height // GRID_ROWS

    ema_queue_size = 0.0
    active_queues = 1  

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)
        grid = np.zeros((GRID_ROWS, GRID_COLS), dtype=int)

        queue_size = 0
        for result in results:
            boxes = result.boxes.xyxy.cpu().numpy()
            class_ids = result.boxes.cls.cpu().numpy()

            for box, class_id in zip(boxes, class_ids):
                if class_id == 0:  
                    x1, y1, x2, y2 = map(int, box)
                    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                    row, col = cy // cell_height, cx // cell_width

                    if 0 <= row < GRID_ROWS and 0 <= col < GRID_COLS:
                        grid[row, col] += 1
                        queue_size += 1

        required_staff = max(1, int(ema_queue_size / 3))  
        ema_queue_size = SMOOTHING_FACTOR * queue_size + (1 - SMOOTHING_FACTOR) * ema_queue_size
        avg_wait_time = estimate_wait_time(queue_size)

        if queue_size > PEAK_THRESHOLD:
            required_cashiers = min(5, required_staff // 3 + 1)
            required_cooks = min(6, required_staff // 2)
            required_servers = required_staff - required_cashiers - required_cooks
        else:
            required_cashiers = max(1, required_staff // 4)
            required_cooks = max(1, required_staff // 3)
            required_servers = required_staff - required_cashiers - required_cooks

        required_cashiers = max(1, required_cashiers)
        required_cooks = max(1, required_cooks)
        required_servers = max(1, required_servers)

        max_people = np.max(grid) if np.max(grid) > 0 else 1
        heatmap = (grid / max_people).tolist()

        avg_wait_time = estimate_wait_time(queue_size)
        
        if queue_size > 0:
            active_queue_sizes = [queue_size]
            active_wait_times = [avg_wait_time]
        else:
            active_queue_sizes = [1]  
            active_wait_times = [2]  

        suggested_queues = 1
        suggested_queue_sizes = [queue_size] if queue_size > 0 else [1]
        suggested_wait_times = [avg_wait_time] if queue_size > 0 else [2]

        if queue_size > QUEUE_SPLIT_THRESHOLD:
            suggested_queues = 2  
            suggested_queue_sizes = [queue_size // 2, queue_size // 2]
            suggested_wait_times = [estimate_wait_time(suggested_queue_sizes[0]), 
                                    estimate_wait_time(suggested_queue_sizes[1])]

        # ---- Emit Updated Data ----
        socketio.emit("update_grid", {
            "grid": heatmap,
            "queue_size": int(queue_size),
            "wait_time":int(avg_wait_time),
            "active_queues": active_queues,
            "suggested_queues": suggested_queues,
            "active_queue_sizes": active_queue_sizes,
            "active_wait_times": active_wait_times,
            "suggested_queue_sizes": suggested_queue_sizes,
            "suggested_wait_times": suggested_wait_times,
            "required_staff": int(required_staff),
            "cashiers": int(required_cashiers),
            "cooks": int(required_cooks),
            "servers": int(required_servers)
        })

        time.sleep(0.1)
    
    cap.release()

@app.route("/")
def index():
    return "Resource allocation backend running."

@socketio.on("connect")
def connect():
    print("Client connected.")
    socketio.start_background_task(process_video)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5002, debug=True)
