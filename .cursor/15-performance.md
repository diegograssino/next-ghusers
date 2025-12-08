# Performance Best Practices

### Memoization (useMemo & useCallback)

**Only memoize when you need referential stability** - Memoization has overhead and should only be used when necessary.

#### When to Memoize

1. **Passing to memoized components** (`React.memo`):
   - If you pass functions or non-primitive values to components wrapped in `React.memo`, they need stable references
   - React compares props with `Object.is` - if references change, memoization breaks

2. **Preventing effects from firing too often**:
   - Functions or values used in `useEffect`, `useMemo`, or `useCallback` dependency arrays need stable references
   - Without memoization, effects may run on every render

3. **Expensive computations**:
   - Use `useMemo` for computationally expensive operations (e.g., filtering large arrays, complex calculations)
   - The computation itself must be slow enough to justify the memoization overhead

4. **Context values and methods**:
   - Context values should be memoized to prevent unnecessary re-renders of all consumers
   - Context methods should be memoized to maintain stable references

#### When NOT to Memoize (Useless Memoization)

1. **Passing to React built-ins** (`button`, `div`, `input`, etc.):
   - React built-in components don't care about referential stability
   - Memoizing handlers passed to them achieves nothing and adds overhead

2. **Passing to non-memoized components**:
   - If the component isn't wrapped in `React.memo`, memoization provides no benefit
   - The component will re-render anyway when parent re-renders

3. **Simple computations**:
   - Don't memoize simple boolean checks, string concatenations, or trivial operations
   - The memoization overhead may be greater than the computation itself

4. **Props as dependencies**:
   - Avoid using non-primitive props (objects, arrays, functions) as dependencies in `useCallback`/`useMemo`
   - You have no control over their referential stability from parent components
   - This creates fragile memoization chains that break easily

#### The "Latest Ref" Pattern

When you need the latest value in an effect without re-running the effect, use the "latest ref" pattern instead of memoization:

```typescript
export const useHotkeys = (hotkeys: Hotkey[]) => {
  const hotkeysRef = useRef(hotkeys);

  // DOC Update ref on every render to always have latest value
  useEffect(() => {
    hotkeysRef.current = hotkeys;
  });

  const onKeyDown = useCallback(() => {
    // DOC Use hotkeysRef.current to access latest hotkeys without re-running effect
    const currentHotkeys = hotkeysRef.current;
    // ... use currentHotkeys
  }, []); // Empty deps - effect only runs once

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]); // Stable reference, effect only runs once
};
```

**Benefits**:
- Effect only runs once (setup/cleanup)
- Always has access to latest values via ref
- No fragile memoization chains
- Simpler, more maintainable code

**Future**: React's `useEffectEvent` (when available) will make this pattern first-class.

#### Memoization Examples

```typescript
// ✅ CORRECT: Passing to memoized component
const MemoizedCard = React.memo(Card);

function Parent() {
  const handleClick = useCallback(() => {
    // ... handler logic
  }, []); // ✅ Needed for memoized component

  return <MemoizedCard onClick={handleClick} />;
}

// ❌ WRONG: Passing to React built-in (useless)
function MyButton() {
  const onClick = useCallback(() => {
    console.log("clicked");
  }, []); // ❌ Useless - button doesn't care about referential stability

  return <button onClick={onClick}>Click</button>;
}

// ✅ CORRECT: No memoization needed for built-ins
function MyButton() {
  const onClick = () => {
    console.log("clicked");
  }; // ✅ Simple inline function is fine

  return <button onClick={onClick}>Click</button>;
}

// ✅ CORRECT: Used in effect dependency
function MyComponent() {
  const fetchData = useCallback(async () => {
    // ... fetch logic
  }, []); // ✅ Needed for effect dependency

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Effect only runs when fetchData changes

  return <div>...</div>;
}

// ✅ CORRECT: Expensive computation
function ExpensiveComponent({ items }) {
  const filteredItems = useMemo(() => {
    // DOC Expensive filtering operation on large array
    return items.filter(/* complex logic */).map(/* transformation */);
  }, [items]); // ✅ Memoize expensive computation

  return <div>{filteredItems.length} items</div>;
}

// ❌ WRONG: Simple computation (overkill)
function SimpleComponent({ count }) {
  const doubled = useMemo(() => count * 2, [count]); // ❌ Overkill - simple multiplication

  return <div>{doubled}</div>;
}

// ✅ CORRECT: Simple computation without memoization
function SimpleComponent({ count }) {
  const doubled = count * 2; // ✅ Simple computation, no memoization needed

  return <div>{doubled}</div>;
}

// ❌ WRONG: Props as dependencies (fragile)
function OhNo({ onChange }) {
  const handleChange = useCallback(
    (e) => {
      onChange?.(e);
    },
    [onChange] // ❌ Fragile - depends on parent's referential stability
  );

  return <SomeComponent onChange={handleChange} />;
}

// ✅ CORRECT: Latest ref pattern for props
function Better({ onChange }) {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const handleChange = useCallback((e) => {
    onChangeRef.current?.(e); // ✅ Always uses latest onChange
  }, []); // ✅ Stable reference, no dependency on prop

  return <SomeComponent onChange={handleChange} />;
}
```

#### Context Memoization (Always Needed)

Context values and methods should always be memoized:

```typescript
export const FavsProvider = ({ children }) => {
  const [favs, setFavs] = useState([]);

  const addFav = useCallback(async (user) => {
    // ... implementation
  }, []); // ✅ Context methods should be memoized

  const contextValue = useMemo(
    () => ({
      favs,
      addFav,
    }),
    [favs, addFav] // ✅ Context values should be memoized
  );

  return (
    <FavsContext.Provider value={contextValue}>
      {children}
    </FavsContext.Provider>
  );
};
```

#### Summary

- **Memoize**: Context values/methods, expensive computations, values passed to `React.memo` components, effect dependencies
- **Don't memoize**: Handlers for React built-ins, simple computations, values passed to non-memoized components
- **Use latest ref pattern**: When you need latest values in effects without re-running effects
- **Avoid**: Props as dependencies in memoization (creates fragile chains)

### React Query

- Set appropriate `staleTime` for queries
- Use `initialData` carefully (only server-side)
- Handle pagination with `useInfiniteQuery`

### Element Size Tracking (ResizeObserver Pattern)

- **Always use `ResizeObserver` for tracking element size changes** - Never use `window.addEventListener('resize')` for element size tracking
- **Discarded approaches** (do not use):
  - `window.addEventListener('resize')` - Fires many times per second during resize, causing excessive re-renders and performance issues
  - Throttled window resize - Still fires frequently, requires manual throttling logic, less efficient than ResizeObserver
  - Debounced window resize - Delays updates, poor UX, still requires manual debouncing, less efficient
- **Benefits of ResizeObserver**:
  - Browser-optimized: Only fires when elements actually resize (not on every frame)
  - More efficient: Native browser API with built-in performance optimizations
  - Precise: Observes actual element size changes, not window events
  - No manual throttling/debouncing needed: Browser handles optimization automatically
  - Better performance: Reduces unnecessary state updates and re-renders
- **Use cases**: Tracking element heights, widths, viewport changes, dynamic layout measurements
- **Pattern**: Create ResizeObserver instances in `useEffect`, observe elements, clean up in return function

