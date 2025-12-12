import React from "react";

import { act, render } from "@testing-library/react";

import { User } from "@/types";

import { FavoritesContext, FavoritesProvider } from "./Favorites.context";

interface FavoredUser {
  user: User;
  timestamp: number;
}

describe("FavoritesProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes favorites from localStorage", () => {
    const mockFavorites: FavoredUser[] = [
      {
        user: {
          id: 1,
          login: "user1",
          avatarUrl: "https://example.com/avatar1.jpg",
          followers: 10,
          following: 5,
          publicRepos: 20,
          bio: null,
        },
        timestamp: Date.now(),
      },
      {
        user: {
          id: 2,
          login: "user2",
          avatarUrl: "https://example.com/avatar2.jpg",
          followers: 15,
          following: 8,
          publicRepos: 30,
          bio: null,
        },
        timestamp: Date.now(),
      },
    ];
    localStorage.setItem("favorites", JSON.stringify(mockFavorites));
    let favoritesValue: FavoredUser[] = [];
    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(context) => {
            if (context) {
              favoritesValue = context.favorites;
            }
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );
    expect(favoritesValue.length).toBe(2);
    expect(favoritesValue[0].user.id).toBe(1);
    expect(favoritesValue[1].user.id).toBe(2);
  });

  it("adds a favorite", async () => {
    const mockUser: User = {
      id: 42,
      login: "testuser",
      avatarUrl: "https://example.com/avatar.jpg",
      followers: 10,
      following: 5,
      publicRepos: 20,
      bio: null,
    };
    let contextValue: typeof FavoritesContext extends React.Context<infer T>
      ? T
      : never;
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
    await act(async () => {
      if (contextValue) {
        await contextValue.addFavorite(mockUser);
      }
    });
    if (contextValue) {
      expect(contextValue.checkFavorite(42)).toBe(true);
      expect(contextValue.favorites.some((fav) => fav.user.id === 42)).toBe(
        true
      );
    }
  });

  it("removes a favorite", async () => {
    const mockUser: User = {
      id: 99,
      login: "testuser2",
      avatarUrl: "https://example.com/avatar2.jpg",
      followers: 15,
      following: 8,
      publicRepos: 30,
      bio: null,
    };
    let contextValue: typeof FavoritesContext extends React.Context<infer T>
      ? T
      : never;
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
    await act(async () => {
      if (contextValue) {
        await contextValue.addFavorite(mockUser);
        contextValue.removeFavorite(99);
      }
    });
    if (contextValue) {
      expect(contextValue.checkFavorite(99)).toBe(false);
      expect(contextValue.favorites.some((fav) => fav.user.id === 99)).toBe(
        false
      );
    }
  });

  it("does not add duplicate favorites", async () => {
    const mockUser: User = {
      id: 7,
      login: "testuser3",
      avatarUrl: "https://example.com/avatar3.jpg",
      followers: 20,
      following: 10,
      publicRepos: 40,
      bio: null,
    };
    let contextValue: typeof FavoritesContext extends React.Context<infer T>
      ? T
      : never;
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
    await act(async () => {
      if (contextValue) {
        await contextValue.addFavorite(mockUser);
        await contextValue.addFavorite(mockUser);
      }
    });
    if (contextValue) {
      expect(
        contextValue.favorites.filter((fav) => fav.user.id === 7).length
      ).toBe(1);
    }
  });
});
