# AI-Powered Venue Management System  

## Problem Statement  

Venue management is an increasingly complex challenge due to:  
- Inefficient crowd control leading to congestion  
- Delays in emergency response  
- Security risks from unidentified objects  
- Long wait times and slow service causing customer dissatisfaction  

This project integrates **AI-powered video analytics** with the **Nx Developer Toolkit** to optimize venue operations in real time.  

---

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

```python
row = cy / cell_height
col = cx / cell_width
```
## Exponential Moving Average for Queue Smoothing

To prevent erratic queue size fluctuations, an **Exponential Moving Average (EMA) algorithm** smooths the data:
 
```python
EMA_Size = α * Queue_size + (1 - α) * EMASize
```

### Wait time estimation algorithm

Wait time is estimated dynamically:

```python
Wait_Time = Queue_length * Base Time
```

### Dynamic Staff Allocation Algorithm

The system optimizes staff allocation based on real-time queue size.

```python
required_staff = max(1, EMA_Size / 3)
cashiers = min(5, required_staff / 3 + 1)
cooks = min(6, required_staff / 2)
servers = required_staff - cashiers - cooks
```

### Dynamic Pricing 

The system dynamically adjusts pricing and marketing based on demand.

```python
if demand > HIGH_THRESHOLD:
    price *= 1.2  # Increase price for high-demand items
elif demand < LOW_THRESHOLD:
    price *= 0.8  # Offer discounts for low-demand items
```

## Targeted Marketing

Marketing messages are generated based on real-time food stall demand.

```python
if count >= HIGH_DEMAND_THRESHOLD:
    message = f"{food.capitalize()} is selling fast! Get yours before it's gone!"
elif count == MEDIUM_DEMAND_THRESHOLD:
    message = f"{food.capitalize()} is a customer favorite! Order now!"
elif count <= LOW_DEMAND_THRESHOLD:
    message = f"Special deal on {food.capitalize()}! Limited time offer."
```




