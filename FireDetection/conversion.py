import torch
from ultralytics import YOLO
import onnx
import onnx_graphsurgeon as gs
import os

def train_and_export_model():
    
    trained_model_path = "yolov8n.pt"  

    trained_model = YOLO(trained_model_path)  
    trained_model.export(format="onnx", imgsz=640, opset=9)
    onnx_model_path = "yolov8n.onnx"

    onnx_model = onnx.load(onnx_model_path)
    graph = gs.import_onnx(onnx_model)

    for inp in graph.inputs:
        if "images" in inp.name:
            inp.name = "image"

    for out in graph.outputs:
        if "output0" in out.name:
            out.name = "bboxes-format:xyxysc;0:person;1:bicycle;2:car;3:motorbike;4:aeroplane;5:bus;6:train;7:truck;8:boat;9:traffic light;10:fire hydrant;11:stop sign;12:parking meter;13:bench;14:bird;15:cat;16:dog;17:horse;18:sheep;19:cow;20:elephant;21:bear;22:zebra;23:giraffe;24:backpack;25:umbrella;26:handbag;27:tie;28:suitcase;29:frisbee;30:skis;31:snowboard;32:sports ball;33:kite;34:baseball bat;35:baseball glove;36:skateboard;37:surfboard;38:tennis racket;39:bottle;40:wine glass;41:cup;42:fork;43:knife;44:spoon;45:bowl;46:banana;47:apple;48:sandwich;49:orange;50:broccoli;51:carrot;52:hot dog;53:pizza;54:donut;55:cake;56:chair;57:sofa;58:potted plant;59:bed;60:dining table;61:toilet;62:tv monitor;63:laptop;64:mouse;65:remote;66:keyboard;67:cell phone;68:microwave;69:oven;70:toaster;71:sink;72:refrigerator;73:book;74:clock;75:vase;76:scissors;77:teddy bear;78:hair drier;79:toothbrush"

    onnx_model = gs.export_onnx(graph)

    onnx_model.ir_version = 9
    onnx.save(onnx_model, onnx_model_path)

    loaded_model = onnx.load(onnx_model_path)
    print(f"Updated IR Version: {loaded_model.ir_version}") 

    print(f"Model successfully trained, saved as {onnx_model_path}, and metadata added.")

if __name__ == "__main__":
    import multiprocessing
    multiprocessing.set_start_method('spawn', force=True)
    train_and_export_model()
