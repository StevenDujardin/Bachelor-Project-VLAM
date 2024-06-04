import { render, screen } from "@testing-library/react";
import { Footer } from "../components/Footer";

describe("Footer", () => {
  it("renders correctly", () => {
    render(<Footer />);

    // Check if the footer text is present
    const footerText = screen.getByText("Bachelor Proef Groep-13 UCLL 2024©");
    expect(footerText).toBeInTheDocument();

    // Check if the footer has the correct class
   });
});
