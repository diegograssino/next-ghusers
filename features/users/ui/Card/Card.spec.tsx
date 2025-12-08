import { render } from "@testing-library/react";

import { usersMock } from "@/__mocks__/users";

import Card from "./Card";

import "@testing-library/jest-dom";

describe("Card", () => {
  test("should render", () => {
    const { getByTestId } = render(
      <Card user={usersMock[0]} data-testid="card" />
    );
    const cardGrid = getByTestId("card");

    expect(cardGrid).toBeDefined();
  });
});
