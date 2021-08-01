import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Index from "../pages/index"

jest.mock("../components/PlaidLink", () => () => <input type="button" value="Connect a bank account" />)

describe("Index Page", () => {
    it("should render", () => {
        render(<Index />)

        screen.getByRole("main")
        screen.getByRole("button", {name: "Connect a bank account"})
        screen.getByRole("heading", {name: "Hello this is Josh"})
        screen.getByRole("button", {name: "Click on me!"})
        const hiddenElement = screen.queryByRole("heading", {name: "HOWDY!!!!"})
        expect(hiddenElement).not.toBeInTheDocument()
    })

    test("allows users to toggle whether the h2 shows", () => {
        render(<Index />)

        const button = screen.getByRole("button", {name: "Click on me!"})
        userEvent.click(button)
        screen.getByRole("heading", {name: "HOWDY!!!!"})
    })
})