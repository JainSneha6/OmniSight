import torch

old_load = torch.load

def my_load(*args, **kwargs):
    kwargs['weights_only'] = False
    return old_load(*args, **kwargs)

torch.load = my_load
from ultralytics import YOLO
def main():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")

    model_path = 'C:/Users/hsura/Desktop/Projects/NX/-q/yolov10n.pt'
    data_yaml = 'C:/Users/hsura/Desktop/Projects/NX/data.yaml'

    with open(data_yaml, 'r') as f:
        print("Dataset YAML file content:")
        print(f.read())

    model = YOLO(model_path)
    
    model.train(
        data=data_yaml,
        epochs=30,
        batch=32,
        imgsz=640,
        plots=True,
        device=device
    )
    
    print("Training complete!")

if __name__ == '__main__':

    main()




    