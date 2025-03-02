# OmniSight - AI Pioneered Intelligent Crowd and Safety System

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

### Crowd Monitoring & Control  
- Real-time people detection using **YOLOv8 (People Detection)**  
- Heatmap-based congestion analysis using a **grid-based spatial mapping algorithm**  
- Predictive modeling to prevent overcrowding  

### Fire & Smoke Detection  
- AI-driven fire and smoke detection using **YOLOv8 (Custom Trained)**  
- Instant alerts to security teams and venue management  
- Integration with emergency response systems for faster action  

### Threat Detection  
- Identification of suspicious objects such as **unattended bags, knives, and hazardous items** using **YOLOv11s**  
- Real-time alerts and notifications for security personnel  
- Automated tracking of flagged objects using AI-powered object tracking  

### Wait Time Analysis  
- Uses **Exponential Moving Average (EMA)** for queue size prediction  
- Real-time **wait time estimation** based on queue length and predictive AI modeling  
- Provides estimated service times to improve customer experience  

### Dynamic Queue Management  
- AI-based **real-time queue optimization** for food stalls and event entry  
- Smart allocation of waiting areas to reduce congestion  
- Predictive adjustments to queue formations based on peak and off-peak hours  

### Automated Food Stall Queue & Resource Allocation  
- AI-driven **staff allocation algorithm** to manage cashiers, cooks, and servers  
- Predictive order flow analysis to prevent food stall bottlenecks  
- Automated load balancing to ensure efficient food service  

### Dynamic Pricing  
- AI-powered **real-time pricing adjustments** based on demand fluctuations  
- Automated price increases during high demand and discounts during low demand  
- Ensures revenue maximization while balancing customer satisfaction  

### Targeted Marketing  
- AI-driven **food detection using YOLOv11s (Custom Dataset)** to track demand  
- Personalized promotions based on real-time food stall activity  
- Automated special deals and discounts for low-demand items  

---

This system ensures efficient crowd flow, reduced wait times, enhanced security, and optimized business operations.  



## AI Models Used  

| Model | Purpose | Technology |
|------------|-------------|------------|
| Fire & Smoke Detection | Detects fire hazards | YOLOv8 (Custom Trained) |
| Crowd Management | Monitors crowd density and flow | YOLOv8 (People Detection) |
| Food Detection | Recognizes food items at stalls | YOLOv11s (Custom Dataset) |
| Dangerous Object Detection | Identifies objects like suitcases and knives | YOLOv11s |

---

## Real-Time Heatmap Generation  

A **grid-based spatial mapping algorithm** tracks people’s movement, creating live heatmaps.  

### **Algorithm:**  

1. Capture real-time video feed and detect people.
2. Map detected person’s centroid `(cx, cy)` onto a grid.
3. Update heatmap based on position frequency.

```python
row = cy / cell_height
col = cx / cell_width
```
![Crowd Management](https://github.com/user-attachments/assets/23804a97-fd6d-43d5-9c1a-de3f14efd4c6)

## Exponential Moving Average for Queue Smoothing

To prevent erratic queue size fluctuations, an **Exponential Moving Average (EMA) algorithm** smooths the data:

### **Algorithm:**  

1. Measure real-time queue size.
2. Apply EMA smoothing to reduce sudden fluctuations.
3. Use a smoothing factor α (0 < α ≤ 1) to adjust responsiveness.
 
```python
EMA_Size = α * Queue_size + (1 - α) * EMASize
```

![DynamicQueueManagement](https://github.com/user-attachments/assets/40381e65-14d9-41e0-97fa-597a54b20c1e)

### Wait time estimation algorithm

Wait time is estimated dynamically.

### **Algorithm:**  

1. Measure queue length in real-time.
2. Multiply queue length by the base service time per customer.
3. Provide an estimated waiting time for customers.

```python
Wait_Time = Queue_length * Base Time
```

![WaitTimeAnalaysis](https://github.com/user-attachments/assets/52d84409-a7db-481c-9f7e-98ee2e70902b)

### Dynamic Staff Allocation Algorithm

The system optimizes staff allocation based on real-time queue size.

### **Algorithm:**  

1. Compute required staff using EMA queue size.
2. Assign cashiers, cooks, and servers dynamically.
3. Ensure minimum and maximum staff limits.

```python
required_staff = max(1, EMA_Size / 3)
cashiers = min(5, required_staff / 3 + 1)
cooks = min(6, required_staff / 2)
servers = required_staff - cashiers - cooks
```

![ResourceAllocation](https://github.com/user-attachments/assets/daa166b3-02a9-49c9-a1e6-32a2ec896a5c)


### Dynamic Pricing 

The system dynamically adjusts pricing and marketing based on demand.

### **Algorithm:**  
1. Monitor food demand.
2. Adjust pricing based on thresholds:
     - Increase price during high demand.
     - Decrease price when demand is low.

```python
if demand > HIGH_THRESHOLD:
    price *= 1.2  # Increase price for high-demand items
elif demand < LOW_THRESHOLD:
    price *= 0.8  # Offer discounts for low-demand items
```

![DynamicPricing](https://github.com/user-attachments/assets/ecd7517a-b779-448b-ad19-4a65f35e6478)


## Targeted Marketing

Marketing messages are generated based on real-time food stall demand.

### **Algorithm:**  
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

![TargetedMarketing](https://github.com/user-attachments/assets/cda5f0e7-1f52-4ebb-b596-1682649c1e0a)




