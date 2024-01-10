import { writeFileSync } from 'fs';
import { configDotenv } from 'dotenv';

configDotenv();

const dump = `export const firebaseConfig = {
    apiKey: "${process.env.apiKey}",
    authDomain: "${process.env.authDomain}",
    projectId: "${process.env.projectId}",
    storageBucket: "${process.env.storageBucket}",
    messagingSenderId: "${process.env.messagingSenderId}",
    appId: "${process.env.appId}",
    measurementId: "${process.env.measurementId}"
};`

console.log(process.env.projectId)

writeFileSync("./src/firebase/config.js", dump, "utf-8")