import cv2
import torch
import matplotlib.pyplot as plt
from ultralytics import YOLO

# Fixing the torch load issue
old_load = torch.load
def my_load(*args, **kwargs):
    kwargs['weights_only'] = False
    return old_load(*args, **kwargs)
torch.load = my_load

def main():
    # Define paths
    model_path = 'C:/Users/hsura/Desktop/Projects/NX/runs/detect/train3/weights/best.pt'
    video_path = 'C:/Users/hsura/Desktop/Projects/NX/test3.mp4'  # Update with your video file path
    output_path = 'C:/Users/hsura/Desktop/Projects/NX/output.avi'  # Path to save the output video

    # Load YOLO model
    model = YOLO(model_path)

    # Open video
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error: Cannot open video file.")
        return

    # Get video properties
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fourcc = cv2.VideoWriter_fourcc(*'XVID')  # Codec for output file
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break  # End of video

        # Run YOLO inference
        results = model(frame)

        # Process and display results
        for result in results:
            annotated_frame = result.plot()  # Get annotated frame
        
        # Write to output video file
        out.write(annotated_frame)
        cv2.waitKey(1)


        # Display live video (optional)
        cv2.imshow("YOLO Detection", annotated_frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to exit early
            break

    # Cleanup
    cap.release()
    out.release()
    cv2.destroyAllWindows()
    print(f"Processed video saved to: {output_path}")

if __name__ == '__main__':
    main()
