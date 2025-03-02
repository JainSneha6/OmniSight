import matplotlib.pyplot as plt
import cv2
from ultralytics import YOLO
import torch

old_load = torch.load

def my_load(*args, **kwargs):
    kwargs['weights_only'] = False
    return old_load(*args, **kwargs)

torch.load = my_load
model_path = 'C:/Users/hsura/Desktop/Projects/NX/runs/detect/train3/weights/best.pt'
test_image = 'C:/Users/hsura/Desktop/Projects/NX/test1.png'
    

model = YOLO(model_path)

results = model.predict(test_image, stream=False)
if isinstance(results, list):
    for result in results:
        print("Predictions:", result.boxes)


