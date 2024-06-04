import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../components/Header";

describe("Header", () => {
  it("renders correctly with active links", () => {
    render(
      <MemoryRouter initialEntries={["/recepten"]}>
        <Header />
      </MemoryRouter>
    );

    // Check if "Kook AI" link is present and active
    const kookAILink = screen.getByText("Kook AI");
    expect(kookAILink).toBeInTheDocument();
    expect(kookAILink).toHaveClass("min-h-full pt-7 px-2 hover:border-b-2 ");

    // Check if "Alle AI Recepten" link is present and active
    const alleAIReceptenLink = screen.getByText("Alle AI Recepten");
    expect(alleAIReceptenLink).toBeInTheDocument();
    expect(alleAIReceptenLink).toHaveClass("min-h-full pt-7 px-2 self-center hover:border-b-2  border-b-2 border-white");
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
