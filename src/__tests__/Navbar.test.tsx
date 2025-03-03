import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "./__mocks__/firebase"
import '@testing-library/jest-dom/vitest';
import { cleanup, render,screen } from "@testing-library/react";
import MainPage from "../components/main/MainPage";
import userEvent from "@testing-library/user-event";

// Mock ResizeObserver to prevent render issues with headlessui
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

describe("Navbar & sidebar tests", () => {
    beforeEach(() => {
        render(
            <MainPage/>
        );
        vi.restoreAllMocks();
    });
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test("Navbar & sidebar rendered", async () => {
        expect(screen.getByText("+ Create New Board")).toBeInTheDocument();
        expect(screen.getByText("+ Add New Task")).toBeInTheDocument();
    })
    test("Firebase signout called when clicking signout button", async() => {
        // Open settings by clicking on button
        await userEvent.click(screen.getByTestId("navSettings"));
        const signoutButton = screen.getByText("Sign out")
        expect(signoutButton).toBeInTheDocument();

        // Click signout and check if firebase called
        await userEvent.click(signoutButton);
        const { signOut } = await import("firebase/auth");
        expect(signOut).toHaveBeenCalled();
    })
})
