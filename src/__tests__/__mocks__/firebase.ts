import { vi } from "vitest";

// FireBase mocks

vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(),
}));

vi.mock("firebase/auth", () => {
    const mockAuth = {
        signInWithEmailAndPassword: vi.fn(() => Promise.resolve()),
        createUserWithEmailAndPassword: vi.fn(() => Promise.resolve()),
        signOut: vi.fn().mockResolvedValue(undefined),
        signInWithPopup: vi.fn(() => Promise.resolve()),
        signInWithRedirect: vi.fn(() => Promise.resolve()),
        onAuthStateChanged: vi.fn(),
    };

    class MockGoogleAuthProvider {
        static credential = vi.fn();
    }

return {
    getAuth: () => mockAuth,
    signInWithEmailAndPassword: mockAuth.signInWithEmailAndPassword,
    createUserWithEmailAndPassword: mockAuth.createUserWithEmailAndPassword,
    signOut: mockAuth.signOut,
    onAuthStateChanged: mockAuth.onAuthStateChanged,
    GoogleAuthProvider: MockGoogleAuthProvider,
    signInWithPopup: mockAuth.signInWithPopup,
    signInWithRedirect: mockAuth.signInWithRedirect,
};
});