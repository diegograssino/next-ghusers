import { act, render } from "@testing-library/react";
import { FavoritesContext, FavoritesProvider } from "./FavoritesContext";

describe("FavoritesProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes favorites from localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify([1, 2, 3]));
    let favoritesValue: number[] = [];
    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {({ favorites }) => {
            favoritesValue = favorites;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );
    expect(favoritesValue).toEqual([1, 2, 3]);
  });

  it("adds a favorite", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValue: any;
    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );
    act(() => {
      contextValue.addFavorite(42);
    });
    expect(contextValue.favorites).toContain(42);
    expect(contextValue.checkFavorite(42)).toBe(true);
  });

  it("removes a favorite", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValue: any;
    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );
    act(() => {
      contextValue.addFavorite(99);
      contextValue.removeFavorite(99);
    });
    expect(contextValue.favorites).not.toContain(99);
    expect(contextValue.checkFavorite(99)).toBe(false);
  });

  it("does not add duplicate favorites", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValue: any;
    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );
    act(() => {
      contextValue.addFavorite(7);
      contextValue.addFavorite(7);
    });
    expect(
      contextValue.favorites.filter((id: number) => id === 7).length
    ).toBe(1);
  });
});

