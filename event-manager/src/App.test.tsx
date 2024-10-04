import { describe, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  beforeEach(() => {
    render(<App />)
  })

  test("should not show dialog component at the start", () => {
    expect(screen.queryByText(/description/i)).toBeNull()
  })
})
