import { afterEach, beforeEach, describe, test, vi, expect } from "vitest";
import Auth from "../components/auth/Auth";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';

// FireBase mocks

vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(),
}));

vi.mock("firebase/auth", () => {
    const mockAuth = {
        signInWithEmailAndPassword: vi.fn(() => 
            Promise.resolve()
        ),
        createUserWithEmailAndPassword: vi.fn(() => 
            Promise.resolve()
        ),
        signOut: vi.fn().mockResolvedValue(undefined),
        signInWithPopup: vi.fn(() => 
            Promise.resolve()
    ),
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
};
});


describe("Auth page", () => {
    beforeEach(() => {
        render(
            <Auth />
        );
        vi.restoreAllMocks();
    });
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test("renders login and signup forms", () => {
        const h1 = screen.getAllByText("Create Account");
        const googleLogin = screen.getAllByText("Continue with Google");

        expect(h1).not.toBe(null);
        expect(googleLogin).not.toBe(null);

})
    test("switches between login and signup tabs",async () => {

        const loginButton = screen.getByText('Log in', {selector: "button"})
        loginButton.click();

        const signupButton = await screen.findByText('Sign up', {selector: "button"})
        expect(signupButton).not.toBe(null)

        signupButton.click();
        const signupHeading = await screen.findAllByText('Create Account')
        expect(signupHeading).not.toBe(null)
    })

    test("FireBase called upon signing up with form", async () => {

        await userEvent.type(screen.getByLabelText("Email address"), "test@example.fr");
        await userEvent.type(screen.getByLabelText("Password"), "password12345")
        await userEvent.type(screen.getByLabelText("Repeat Password"), "password12345")

        await userEvent.click(screen.getByRole('button', { name: "Create Account" }));

        const { createUserWithEmailAndPassword, getAuth } = await import("firebase/auth");
        const mockAuth = getAuth()
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, "test@example.fr", "password12345");  
    })

    test("Firebase called upon logging in with form", async() => {


        await userEvent.click(screen.getByText("Log in", {selector: "button"}))
        await userEvent.type(screen.getByLabelText("Email address"), "test@example.fr");
        await userEvent.type(screen.getByLabelText("Password"), "password12345");
        
        await userEvent.click(screen.getByRole("button", { name: "Log in"}));

        const { signInWithEmailAndPassword, getAuth } = await import ("firebase/auth");
        const mockAuth = getAuth()
        expect (signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, "test@example.fr", "password12345");

    })

    test("Google auth called when clicking button", async () => {
       const googleButton = await screen.findByText("Continue with Google")
       await userEvent.click(googleButton)

       const { signInWithPopup } = await import("firebase/auth");
       expect (signInWithPopup).toHaveBeenCalled();
    })
})