import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { default as CardGrid } from "./CardGrid";

describe("CardGrid", () => {
  test("should render", () => {
    const { getByTestId } = render(
      <CardGrid>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </CardGrid>
    );
    const cardGrid = getByTestId("card-grid");

    expect(cardGrid).toBeDefined();
  });
});
