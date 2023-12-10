import { setReplierStatus } from "./contacts";

jest.mock('firebase/app', () => {
    __esModule = true
})

jest.mock('firebase/firestore', () => {
    __esModule = true
})

// just todo
test("Sender data from replier contact doc discovered", () => {
    
});