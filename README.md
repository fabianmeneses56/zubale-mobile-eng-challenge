**React Native Technical Test Project**

This repository contains the implementation of the React Native technical test, demonstrating knowledge in:

- Folder and module structure.
- Navigation using React Navigation.
- State management with `useState` and `useEffect`.
- Consuming remote APIs.
- Data persistence with AsyncStorage.
- Reusable components and styling with StyleSheet.

---

## ✨ Features

- List of items fetched from a public API.
- "Like" and "saved" functionality with persistence in AsyncStorage.
- Screen navigation with React Navigation.
- Styled components that adapt to SafeArea.

---

## 🛠 Technologies

- React Native 0.80.x
- React Navigation 7.x
- AsyncStorage (`@react-native-async-storage/async-storage`)
- Axios and TanStack Query (React Query)
- Moment.js for date formatting
- React Native Vector Icons

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fabianmeneses56/zubale-mobile-eng-challenge.git
   cd zubale-mobile-eng-challenge
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install pods (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

---

## ▶ Usage

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

Make sure you have an emulator or device connected.

---

## 🧰 Available Commands

```bash
# Start Metro Bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run linters
npm run lint

# Run tests
npm run test
```
