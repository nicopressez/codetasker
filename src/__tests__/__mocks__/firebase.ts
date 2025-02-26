import { vi } from "vitest";

const mockAuth = {
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
}

vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(),
}))

vi.mock("firebase/auth", () => ({
    getAuth: () => mockAuth,
    signInWithEmailAndPassword: () => mockAuth.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: () => mockAuth.createUserWithEmailAndPassword,
    signOut : () => mockAuth.signOut,
    onAuthStateChanged: () => mockAuth.onAuthStateChanged,
}))

export { mockAuth }