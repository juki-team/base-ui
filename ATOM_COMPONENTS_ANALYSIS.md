# Atom Components — Deep Analysis

## Overview

This document provides a thorough code review of all **21 atom component directories** in `src/components/atoms/`. The analysis covers code quality, accessibility, type safety, API design, testing gaps, and performance.

**Zero of 21 atom components have unit tests.** Only 1 (Button) has an active Storybook `play` test.

---

## Critical Bugs

| # | Component | Issue | Location |
|---|-----------|-------|----------|
| 1 | **DateLiteral** | `.padStart()` called on numbers — `getHours()` returns `number`, not `string`. **Runtime crash.** | `DateLiteral.tsx:43-46` |
| 2 | **InputSelect** | Local `value` state never syncs when parent `selectedOption` changes — controlled component is broken. | `InputSelect.tsx:25,19` |
| 3 | **InputSelect** | Hidden input mirrors stale local state, not the actual `selectedOption` — form submissions send wrong values. | `InputSelect.tsx:47-59` |
| 4 | **DetectRequestAnimationFrame** | `useEffect` missing dependency array — registers new `requestAnimationFrame` callbacks on **every render**, causing memory leak. | `DetectRequestAnimationFrame.tsx:11-16` |

---

## Accessibility (a11y) Summary

Nearly every atom component has significant accessibility gaps. This is the highest-impact area for improvement.

### Missing Across All Components

| Gap | Affected Components |
|-----|---------------------|
| **No `aria-required` / `aria-invalid` / `aria-describedby`** | Input, InputPassword, InputCheckbox, InputRadio, InputToggle, InputTextArea, InputSelect, Select, MultiSelect |
| **No keyboard support beyond basic tab** | InputToggle (can't activate), CopyToClipboard (can't trigger), Div (only Enter, no Space), Select/MultiSelect (no arrow keys, no type-ahead) |
| **No `prefers-reduced-motion` respect** | SpinIcon, Popover, Collapse |
| **No focus trap** | Modal (critical — tab escapes to background content) |
| **No focus restoration** | Modal (focus not returned to trigger on close) |
| **No `role="dialog"` / `aria-modal="true"`** | Modal |

### Component-Specific a11y Issues

| Component | Issue |
|-----------|-------|
| **Button** | Space key not handled (`onKeyDown` only checks Enter); icon-only buttons have no `aria-label` |
| **InputToggle** | Clickable `<div>` elements have no `role="switch"`, `tabIndex`, or keyboard handler — completely inaccessible without mouse |
| **InputPassword** | Visibility toggle icon not keyboard-accessible (no `role="button"`, `tabIndex`, or `onKeyDown`) |
| **InputRadio** | Missing `value` prop — radio groups cannot function; no `name` prop for grouping |
| **InputCheckbox/InputRadio** | `disabled` when no `onChange` — can't have read-only checked states |
| **Select/MultiSelect** | No `role="listbox"` / `role="option"`, no `aria-expanded`, no `aria-selected`, no keyboard navigation |
| **DateLiteral** | Uses `<div>` instead of `<time>` element |
| **CopyToClipboard** | No `aria-live` region for "copied" feedback; icon-only variant has no accessible name |
| **Collapse** | No `aria-expanded` on header, no `aria-controls` linking header to content |
| **SVG Icons** | No `aria-hidden="true"` or `role="img"` with `aria-label` |

---

## Type Safety Issues

| Component | Issue | Severity |
|-----------|-------|----------|
| **Button** | `fetcherLayerErrorEvent?: any` in `OnClickButtonEventType` | High |
| **Button** | Manual `as` cast on `forwardRef` instead of generic parameter | Medium |
| **Input** | `<T extends string \| number \| FileList>` — FileList mixed with scalars creates confusing generics | Medium |
| **Select/MultiSelect** | `JSON.stringify()` for value comparison — fails with circular refs, unstable object key ordering | High |
| **Popover** | `// @ts-ignore` before `cloneElement` | Medium |
| **InputCellPhoneNumber** | `as CountryCode` assertion after optional chaining — runtime crash if timezone lookup fails | High |
| **Multiple Stories** | `// @ts-ignore` on `defaultProps` assignments (Button, Select, MultiSelect, Modal, DateLiteral) | Low |
| **Select** | `onBlur` typed as `{ target: Ref<HTMLDivElement> }` instead of `FocusEvent` | Medium |

---

## Props API Inconsistencies

### Input Family — Inconsistent Interfaces

| Prop | Input | InputPassword | InputCheckbox | InputRadio | InputToggle | InputTextArea | InputSelect |
|------|:-----:|:-------------:|:-------------:|:---------:|:-----------:|:-------------:|:-----------:|
| `onChange` signature | `(value, event)` | `(value, event)` | `(checked)` | `(checked)` | `(checked)` | `(value)` | `(option)` |
| `value` | T | string | — | — | boolean | string | T |
| `name` | yes | yes | — | — | — | — | — |
| `disabled` | yes | yes | yes | yes | yes | yes | — |
| `register` (form) | yes | yes | — | — | — | yes | yes (different shape) |
| `required` | yes | yes | — | — | — | yes | — |

**Problem:** Consumers must learn a different API for each input type. `onChange` signatures vary wildly — some get raw values, some get events, some get booleans. Form integration (`register` prop) is available on some but not others.

### Select vs MultiSelect — Inconsistent Naming

| Aspect | Select | MultiSelect |
|--------|--------|-------------|
| Selected value prop | `selectedOption` | `selectedOptions` |
| onChange signature | `(option) => void` | `(options[], lastOptionChanged) => void` |
| `popoverClassName` | yes | missing |
| `showOptions` / `onChangeShowOptions` | — | declared in types but **never implemented** (dead props) |

### Other API Issues

| Component | Issue |
|-----------|-------|
| **Button** | `expand` prop is ambiguous (width? height?); `responsiveMobile` unclear; `withIconTransition` defined but never used |
| **Div** | `onKeyDownClick?: boolean \| 'Enter'` mixes boolean with string literal |
| **InputToggle** | `type` prop (`'rounded' \| 'square'`) should be named `variant` |
| **CopyToClipboard** | Missing `onCopySuccess`/`onCopyError` callbacks |
| **T** | Always renders `<span>` — can't be used inside headings or buttons |

---

## Performance Issues

| Component | Issue | Impact |
|-----------|-------|--------|
| **Select** | `JSON.stringify()` comparison for every option on every render — O(n) stringifications | High for large lists |
| **MultiSelect** | `optionsSelected.some(o => JSON.stringify(...))` nested inside `options.map()` — **O(n²)** | High |
| **Select/MultiSelect** | All options rendered to DOM (no virtualization) + duplicated in hidden "fake options" container for width measurement | High for 100+ options |
| **MultiSelect** | Width calculation uses `getTextContent(label).length * (12 + 5) + 35` — string length ≠ pixel width (monospace assumption) | Medium |
| **Button** | No `React.memo`; inline event handlers without `useCallback`; store subscriptions cause re-renders | Medium |
| **Popover** | `getPlacementVariants()` — 100-line switch statement called on every render, not memoized | Low-Medium |
| **TextArea** | `Math.max((value).split('\n').length, 2)` recalculated on every keystroke for dynamic rows | Low |

---

## Testing Improvement Priorities

### Tier 1 — Fix Bugs (requires tests to prevent regression)

| Test | Why |
|------|-----|
| `DateLiteral` — render with various `show` formats | Catches the `.padStart()` on number crash |
| `InputSelect` — controlled component with changing `selectedOption` | Catches the stale local state bug |
| `DetectRequestAnimationFrame` — mount/unmount lifecycle | Catches the memory leak |

### Tier 2 — Keyboard & Accessibility

| Test | Why |
|------|-----|
| `Button` — Space key fires `onClick` | Currently broken — only Enter works |
| `InputToggle` — keyboard activation (Enter/Space) | Currently impossible — no keyboard support |
| `Modal` — focus trap (Tab stays inside modal) | Currently broken — Tab escapes modal |
| `Modal` — focus restoration on close | Currently broken — focus lost |
| `Select` — arrow key navigation, Enter selection, Escape close | No keyboard navigation exists |
| `MultiSelect` — same as Select + checkbox toggling via Space | No keyboard navigation exists |

### Tier 3 — Core Interaction Tests (Storybook Play Functions)

| Component | What to Test |
|-----------|-------------|
| `Input` | Controlled value updates, `type="number"` coercion, `type="file"` handling, autoFocus, select-on-focus |
| `InputCheckbox` | Check/uncheck toggle, disabled state, form integration |
| `InputRadio` | Radio group exclusive selection (requires `value`/`name` props first) |
| `InputPassword` | Visibility toggle, icon keyboard accessibility |
| `Select` | Open/close, option selection, disabled options, empty options, scroll-to-selected |
| `MultiSelect` | Select/deselect, clear all, remove tag, rapid toggling |
| `Modal` | Open/close, Escape key, overlay click, loading state blocking close |
| `CopyToClipboard` | Clipboard API success/failure, feedback timing |
| `Collapse` | Expand/collapse animation, rapid toggling, `startOpen` prop |
| `Popover` | Placement positioning, hover/click triggers, controlled/uncontrolled modes |

### Tier 4 — Edge Cases & Performance

| Test | Why |
|------|-----|
| `Select/MultiSelect` with 500+ options | Performance regression check; validates need for virtualization |
| `Select` with object values | Catches `JSON.stringify` ordering issues |
| `InputCellPhoneNumber` — invalid timezone | Catches `CountryCode` type assertion crash |
| `Popover` — viewport edge collision | Validates flip middleware |
| `VirtualizedRowsFixed` — changing item count and row height | Validates memo comparison completeness |

---

## Recommended Fixes by Priority

### Immediate (Bug Fixes)

1. **DateLiteral** — Change `.padStart()` calls to `.toString().padStart()`
2. **InputSelect** — Sync local state with `selectedOption` via `useEffect` or remove local state entirely
3. **DetectRequestAnimationFrame** — Add `[]` dependency array to `useEffect`
4. **Button** — Add Space key handling in `onKeyDown`

### Short-Term (Accessibility)

5. **Modal** — Add focus trap using `FocusScope` or similar; add `role="dialog"` + `aria-modal="true"`; restore focus on close
6. **InputToggle** — Add `role="switch"`, `tabIndex={0}`, keyboard handlers
7. **Select/MultiSelect** — Add `role="listbox"` / `role="option"`, `aria-expanded`, keyboard navigation
8. **InputPassword** — Make visibility icon keyboard-accessible
9. **All inputs** — Add `aria-required`, `aria-invalid`, `aria-describedby` support
10. **SpinIcon/Popover/Collapse** — Respect `prefers-reduced-motion`

### Medium-Term (API & Performance)

11. **Select/MultiSelect** — Replace `JSON.stringify` comparison with identity-based or custom equality
12. **Select/MultiSelect** — Add virtualization for large lists (react-virtual)
13. **Input family** — Standardize `onChange` signatures and form integration
14. **InputRadio** — Add `value` and `name` props
15. **MultiSelect** — Remove dead `showOptions`/`onChangeShowOptions` props from types

### Long-Term (Quality)

16. Add `'use client'` directives to all hook-using components
17. Remove all `// @ts-ignore` and fix underlying type issues
18. Remove dead/commented code across all components
19. Add comprehensive test suites (Tiers 1-4 above)
