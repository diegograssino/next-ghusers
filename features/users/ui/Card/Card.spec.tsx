import { usersMock } from "@/__mocks__/users";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("should render", () => {
    const { getByTestId } = render(
      <Card user={usersMock[0]} data-testid="card" />
    );
    const cardGrid = getByTestId("card");

    expect(cardGrid).toBeDefined();
  });
});
