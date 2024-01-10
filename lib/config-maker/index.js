import { writeFileSync } from 'fs';
import { configDotenv } from 'dotenv';

configDotenv();

// Make sure the enviroment variable is in the root of the project directory
const dump = `export const firebaseConfig = {
    apiKey: "${process.env.apiKey}",
    authDomain: "${process.env.authDomain}",
    projectId: "${process.env.projectId}",
    storageBucket: "${process.env.storageBucket}",
    messagingSenderId: "${process.env.messagingSenderId}",
    appId: "${process.env.appId}",
    measurementId: "${process.env.measurementId}"
};`

writeFileSync("./src/firebase/config.js", dump, "utf-8")