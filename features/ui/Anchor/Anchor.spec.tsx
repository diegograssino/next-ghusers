import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Anchor from "./Anchor";

describe("Anchor", () => {
  test("should render", () => {
    const { getByText } = render(<Anchor href="./test">Test</Anchor>);
    const text = getByText("Test");

    expect(text).toBeInTheDocument();
  });
});
