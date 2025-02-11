import cv2
import numpy as np
from ultralytics import YOLO
from deepface import DeepFace
import mediapipe as mp

# Load YOLOv8 for object detection
model = YOLO("yolov8n.pt")  # Using YOLOv8 nano model

# Initialize MediaPipe Pose for body posture analysis
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Function to analyze facial expressions
def analyze_face(frame):
    try:
        emotions = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
        if emotions:
            return emotions[0]['dominant_emotion']
    except:
        return None
    return None

# Function to analyze body posture using MediaPipe
def analyze_body(frame):
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)
    return results.pose_landmarks

# Open webcam for live video capture (0 = default webcam)
cap = cv2.VideoCapture('/content/your_video.mp4')  # Change to video file path if needed

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLOv8 for object detection
    results = model(frame)
    persons_detected = [obj for obj in results[0].boxes.data if obj[5] == 0 and obj[4] > 0.5]  # Class 0 = Person, Confidence > 50%

    uneasiness_detected = False
    uneasiness_reason = []

    for person in persons_detected:
        x1, y1, x2, y2, conf, cls = map(int, person.tolist())

        # Extract face for emotion detection
        face = frame[y1:y2, x1:x2]
        emotion = analyze_face(face)

        # Analyze body language
        body_landmarks = analyze_body(frame)

        # Check for anxiety-related emotions
        uneasy_emotions = ["fear", "sad", "surprise", "disgust", "angry"]
        if emotion and emotion.lower() in uneasy_emotions:
            uneasiness_detected = True
            uneasiness_reason.append(f"Emotion: {emotion}")

        # Check for unusual body posture
        if body_landmarks:
            head_lowered = False
            defensive_posture = False
            hands_raised = False

            # Get key body points
            nose = body_landmarks.landmark[mp_pose.PoseLandmark.NOSE]
            left_hand = body_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
            right_hand = body_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
            left_shoulder = body_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
            right_shoulder = body_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]

            # Head lowered (nose below shoulders)
            if nose.y > left_shoulder.y and nose.y > right_shoulder.y:
                head_lowered = True
                uneasiness_reason.append("Head lowered (possible distress)")

            # Defensive posture (shoulders raised or hands close to face)
            if left_hand.y < left_shoulder.y or right_hand.y < right_shoulder.y:
                defensive_posture = True
                uneasiness_reason.append("Defensive posture detected")

            # Hands raised above head
            if left_hand.y < 0.3 or right_hand.y < 0.3:
                hands_raised = True
                uneasiness_reason.append("Raised hands detected")

            # If any body language signs are detected, mark as uneasy
            if head_lowered or defensive_posture or hands_raised:
                uneasiness_detected = True

        # Draw bounding box and label
        color = (0, 0, 255) if uneasiness_detected else (0, 255, 0)
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        label = "Uneasy" if uneasiness_detected else "Normal"
        cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # Show real-time video with detections
    cv2.imshow()("Real-Time Uneasiness Detection", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
