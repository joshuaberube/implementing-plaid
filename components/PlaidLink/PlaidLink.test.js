import "@testing-library/jest-dom/extend-expect"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PlaidLink from "./PlaidLink"
import mockAxios from "jest-mock-axios"

afterEach(() => {
    mockAxios.reset()
})

describe("Plaid Link", () => {
    it("should render and call the axios request", async () => {
        render(<PlaidLink />)

        expect(await screen.findByRole("button")).toBeInTheDocument()

        await waitFor(() => {
            expect(mockAxios.post).toHaveBeenCalledTimes(1)
            expect(mockAxios.post).toHaveBeenCalledWith("/api/plaid/create-link-token", {userId: "1"})
    
            const responseObj = { data: "link-sandbox-bf041110-2309-4d4a-8470-8db56af9496e", status: 200}
            mockAxios.mockResponseFor({url: "/api/plaid/create-link-token", method: "post"}, responseObj)
            expect(responseObj.data).toHaveLength(49)
        })
        
    })

    test("should throw an error on the axios request", async () => {
        render(<PlaidLink />)

        expect(await screen.findByRole("button")).toBeInTheDocument()

        await waitFor(() => {
            expect(mockAxios.post).toHaveBeenCalledTimes(1)
            expect(mockAxios.post).toHaveBeenCalledWith("/api/plaid/create-link-token", {userId: "1"})
            mockAxios.mockError({error: "Server Error", status: 500})

            expect(screen.getByRole("button")).toBeDisabled()
        })
        
    })

    test("end-to-end", async () => {
        render(<PlaidLink />)

        const openPlaidButton = await screen.findByRole("button")
        expect(openPlaidButton).toBeInTheDocument()
        userEvent.click(openPlaidButton)

        // const continueButton = screen.getByRole("button", {name: "Continue"})
        // userEvent.click(continueButton)

        // const wellsFargo = screen.getByText("Wells Fargo")
    })
})