import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Transaction from "./Transaction"

describe("Transaction Component", () => {
    it("should render", () => {
        render(<Transaction />)

        screen.getByText("United Airlines")
    })
})