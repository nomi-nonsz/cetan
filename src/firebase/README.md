# Create your "config.js" in this directory

Example:
```javascript
// Firebase Configuration
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## How to get your Firebase configuration

1. Open your [Firebase console](https://console.firebase.google.com/)
2. Choose your app, if you haven't already, create it then copy the config.
3. Go to **Project settings**, usually located on the left side.
4. Look for **SDK setup and configuration** at the bottom the choose **config**
5. Copy the config
6. Paste in `config.js`
7. Don't forget to `export` the config variable

Aight?!