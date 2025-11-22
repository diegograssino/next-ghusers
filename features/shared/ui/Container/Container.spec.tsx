import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Container from "./Container";

describe("Container", () => {
  test("should render a children", () => {
    const { getByText } = render(<Container>Test</Container>);
    const text = getByText("Test");

    expect(text).toBeInTheDocument();
  });
  test("should render as a custom tag", () => {
    const { getByRole } = render(<Container as="p">Test</Container>);
    const tag = getByRole("paragraph");

    expect(tag).toBeDefined();
  });
});
