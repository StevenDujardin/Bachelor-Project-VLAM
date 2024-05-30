import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
import { ReceptenOverview } from "../pages/ReceptenOverview"; // Importing the component

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

    render(<ReceptenOverview />); // Using the component here

    await waitFor(() =>
      expect(screen.getByText("Test Recept 1")).toBeInTheDocument()
    );
    expect(screen.getByText("Test Recept 2")).toBeInTheDocument();
  });

  it("handles search input and fetches filtered recipes", async () => {
    mock.onGet("http://localhost:3000/recipes").reply(200, mockRecipes);
    mock
      .onGet("http://localhost:3000/recipes/search/Test")
      .reply(200, [mockRecipes[0]]);

    render(<ReceptenOverview />); // Using the component here

    fireEvent.change(
      screen.getByPlaceholderText("Naar welk recept je be op zoek?"),
      {
        target: { value: "Test" },
      }
    );

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() =>
      expect(screen.getByText("Test Recept 1")).toBeInTheDocument()
    );
    expect(screen.queryByText("Test Recept 2")).not.toBeInTheDocument();
  });
});
