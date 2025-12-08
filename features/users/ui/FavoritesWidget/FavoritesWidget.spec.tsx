import { render } from "@testing-library/react";

import { User } from "@/types";

import { default as CardWidget } from "./FavoritesWidget";

import "@testing-library/jest-dom";

describe("FavoritesWidget", () => {
  const mockUser: User = {
    id: 1,
    login: "testuser",
    avatarUrl: "https://example.com/avatar.jpg",
    followers: 10,
    following: 5,
    publicRepos: 20,
    bio: null,
  };

  test("should render", () => {
    const { getByTestId } = render(<CardWidget id={1} user={mockUser} />);
    const cardWidget = getByTestId("card-widget");

    expect(cardWidget).toBeDefined();
  });
});
