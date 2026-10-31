# 💧 Smart Water Leakage Detection and Monitoring System

A frontend-only prototype that simulates how a building can detect water leakage early using flow and moisture sensors, and alert the user through a live dashboard.

> EVS college assignment. Sensor data is simulated; no real hardware is used.

## 📌 Problem Statement
Water leakage and wastage in buildings often go unnoticed for hours or days, wasting large amounts of water and increasing bills. This project demonstrates a simple way to detect leaks early and locate them quickly.

## ✨ Features
- Live dashboard that refreshes every 2 seconds
- Simulated flow (L/min) and moisture (%) sensors
- 5 monitored locations: Kitchen, Bathroom, Utility Room, Water Tank, Main Pipeline
- Three controls: **Simulate Normal Usage**, **Simulate Water Leakage**, **Reset**
- Instant alert with the leak location, highlighted with a red pulsing card
- Counters for current flow, today's usage, water wasted and water saved
- Live water consumption graph drawn with HTML Canvas (red points mark abnormal readings)
- Responsive layout for desktop and mobile

## ⚙️ How It Works
1. **Sensor data:** JavaScript generates random flow and moisture values for each location.
2. **Processing:** the dashboard updates every 2 seconds; each update represents 1 minute of usage.
3. **Leak detection:** a location is flagged as a leak if moisture is above 70% **or** flow is more than 2× its normal value.
4. **Alert:** the dashboard shows a warning, highlights the affected location and counts the water wasted.

```
Water Flow Sensor → Moisture Sensor → Data Processing → Leak Detection → Web Dashboard → User Alert
```

## 🛠️ Tech Stack
| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, grid/flexbox layout, animations |
| JavaScript (ES6) | Simulation, detection logic, live updates |
| HTML Canvas | Live consumption graph |

No backend, database, login, external libraries, APIs, AI/ML or IoT hardware.

## 📁 Project Structure
```
├── index.html   # Page structure
├── style.css    # Styling and animations
├── script.js    # Simulation, detection and chart logic
└── README.md
```

## ▶️ How to Run
1. Download or clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/smart-water-leakage-detection.git
   ```
2. Open `index.html` in any web browser.

## 🧪 Demo Steps
1. Open the page: all locations show **Normal**.
2. Click **Simulate Water Leakage**: an alert appears, one location turns red, and the wasted-water counter increases.
3. Click **Simulate Normal Usage**: the alert clears and Water Saved increases.
4. Click **Reset** to start over.

## 🌍 Environmental Benefits
- Reduces water wastage
- Detects leaks early
- Saves water
- Lowers water bills
- Supports sustainable water management

## ⚠️ Limitations
- Sensor data is simulated with random values
- Detection is threshold-based, not machine learning
- "Water Saved" is an estimate (assumes 30 minutes of leakage avoided)
- No data storage; values reset on page refresh

## 🚀 Future Scope
- Connect real flow and moisture sensors using ESP32/Arduino
- Add a backend and database for history
- SMS or mobile app notifications
- Automatic valve shut-off
- ML-based leak prediction

## 👤 Author
Gautam A, EVS Assignment
