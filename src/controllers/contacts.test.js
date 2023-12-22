import { doc } from "firebase/firestore";
import { jest } from "@jest/globals";
import { setReplierStatus } from "./contacts";

jest.mock('firebase/app', () => ({
    __esModule: true,
    initializeApp: jest.fn()
}))

// jest.mock('firebase/firestore', () => ({
//     __esModule: true
// }))

const dummyContact = {
    sender: {
        uid: "Xp8WTZGBjcg8XAHKNVO3dpEODkq1",
        username: "norandrn",
        email: "oki@mail.com",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/norman-case-projects.appspot.com/o/profiles%2Fuser-Xp8WTZGBjcg8XAHKNVO3dpEODkq1.jpg?alt=media&token=4211e237-5363-49f0-a40f-34bae5553862"
    },
    replier: {
        photoURL: "https://firebasestorage.googleapis.com/v0/b/norman-case-projects.appspot.com/o/profiles%2Fuser-5LvvLTqpeiQYZX53Z5G2yOhJDB52.jpg?alt=media&token=15af224c-97ad-417b-9359-4cde9b8e194c",
        username: "Pomni",
        uid: "5LvvLTqpeiQYZX53Z5G2yOhJDB52",
        email: "pomni.tadc@mail.com"
    },
    chatId: "d0Bu38sW4R50WOGbaDQW"
}

// just todo
describe("Sender test", () => {
    it("Sender data from replier contact doc discovered", async () => {
        // const mocDocRef = doc();
        const { sender, replier, chatId } = dummyContact;

        await setReplierStatus(sender, replier, chatId);

        expect("dom").toBe("dom");
    })
});