import { render } from "@testing-library/react";

import Typography from "./Typography";

import "@testing-library/jest-dom";

describe("Typography", () => {
  test("should render", () => {
    const { getByText } = render(<Typography>Test</Typography>);
    const typography = getByText("Test");

    expect(typography).toBeDefined();
  });
});
