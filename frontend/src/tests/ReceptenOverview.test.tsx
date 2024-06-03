import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
import { ReceptenOverview } from "../pages/ReceptenOverview";

const mock = new MockAdapter(axios);

const mockRecipes = [
  {
    recipe_id: 1,
    title: "Test Recept 1",
    type: "hoofdgerecht",
    duration: 30,
    difficulty: "gemakkelijk",
  },
  {
    recipe_id: 2,
    title: "Test Recept 2",
    type: "voorgerecht",
    duration: 15,
    difficulty: "gemakkelijk",
  },
];

describe("ReceptenOverview", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("fetches and displays recipes", async () => {
    mock.onGet("http://localhost:3000/recipes").reply(200, mockRecipes);

    render(<ReceptenOverview />);

    await waitFor(() => {
      expect(screen.getByText("Test Recept 1")).toBeInTheDocument();
      expect(screen.getByText("Test Recept 2")).toBeInTheDocument();
    });

    // Check if the duration is displayed correctly
    expect(screen.getByText("30 minuten")).toBeInTheDocument();
    expect(screen.getByText("15 minuten")).toBeInTheDocument();
  });

  it("handles search input and fetches filtered recipes", async () => {
    mock.onGet("http://localhost:3000/recipes").reply(200, mockRecipes);
    mock.onGet("http://localhost:3000/recipes/search/Test").reply(200, [mockRecipes[0]]);

    render(<ReceptenOverview />);

    fireEvent.change(screen.getByPlaceholderText("Naar welk recept je be op zoek?"), {
      target: { value: "Test" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /zoeken/i }));

    await waitFor(() => {
      expect(screen.getByText("Test Recept 1")).toBeInTheDocument();
      expect(screen.queryByText("Test Recept 2")).not.toBeInTheDocument();
    });

    // Check if the duration is displayed correctly for the filtered recipe
    expect(screen.getByText("30 minuten")).toBeInTheDocument();
    expect(screen.queryByText("15 minuten")).not.toBeInTheDocument();
  });
});