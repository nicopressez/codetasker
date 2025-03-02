import './__mocks__/firebase'
import { afterEach, beforeEach, describe, test, vi, expect } from "vitest";
import Auth from "../components/auth/Auth";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/vitest';

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

        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
        expect(screen.getByText("Continue with Google")).toBeInTheDocument();

})
    test("switches between login and signup tabs",async () => {

        // Click on button to change to login component
        await userEvent.click(screen.getByText('Log in', { selector : "button"}));

        // Check if page changed to signup component
        const signupButton = screen.getByText('Sign up', {selector: "button"});
        expect(signupButton).toBeInTheDocument();

        // Click button to change back to signup component and check if changed
        await userEvent.click(signupButton);
        expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    })

    test("FireBase called upon signing up with form", async () => {

        // Fill the form info, passing requirements and submit
        await userEvent.type(screen.getByLabelText("Email address"), "test@example.fr");
        await userEvent.type(screen.getByLabelText("Password"), "password12345");
        await userEvent.type(screen.getByLabelText("Repeat Password"), "password12345");
        await userEvent.click(screen.getByRole('button', { name: "Create Account" }));

        const { createUserWithEmailAndPassword, getAuth } = await import("firebase/auth");
        const mockAuth = getAuth()
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, "test@example.fr", "password12345");  
    })

    test("Firebase not called if form incomplete for signup", async () => {

        // Fill the form info, not passing requirements and submit
        await userEvent.type(screen.getByLabelText("Email address"), "test");
        await userEvent.type(screen.getByLabelText("Password"), "1");
        await userEvent.type(screen.getByLabelText("Repeat Password"), "1")
        await userEvent.click(screen.getByRole('button', { name: "Create Account" }));

        const { createUserWithEmailAndPassword } = await import("firebase/auth")
        expect(createUserWithEmailAndPassword).not.toHaveBeenCalled()
    })

    test("Firebase called upon logging in with form", async() => {

        await userEvent.click(screen.getByText("Log in", {selector: "button"}))

        // Fill the form info, passing requirements for login and submit
        await userEvent.type(screen.getByLabelText("Email address"), "test@example.fr");
        await userEvent.type(screen.getByLabelText("Password"), "password12345");
        await userEvent.click(screen.getByRole("button", { name: "Log in"}));

        const { signInWithEmailAndPassword, getAuth } = await import ("firebase/auth");
        const mockAuth = getAuth()
        expect (signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, "test@example.fr", "password12345");
    })

    test("Google auth called when clicking button", async () => {
       await userEvent.click(screen.getByText("Continue with Google"));

       const { signInWithPopup } = await import("firebase/auth");
       expect (signInWithPopup).toHaveBeenCalled();
    })

    test("Google signin with redirect instead of popup on mobile device", async() => {
        // Mock window dimension to sim mobile device
        Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 375});
        Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 667});

        window.dispatchEvent(new Event ("resize"));

        // Click Google Auth button
        const googleButton = await screen.findByText("Continue with Google");
        await userEvent.click(googleButton);

        // Called redirect function and not popup 
        const { signInWithPopup, signInWithRedirect } = await import ("firebase/auth")
        expect (signInWithPopup).not.toHaveBeenCalled()
        expect (signInWithRedirect).toHaveBeenCalled
    })
})