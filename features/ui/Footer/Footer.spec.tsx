import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { default as Footer } from "./Footer";

describe("Footer", () => {
  test("should render", () => {
    const { getByTestId } = render(<Footer />);
    const footer = getByTestId("footer");

    expect(footer).toBeDefined();
  });
});
