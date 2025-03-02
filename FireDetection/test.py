import matplotlib.pyplot as plt
import cv2
from ultralytics import YOLO
import torch

old_load = torch.load

def my_load(*args, **kwargs):
    kwargs['weights_only'] = False
    return old_load(*args, **kwargs)

torch.load = my_load

def main():
    # Ensure correct paths
    model_path = 'C:/Users/hsura/Desktop/Projects/NX/runs/detect/train3/weights/best.pt'
    test_image = 'C:/Users/hsura/Desktop/Projects/NX/img1.jpg'
    
    # Load the trained YOLO model
    model = YOLO(model_path)

    # Load image using OpenCV
    img = cv2.imread(test_image)
    if img is None:
        print("Error: Test image not found or unable to load.")
        return

    # Run inference
    results = model.predict(test_image)  # Just use model(image) instead of predict()
    
    # Process and visualize results
    for result in results:
        annotated_frame = result.plot()  # Get the annotated image

        # Display the image using Matplotlib
        plt.figure(figsize=(10, 10))
        plt.imshow(cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB))
        plt.title("Test Image Predictions")
        plt.axis("off")
        plt.show()
if __name__ == '__main__':
    main()
