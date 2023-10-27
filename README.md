# Cetan

My first firebase chat app :D Yayy! i was a little worried that this project would end just because of stuck skills, but now it's going well.

<img src="https://media.tenor.com/1BCeG1aTiBAAAAAd/temptation-stairway-ena.gif" width=300>

## Features

Cetan is a realtime chat app built with **React** and **Firebase**, it includes features such as:

- Mobile Responsive design
- Realtime Chat
- Send images and files included
- Themes (coming soon)
- Group Chat (coming soon)
- Sound Recording (coming soon)
- GPT-3.5 Chatbot (coming soon)

This will be a Whatsapp clone 🔥️🔥️🗣️🗣️

## Project Usage

### Setup

This project has several main dependencies including:

- React
- Vite
- Sass
- Firebase SDK

### Usage

1. Clone the project

    ```bash
    git clone https://github.com/norman-andrians/cetan.git && cd cetan
    ```

2. Install depedencies by using `npm i` for npm, `yarn` for yarn, and `pnpm` for pnpm

3. Create a `config.js` file for Firebase configuration in [src/firebase](./src/firebase), for the example:
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
    Make sure you have created an app in your Firebase. Otherwise you don't know where your app configuration, [here's the guide](./src/firebase/README.md)

4. Run the project
    ```bash
    npm dev
    ```
    ```bash
    yarn dev
    ```
    ```bash
    pnpm dev
    ```

# Special thanks

This app is made based on the guidance and reference from the **[Lama Dev](https://www.youtube.com/@LamaDev/featured)** tutorial.

This app may not be able to proceed if it does not follow the procedure, although many things are lacking from the video but from a little study of this tutorial, I can make an application with my first Firebase without a hitch.

Video: [Chat App using React and Firebase | Realtime Private Chat Application](https://youtu.be/k4mjF4sPITE?si=mXVlRgZrVyTb3BwM)

Thank You ❤️

<img src="https://media.tenor.com/vVt8ZtnN08AAAAAd/ena-enadreambbq.gif" width=300>