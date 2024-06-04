import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
import { ReceptEdit } from "../pages/ReceptEdit";
import { BrowserRouter as Router } from "react-router-dom";

const mock = new MockAdapter(axios);

const mockRecipe = {
  recipe_id: 1,
  title: "Pasta Carbonara",
  type: "Pasta",
  duration: "30 min",
  difficulty: "Easy",
  image: "https://www.lekkervanbijons.be/sites/default/files/styles/960w_ratio_2_1/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=-zeKi844",
  description: "Een heerlijke salade met kazen van bij ons? Dat kan! Probeer deze heerlijke maaltijdsalade met Flandrien kaas die de show steelt. Gecombineerd met het fruit en de karnemelkdressing krijg je een frisse toets bij het gerecht. Puur genieten!",
  ingredients: ["500g pasta", "4 eggs", "200 g bacon", "150 g cheese", "salt"],
  steps: [
    "Doe alle ingrediënten voor de dressing in een afsluitbaar potje of bokaal, kruid met peper en zout en schud tot een romige dressing. Zet koel weg.",
    "Snijd het brood in blokjes.Pers de look en roerbak 30 seconden in olijfolie. Voeg de broodblokjes en het takje rozemarijn toe en bak het brood goudbruin en knapperig. Kruid met peper en zout.",
    "Hussel de rucola onder de groene sla en schik op een mooie schaal. Verdeel er de bramen en de in plakjes gesneden rode bietjes over. Verbrokkel er de kaas over en bestrooi met de croutons. Druppel er de dressing over en serveer.",
  ],
};

describe("ReceptEdit", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("fetches and displays the recipe", async () => {
    mock.onGet("http://localhost:3000/recipes/1").reply(200, mockRecipe);

    render(
      <Router>
        <ReceptEdit />
      </Router>
    );

    expect(await screen.findByDisplayValue("Pasta Carbonara")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("Een heerlijke salade met kazen van bij ons? Dat kan! Probeer deze heerlijke maaltijdsalade met Flandrien kaas die de show steelt. Gecombineerd met het fruit en de karnemelkdressing krijg je een frisse toets bij het gerecht. Puur genieten!")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("Pasta")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("30 min")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("Easy")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("500g pasta")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("4 eggs")).toBeInTheDocument();
  });

  it("allows adding a new ingredient", async () => {
    mock.onGet("http://localhost:3000/recipes/1").reply(200, mockRecipe);

    render(
      <Router>
        <ReceptEdit />
      </Router>
    );

    expect(await screen.findByDisplayValue("500g pasta")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Typ hier een nieuw ingrediënt..."), {
      target: { value: "pepper" },
    });

    fireEvent.click(screen.getByText("Voeg ingrediënt toe"));

    expect(await screen.findByDisplayValue("pepper")).toBeInTheDocument();
  });

  it("allows adding a new step", async () => {
    mock.onGet("http://localhost:3000/recipes/1").reply(200, mockRecipe);

    render(
      <Router>
        <ReceptEdit />
      </Router>
    );

    expect(await screen.findByDisplayValue("Doe alle ingrediënten voor de dressing in een afsluitbaar potje of bokaal, kruid met peper en zout en schud tot een romige dressing. Zet koel weg.")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText("stap invoegen")[0]);

    fireEvent.change(screen.getByPlaceholderText("Typ hier een nieuwe stap..."), {
      target: { value: "Voeg zout toe" },
    });

    fireEvent.click(screen.getByText("Voeg stap toe"));

    expect(await screen.findByDisplayValue("Voeg zout toe")).toBeInTheDocument();
  });

  it("saves the edited recipe", async () => {
    mock.onGet("http://localhost:3000/recipes/1").reply(200, mockRecipe);
    mock.onPut("http://localhost:3000/recipes/edit/1").reply(200);

    render(
      <Router>
        <ReceptEdit />
      </Router>
    );

    expect(await screen.findByDisplayValue("Pasta Carbonara")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("Pasta Carbonara"), {
      target: { value: "Pasta Bolognese" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Opslaan/i }));

    await waitFor(() => {
      expect(mock.history.put.length).toBe(1);
      expect(mock.history.put[0].data).toContain("Pasta Bolognese");
    });
  });
});
