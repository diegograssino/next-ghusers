import { render } from "@testing-library/react";

import Header from ".";

import "@testing-library/jest-dom";

describe("Navbar", () => {
  test("should render", () => {
    const { getByTestId } = render(<Header />);
    const header = getByTestId("header");

    expect(header).toBeDefined();
  });
});
