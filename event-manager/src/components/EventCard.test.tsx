import { describe, test, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import EventCard from "./EventCard"

describe("EventCard", () => {
  beforeEach(() => {
    render(
      <EventCard
        event={[
          7,
          2,
          "Wine Taste",
          "Come to taste the best wines in Argentina",
          "Bodega The Goat",
          "2024-11-02",
        ]}
      />
    )
  })
  test("should show eventcard component", () => {
    expect(screen.getByText("Suscribe to event")).toBeDefined()
  })
  test("should not show suscribed text at the start", () => {
    expect(screen.queryByText(/suscribed/i)).toBeNull()
  })
})
