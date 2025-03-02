import cv2
import torch
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt

old_load = torch.load
def my_load(*args, **kwargs):
    kwargs['weights_only'] = False
    return old_load(*args, **kwargs)
torch.load = my_load


BBOXES_NAME = "bboxes-format:xyxysc;0:fire;1:smoke"
SCORES_NAME = "scores-0:fire;1:smoke"

def postprocess_results(results):
    """
    Convert model results into a dictionary that meets Nx AI Manager's expected format.
    """

    out = {
        BBOXES_NAME: np.empty((0, 6), dtype=np.float32), 
        SCORES_NAME: np.zeros((1, 2), dtype=np.float32)      
    }

    if len(results) == 0:
        return out

    result = results[0]
    if not hasattr(result, "boxes"):
        print("Warning: Result does not have boxes attribute!")
        return out

    bboxes = result.boxes.data.cpu().numpy()  # shape (n, 6)
    out[BBOXES_NAME] = bboxes.astype(np.float32)

    scores = np.zeros(2, dtype=np.float32) 
    if bboxes.shape[0] > 0:
        for det in bboxes:
            cls = int(det[5])
            conf = det[4]
            scores[cls] = max(scores[cls], conf)

    out[SCORES_NAME] = scores.reshape(1, -1)
    
    return out

def run_inference_on_image(model, image_path, show=False):
   
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Image not found or unable to load: " + image_path)

    results = model(image_path)
    
    nx_outputs = postprocess_results(results)
    
    if show:

        annotated_frame = results[0].plot()
        plt.figure(figsize=(10,10))
        plt.imshow(cv2.cvtColor(annotated_frame, cv2.COLOR_BGR2RGB))
        plt.title("Predictions")
        plt.axis("off")
        plt.show()
    
    return nx_outputs

def main():

    model_path = 'C:/Users/hsura/Desktop/Projects/NX/runs/detect/train3/weights/best.pt'
    test_image = 'C:/Users/hsura/Desktop/Projects/NX/img1.jpg'
    

    model = YOLO(model_path)

    outputs = run_inference_on_image(model, test_image, show=True)

    print("Nx AI Manager Outputs:")
    for key, value in outputs.items():
        print(f"{key}: {value}")

if __name__ == '__main__':
    main()
