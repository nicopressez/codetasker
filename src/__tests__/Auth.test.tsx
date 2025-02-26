import { describe, expect, test } from "vitest";
import Auth from "../components/auth/Auth";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { mockAuth } from "./__mocks__/firebase";

describe("Auth page", () => {
    test("renders login and signup forms", () => {
        render(<Auth />);
        const h1 = screen.getByText("Create Account");
        const googleLogin = screen.getByText("Continue with Google");

        expect(h1).not.toBe(null);
        expect(googleLogin).not.toBe(null);

})
})