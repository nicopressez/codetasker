import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Auth from "../components/auth/Auth";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


// FireBase mocks

vi.mock("firebase/app", () => ({
    initializeApp: vi.fn(),
}));

vi.mock("firebase/auth", () => {
    const mockAuth = {
        signInWithEmailAndPassword: vi.fn((auth, email, password) => 
            Promise.resolve({ user: { email, uid: "mocked_uid" } })
        ),
        createUserWithEmailAndPassword: vi.fn((auth, email, password) => 
            Promise.resolve({ user: { email, uid: "mocked_uid" } })
        ),
        signOut: vi.fn().mockResolvedValue(undefined),
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

    test("FireBase called upon signing up on form", async () => {

        

        await userEvent.type(screen.getByLabelText("Email address"), "test@example.fr");
        await userEvent.type(screen.getByLabelText("Password"), "password12345")
        await userEvent.type(screen.getByLabelText("Repeat Password"), "password12345")

        await userEvent.click(screen.getByRole('button', { name: "Create Account" }));

        const { createUserWithEmailAndPassword } = await import("firebase/auth");
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    
    })
})