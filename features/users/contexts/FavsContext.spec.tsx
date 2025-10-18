import { act, render } from "@testing-library/react";
import { FavsContext, FavsProvider } from "./FavsContext";

describe("FavsProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes favs from localStorage", () => {
    localStorage.setItem("favs", JSON.stringify([1, 2, 3]));
    let favsValue: number[] = [];
    render(
      <FavsProvider>
        <FavsContext.Consumer>
          {({ favs }) => {
            favsValue = favs;
            return null;
          }}
        </FavsContext.Consumer>
      </FavsProvider>
    );
    expect(favsValue).toEqual([1, 2, 3]);
  });

  it("adds a favorite", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValue: any;
    render(
      <FavsProvider>
        <FavsContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </FavsContext.Consumer>
      </FavsProvider>
    );
    act(() => {
      contextValue.addFav(42);
    });
    expect(contextValue.favs).toContain(42);
    expect(contextValue.checkFav(42)).toBe(true);
  });

  it("removes a favorite", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValue: any;
    render(
      <FavsProvider>
        <FavsContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </FavsContext.Consumer>
      </FavsProvider>
    );
    act(() => {
      contextValue.addFav(99);
      contextValue.removeFav(99);
    });
    expect(contextValue.favs).not.toContain(99);
    expect(contextValue.checkFav(99)).toBe(false);
  });

  it("does not add duplicate favorites", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValue: any;
    render(
      <FavsProvider>
        <FavsContext.Consumer>
          {(ctx) => {
            contextValue = ctx;
            return null;
          }}
        </FavsContext.Consumer>
      </FavsProvider>
    );
    act(() => {
      contextValue.addFav(7);
      contextValue.addFav(7);
    });
    expect(contextValue.favs.filter((id: number) => id === 7).length).toBe(1);
  });
});
