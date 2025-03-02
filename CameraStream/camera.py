from flask import Flask, render_template, Response
import cv2

video_list = {
    "0": 0,
    "Queue": "D:/OmniSight/backend/videos/Queue.mp4",
    "Food": "D:/OmniSight/backend/videos/Food.mp4",
    "Smoke": "D:/OmniSight/backend/videos/smoke5.mp4",
    "QueueOutside": "D:/OmniSight/backend/videos/QueueOutside.mp4",
    "Suitcase": "D:/OmniSight/backend/videos/Suitcase.mp4",
    "Knife": "D:/OmniSight/backend/videos/Knife.mp4"
}

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def generate_frames(video_path):
    cap = cv2.VideoCapture(video_path)
    while True:
        success, frame = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  
            continue
        
        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/v2')
def video2():
    return Response(generate_frames(video_list["Queue"]),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/v3')
def video3():
    return Response(generate_frames(video_list["Food"]),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/v4')
def video4():
    return Response(generate_frames(video_list["Smoke"]),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/v5')
def video5():
    return Response(generate_frames(video_list["Suitcase"]),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/v6')
def video6():
    return Response(generate_frames(video_list["Knife"]),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/v7')
def video7():
    return Response(generate_frames(video_list["QueueOutside"]),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
   app.run(port=8081, host='0.0.0.0', debug=True)
