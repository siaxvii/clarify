# Clarify 🌿
A mobile app for scanning skincare and cosmetic products to quickly understand their ingredients, safety, and potential recall concerns.

---

## Overview

Clarify helps users make informed decisions about the products they use on their skin. By scanning a barcode or searching for a product manually, users can view ingredient details, safety scoring, flagged components, recalls, and additional notes. The app also includes a favorites system, a simple profile section, and an onboarding flow.

The design emphasizes clarity and simplicity, using a minimal visual style and a calm color palette.

---

## Key Features

### Barcode Scanning
- Uses `expo-camera` for real-time barcode detection  
- Custom scan frame overlay  
- Smooth bottom sheet transition into product results  
- Manual barcode entry option for unscannable packaging

### Ingredient Breakdown
- Clean vs flagged ingredient grouping  
- Color-coded ingredient chips  
- Ingredient detail modal with animated backdrop and slide-up panel  
- Concern descriptions for flagged ingredients

### Safety Meter
- Circular safety score meter 
- Displays safety tier (Clean / Moderate / Caution)  
- Shows flagged vs total ingredient counts

### Favorites
- Save any product locally using AsyncStorage  
- Bookmark icon appears on the save button  
- Icon disappears once saved  
- Dedicated “Favorites” tab with saved products

### Product Search
- Local search for demo products  
- Instant filtering by name or brand  
- Navigates to product details on selection

### Profile / Settings
- Lightweight profile page  
- Basic settings and version placeholders

### Onboarding
- Minimal onboarding screen summarizing main features  
- Short descriptive cards  
- “Start scanning” CTA to enter the main app

---

## Tech Stack

- **Framework:** React Native + Expo  
- **Language:** TypeScript  
- **Routing:** Expo Router  
- **Storage:** AsyncStorage  
- **Icons:** Ionicons  
- **Graphics:** `react-native-svg`  
- **Platforms:** iOS + Android

## Installation

```bash
git clone https://github.com/yourname/clarify.git
cd clarify
npm install
npx expo start
```
Open the Expo Go app on your device and scan the QR code to run.
