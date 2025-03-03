# OmniSight - AI Pioneered Intelligent Crowd and Safety System

| **#** | **Section** | **Description** |
|------|------------|----------------|
| 1 | [Video Link](#video-link) | Links to project video and presentation |
| 2 | [PPT Link](#ppt-link) | Links to project video and presentation |
| 2 | [Project Setup](#project-setup) | Step-by-step setup guide for OmniSight |
| 3 | [Problem Statement](#problem-statement) | Challenges faced in venue management |
| 4 | [Introduction](#introduction) | Overview of OmniSight’s AI-powered solution |
| 5 | [Features](#features) | List of AI-driven functionalities |
| 6 | [AI Models Used](#ai-models-used) | Details of YOLO-based AI models |
| 7 | [Nx Integration](#nx-integration) | Integration with Nx Meta Server & Cloud |
| 8 | [Fire and Smoke Detection](#fire-and-smoke-detection) | AI-based fire & smoke identification |
| 9 | [Crowd Detection](#crowd-detection) | Real-time people detection & heatmaps |
| 10 | [Food Detection](#food-detection) | AI-powered food recognition & tracking |
| 11 | [Threat Detection](#threat-detection) | Detection of suspicious objects |
| 12 | [Architecture Diagram](#architecture-diagram) | Overview of system architecture |
| 13 | [Tech Stack](#tech-stack) | Technologies used in backend, frontend, and AI models |
| 14 | [Algorithmic Approach](#algorithmic-approach) | Explanation of AI algorithms used |
| 15 | [Users](#users) | Who benefits from OmniSight? |
| 16 | [How OmniSight Enhances Venue Management](#how-omnisight-enhances-venue-management) | AI-driven venue optimization |


## Video Link 
- https://www.youtube.com/watch?v=KpVy29CemUc
---

## PPT Link -
- https://docs.google.com/presentation/d/1Yvq1Lp7kJpUXC3dwPQZpuJmGmQN3n9K5EhcRBkSAVCU/edit#slide=id.gd1bf8d60a4_0_0
---

## Project Setup

### **1. To Setup Nx Meta Server & Client**
- https://nx.docs.scailable.net/nx-ai-manager/1.-install-network-optix

### **2. To Setup Nx AI Manager**
- https://nx.docs.scailable.net/nx-ai-manager/2.-install-nx-ai-manager-plugin

### **3. To Setup Nx Test Camera**
- https://support.networkoptix.com/hc/en-us/articles/360018067074-Testcamera-IP-Camera-Emulator 

### **4. To Setup RTSP Video Stream**

- Clone git repository
```sh
git clone https://github.com/JainSneha6/OmniSight.git
```

- Navigate to CameraStream folder

```sh
cd CameraStream
```

- Start the camera server
```sh
python camera.py
```

- Navigate to Nx Meta Client

- Add device and set the link to rtsp as the ip address of the camera server

### **5. Add Model to video stream using Nx AI Manager**

### **6. Setup Frontend**

- Navigate to Frontend Folder

```sh
cd frontend
```

- Install node modules

```sh
npm install
```

- Start the React app

```sh
npm run dev
```

### **7. Setup Backend**

- Install the required modules

- To access Event Manager side

```sh
python app_event.py
```

- To access vendor side

```sh
python app_foodstall.py
python food.py
```

## Problem Statement  

Venue management is an increasingly complex challenge due to:  
- Inefficient crowd control leading to congestion  
- Delays in emergency response  
- Security risks from unidentified objects  
- Long wait times and slow service causing customer dissatisfaction.

---

## Introduction  
Managing large venues efficiently is challenging due to congestion, security risks, and long wait times.  
Our **AI-powered venue management system** integrates video analytics with the **Nx Developer Toolkit** to:  

- Optimize crowd control
- Detect fire and security threats
- Automate food stall queue management & resource allocation
- Wait time analysis & dynamic queue management for events
- Implement dynamic pricing & marketing

This solution ensures **real-time insights**, **enhanced security**, and **seamless customer experience**.

---

## Features  

Our AI-powered venue management system enhances efficiency, security, and customer experience with real-time analytics and automation.  

### **1. Crowd Monitoring & Control** 
- Real-time people detection using **YOLOv8 (People Detection)**  
- Heatmap-based congestion analysis using a **grid-based spatial mapping algorithm**  
- Predictive modeling to prevent overcrowding  

### **2. Fire & Smoke Detection**  
- AI-driven fire and smoke detection using **YOLOv8 (Custom Trained)**  
- Instant alerts to security teams and venue management  
- Integration with emergency response systems for faster action  

### **3. Threat Detection**  
- Identification of suspicious objects such as **unattended bags, knives, and hazardous items** using **YOLOv11s**  
- Real-time alerts and notifications for security personnel  
- Automated tracking of flagged objects using AI-powered object tracking  

### **4. Wait Time Analysis**  
- Uses **Exponential Moving Average (EMA)** for queue size prediction  
- Real-time **wait time estimation** based on queue length and predictive AI modeling  
- Provides estimated service times to improve customer experience  

### **5. Dynamic Queue Management**
- AI-based **real-time queue optimization** for food stalls and event entry  
- Smart allocation of waiting areas to reduce congestion  
- Predictive adjustments to queue formations based on peak and off-peak hours  

### **6. Automated Food Stall Queue & Resource Allocation**  
- AI-driven **staff allocation algorithm** to manage cashiers, cooks, and servers  
- Predictive order flow analysis to prevent food stall bottlenecks  
- Automated load balancing to ensure efficient food service  

### **7. Dynamic Pricing** 
- AI-powered **real-time pricing adjustments** based on demand fluctuations  
- Automated price increases during high demand and discounts during low demand  
- Ensures revenue maximization while balancing customer satisfaction  

### **8. Targeted Marketing**  
- AI-driven **food detection using YOLOv11s (Custom Dataset)** to track demand  
- Personalized promotions based on real-time food stall activity  
- Automated special deals and discounts for low-demand items

This system ensures efficient crowd flow, reduced wait times, enhanced security, and optimized business operations.  

![image](https://github.com/user-attachments/assets/a15ae4b6-350e-4ea1-a952-720d0a35c25b)
![image](https://github.com/user-attachments/assets/1d301cee-afc2-42f7-8b5a-024651dbad92)

---

## AI Models Used  

| Model | Purpose | Technology |
|------------|-------------|------------|
| **Fire & Smoke Detection** | Detects fire hazards | YOLOv8 (Custom Trained) |
| **Crowd Management** | Monitors crowd density and flow | YOLOv8 (People Detection) |
| **Food Detection** | Recognizes food items at stalls | YOLOv11s (Custom Dataset) |
| **Threat Detection** | Identifies objects like suitcases and knives | YOLOv11s |

---

## Nx Integration  

![image](https://github.com/user-attachments/assets/4f2807cc-9698-44d2-895d-b983e168bcaf)

Our system seamlessly integrates with the **Nx Developer Toolkit** to enhance real-time video analytics, security monitoring, and AI-driven automation.  

### **1. Nx Meta Server & Nx Cloud**
- Manages **RTSP video streams, test cameras, AI models, and cloud storage**  
- Ensures **secure, scalable, and real-time AI processing**  

### **2. Nx Meta Client**
- Displays **live video feeds from Nx Meta Server**  
- Enables **remote monitoring and decision-making**  

### **3. Nx Video Analytics Plugin**
- Records **live video streams** and integrates with **YOLOv8, YOLOv11 & OpenCV models**  
- Processes **crowd detection, fire & smoke detection, and object identification**  

### **4. Nx AI Manager**
- Deploys **custom-trained AI models** for:  
  - **Fire & Smoke Detection** - `YOLOv8s trained on custom dataset`  
  - **Food Detection** - `YOLOv11s`  
  - **Crowd Management** - `YOLOv8s`  
  - **Threat Detection** - `YOLOv11s` 


This **Nx-powered integration** ensures **optimized venue management**, **faster response times**, and **improved security**. 

## Fire and Smoke Detection

![WhatsApp Image 2025-03-03 at 12 40 31_c87a7788](https://github.com/user-attachments/assets/e6fd96cc-e660-426f-ace7-d5ed3138ef3b)

## Crowd Detection

![WhatsApp Image 2025-03-03 at 12 43 45_5e673261](https://github.com/user-attachments/assets/2e2c9ec0-25af-43b6-a3c0-555512e79a39)

## Food Detection

![WhatsApp Image 2025-03-03 at 12 44 34_c70c6cca](https://github.com/user-attachments/assets/d8ea70d4-7a17-48fe-8690-65ab523d2df1)
![WhatsApp Image 2025-03-03 at 12 50 51_25549ba0](https://github.com/user-attachments/assets/63ccc1a2-c0c4-42d0-a7be-f59bac844469)

## Threat Detection

![WhatsApp Image 2025-03-03 at 12 53 28_521e5c90](https://github.com/user-attachments/assets/e4fb94f6-ca04-4275-bc6f-3f5cfc62144d)

---

## Architecture Diagram

![image](https://github.com/user-attachments/assets/e0bab392-5fc2-4491-8146-51685f58c615)

---

## Tech Stack  

| Component       | Technology Used                           | Purpose                                  |
|---------------|----------------------------------|------------------------------------------|
| **Backend**   | Python (Flask), Ultralytics, Pytorch, Cuda                 | Handles API requests and business logic  |
| **Frontend**  | React, Tailwind CSS            | Provides user interface and real-time dashboards  |
| **AI Models** | YOLOv8, YOLOv11s (Custom trained) | Detects people, objects, fire, and food items  |
| **Nx Integration** | Nx Meta Server & Client  | Manages video streams and AI model integration |
|               | Nx Cloud                      | Provides cloud-based video storage and processing  |
|               | Nx Video Analytics Plugin     | Integrates AI models for real-time video analysis  |
|               | Nx AI Manager                 | Deploys and manages trained AI models  |

### **Fire & Smoke Detection**
<div align="center"> <img src="https://github.com/user-attachments/assets/1cc0c953-3044-44a8-b278-952973bc6b3d" width="600px"> </div>

### **Crowd Detection**
<div align="center"> <img src="https://github.com/user-attachments/assets/3f7ad376-155c-46f2-a61d-702df02ba1cc" width="600px"> </div>

### **Food Detection**
<div align="center"> <img src="https://github.com/user-attachments/assets/621ee83a-59b5-4684-9278-7d978afc5feb" width="600px"> </div>
<div align="center"> <img src="https://github.com/user-attachments/assets/4b1abdea-c8ae-4772-b410-4fdcba040ebb" width="600px"> </div>

### **Threat Detection**
<div align="center"> <img src="https://github.com/user-attachments/assets/26ee3caf-71fd-478a-ac14-0238049c3a10" width="600px"> </div>
---

## Algorithmic Approach

![image](https://github.com/user-attachments/assets/0df53a3c-0582-40c4-9813-c008399dbff4)

### **1. Real-Time Heatmap Generation**

A **grid-based spatial mapping algorithm** tracks people’s movement, creating live heatmaps.  

#### **Algorithm:**  

1. Capture real-time video feed and detect people.
2. Map detected person’s centroid `(cx, cy)` onto a grid.
3. Update heatmap based on position frequency.

```python
row = cy / cell_height
col = cx / cell_width
```
<div align="center"> <img src="https://github.com/user-attachments/assets/23804a97-fd6d-43d5-9c1a-de3f14efd4c6" width="600px"> </div>

### **2. Exponential Moving Average for Queue Smoothing**

To prevent erratic queue size fluctuations, an **Exponential Moving Average (EMA) algorithm** smooths the data:

#### **Algorithm:**  

1. Measure real-time queue size.
2. Apply EMA smoothing to reduce sudden fluctuations.
3. Use a smoothing factor α (0 < α ≤ 1) to adjust responsiveness.
 
```python
EMA_Size = α * Queue_size + (1 - α) * EMASize
```
<div align="center"> <img src="https://github.com/user-attachments/assets/40381e65-14d9-41e0-97fa-597a54b20c1e" width="600px"> </div>

### **3. Wait time estimation algorithm**

Wait time is estimated dynamically.

#### **Algorithm:**  

1. Measure queue length in real-time.
2. Multiply queue length by the base service time per customer.
3. Provide an estimated waiting time for customers.

```python
Wait_Time = Queue_length * Base Time
```

<div align="center"> <img src="https://github.com/user-attachments/assets/52d84409-a7db-481c-9f7e-98ee2e70902b" width="600px"> </div>

### **4. Dynamic Staff Allocation Algorithm**

The system optimizes staff allocation based on real-time queue size.

#### **Algorithm:**  

1. Compute required staff using EMA queue size.
2. Assign cashiers, cooks, and servers dynamically.
3. Ensure minimum and maximum staff limits.

```python
required_staff = max(1, EMA_Size / 3)
cashiers = min(5, required_staff / 3 + 1)
cooks = min(6, required_staff / 2)
servers = required_staff - cashiers - cooks
```

<div align="center"> <img src="https://github.com/user-attachments/assets/daa166b3-02a9-49c9-a1e6-32a2ec896a5c" width="600px"> </div>

### **5. Dynamic Pricing** 

The system dynamically adjusts pricing and marketing based on demand.

#### **Algorithm:**  
1. Retrieve **current food demand** from sales data.  
2. For each food item:  
   - Check if demand is **high** (≥ HIGH_DEMAND_THRESHOLD).  
     - **Increase price** by 20%.  
   - Check if demand is **low** (≤ LOW_DEMAND_THRESHOLD).  
     - **Decrease price** by 20%.  
   - Otherwise, **keep the base price**.  
3. Update prices dynamically and apply changes to the system.  

```python
  if count >= HIGH_DEMAND_THRESHOLD:
      price = round(base_price * 1.2, 2)  # Increase by 20%
  elif count <= LOW_DEMAND_THRESHOLD:
      price = round(base_price * 0.8, 2)  # Decrease by 20%
  else:
      price = base_price  # Keep base price
```

<div align="center"> <img src="https://github.com/user-attachments/assets/ecd7517a-b779-448b-ad19-4a65f35e6478" width="600px"> </div>

### **6. Targeted Marketing**

Marketing messages are generated based on real-time food stall demand.

#### **Algorithm:**  
1. Check food demand levels.
2. Display different marketing messages based on sales.

```python
if count >= HIGH_DEMAND_THRESHOLD:
    message = f"{food.capitalize()} is selling fast! Get yours before it's gone!"
elif count == MEDIUM_DEMAND_THRESHOLD:
    message = f"{food.capitalize()} is a customer favorite! Order now!"
elif count <= LOW_DEMAND_THRESHOLD:
    message = f"Special deal on {food.capitalize()}! Limited time offer."
```

<div align="center"> <img src="https://github.com/user-attachments/assets/cda5f0e7-1f52-4ebb-b596-1682649c1e0a" width="600px"> </div>

---

## Users  

OmniSight is designed for professionals managing large venues, ensuring security, efficiency, and customer satisfaction with AI-driven automation.  

### **1. Venue Managers & Event Organizers**  
- Monitor **crowd movement** and prevent congestion.  
- Optimize **staff allocation** and facility layout.  
- Analyze **queue formations & wait times**.  
- Enhance customer experience by **reducing wait times**.  
- Optimize **entry/exit flows** for smooth crowd movement.  

### **2. Security Teams & Emergency Response**  
- Detect **suspicious objects** in real time.  
- AI-driven **fire & smoke detection**.  
- Receive **instant alerts** for security threats.   
- Automate **evacuation & emergency response**.   

### **3. Food Stall Operators**  
- AI-powered **queue management** for faster service.  
- **Automate pricing & promotions** dynamically.  
- Predict **order surges & optimize resources**.  

OmniSight enhances venue management with **AI-driven security, real-time analytics, and automated crowd control**.  

![image](https://github.com/user-attachments/assets/8051f486-1e5a-4710-b342-01ba8e27318a)
![image](https://github.com/user-attachments/assets/974d5a7c-0a5a-4216-b69b-01103e00ce7b)

## How OmniSight Enhances Venue Management  

OmniSight transforms **venue management** by leveraging AI-powered automation and real-time analytics to streamline operations, enhance security, and improve the customer experience.  

### 1. **Optimized Crowd Flow & Reduced Congestion**  
- **Real-time people detection (YOLOv8)** monitors crowd density at entry points, walkways, and gathering areas.  
- **Heatmap-based congestion analysis** predicts high-traffic zones, allowing dynamic crowd redirection.  
- **AI-driven queue management** prevents bottlenecks at event entrances, food stalls, and restrooms.  

### 2. **Enhanced Security & Threat Detection**  
- **AI-powered object detection (YOLOv11s)** identifies unattended items, hazardous objects, and suspicious behavior.  
- **Fire & smoke detection (YOLOv8 Custom Trained)** ensures immediate alerts for fire hazards.  
- **Seamless integration with Nx Meta Server & Nx Cloud** provides real-time security monitoring.  

### 3. **Faster Emergency Response & Safety Measures**  
- **Automated emergency alerts** notify security teams instantly in case of threats or hazards.  
- **Integration with emergency response systems** speeds up fire, medical, and security interventions.  
- **Live video analytics** allow remote monitoring for quick decision-making.  

### 4. **Improved Customer Experience & Shorter Wait Times**  
- **Exponential Moving Average (EMA) queue analysis** predicts and manages wait times dynamically.  
- **AI-powered queue allocation** optimizes waiting areas, reducing frustration and improving service speed.  
- **Real-time wait time estimation** keeps visitors informed and enhances satisfaction.  

### 5. **Optimized Food Stall Operations & Resource Management**  
- **Dynamic staff allocation** adjusts the number of cashiers, cooks, and servers based on demand.  
- **Predictive order flow analysis** prevents long queues and improves service efficiency.  
- **Automated load balancing** ensures optimal stall performance.  

### 6. **Revenue Maximization & Intelligent Pricing**  
- **Dynamic pricing algorithms** adjust food and service prices based on real-time demand.  
- **Targeted AI-driven marketing** personalizes promotions to boost sales and optimize inventory.  
- **Automated discounts & surge pricing** help balance customer demand while maximizing revenue.  

With **OmniSight**, venue managers achieve **seamless event operations, enhanced security, and optimized customer experiences**, ensuring smooth and efficient venue management.  


![image](https://github.com/user-attachments/assets/9645ebb6-8707-4e35-9efd-aad46a0c8ba7)



