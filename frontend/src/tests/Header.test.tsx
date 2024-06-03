import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../components/Header";

describe("Header", () => {
    it("renders correctly with active links", () => {
      render(
        <Router>
          <Header />
        </Router>
      );
  
      // Check if "Kook AI" link is present and active
      const kookAILink = screen.getByText("Kook AI");
      expect(kookAILink).toBeInTheDocument();
      expect(kookAILink.parentElement).toHaveClass("border-b-2 border-LVBO");
      
      // Check if "Alle AI Recepten" link is present and active
      const alleAIReceptenLink = screen.getByText("Alle AI Recepten");
      expect(alleAIReceptenLink).toBeInTheDocument();
      expect(alleAIReceptenLink.parentElement).toHaveClass("border-b-2 border-LVBO");
    });

  it("renders correctly with inactive links", () => {
    render(
      <MemoryRouter initialEntries={["/over_ons"]}>
        <Header />
      </MemoryRouter>
    );

    // Check if "Kook AI" link is present and inactive
    const kookAILink = screen.getByText("Kook AI");
    expect(kookAILink).toBeInTheDocument();
    expect(kookAILink).not.toHaveClass("border-b-2 border-LVBO");

    // Check if "Alle AI Recepten" link is present and inactive
    const alleAIReceptenLink = screen.getByText("Alle AI Recepten");
    expect(alleAIReceptenLink).toBeInTheDocument();
    expect(alleAIReceptenLink).not.toHaveClass("border-b-2 border-LVBO");
  });
});