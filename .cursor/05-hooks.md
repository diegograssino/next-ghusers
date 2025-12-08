# React Hooks Patterns

### Custom Hooks

- Always start with `use` prefix
- Return objects with descriptive property names
- Use `useCallback` for functions returned from hooks
- Use `useMemo` for computed values
- Document complex logic with comments

### Hook Example

```typescript
export const useInfiniteUsers = (
  queryParams: QueryParams = DEFAULT_QUERY_PARAMS,
  perPage = PER_PAGE_CONFIGS.desktop.items
) => {
  const { data, error, fetchNextPage } = useInfiniteQuery({
    // query configuration
  });

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const flattenedUsers = useMemo(() => {
    return data?.pages.map((page) => page.users).flat() || [];
  }, [data]);

  return {
    users: flattenedUsers,
    isError: error,
    handleLoadMore,
    // other return values
  };
};
```

