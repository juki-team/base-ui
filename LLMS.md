# @juki-team/base-ui — LLM Reference

React component library for the Juki platform. Organized by atomic design.

---

## Table of Contents

- [Installation & Imports](#installation--imports)
- [Atoms](#atoms)
- [Molecules](#molecules)
- [Organisms](#organisms)
- [Templates](#templates)
- [Server Components (Icons)](#server-components-icons)
- [Hooks](#hooks)
- [Enums](#enums)
- [Constants](#constants)
- [Types](#types)
- [Base Styles](#base-styles)

---

## Installation & Imports

```ts
import { Button, Select, Modal, ... } from '@juki-team/base-ui';
import { SpinIcon, EditIcon, ... } from '@juki-team/base-ui/server-components';
import { classNames, ... } from '@juki-team/base-ui/helpers';
import { QueryParamKey, TriggerAction, ... } from '@juki-team/base-ui/enums';
import { EMPTY_USER, PAGE_SIZE_OPTIONS, ... } from '@juki-team/base-ui/constants';
import { jukiApiManager, jukiAppRoutes } from '@juki-team/base-ui/settings';
// Styles
import '@juki-team/base-ui/styles.scss';
import '@juki-team/base-ui/vendor-styles.scss';
```

---

## Atoms

### Button

```ts
import { Button } from '@juki-team/base-ui';
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `'primary' \| 'secondary' \| 'ghost'` | No | `'primary'` | Visual style |
| `size` | `'tiny' \| 'small' \| 'regular' \| 'large' \| 'huge'` | No | `'regular'` | Button size |
| `children` | `ReactNode` | No | — | Button label |
| `icon` | `ReactNode` | No | — | Icon element |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `expand` | `boolean` | No | `false` | Full-width |
| `submit` | `boolean` | No | `false` | `type="submit"` |
| `responsiveMobile` | `boolean` | No | `false` | Hide label on mobile |
| `tooltipContent` | `string` | No | — | Tooltip text |
| `className` | `string` | No | — | Extra CSS classes |
| `onClick` | `MouseEventHandler` | No | — | Click handler |

---

### Input

```ts
import { Input } from '@juki-team/base-ui';
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `type` | `'text' \| 'number' \| 'password' \| 'email' \| 'file' \| 'files' \| 'range' \| 'color'` | No | `'text'` | Input type |
| `value` | `T` | No | — | Controlled value |
| `onChange` | `(newValue: T, event) => void` | No | — | Change handler |
| `placeholder` | `string` | No | — | Placeholder text |
| `label` | `string \| ReactNode` | No | — | Field label |
| `icon` | `ReactNode` | No | — | Icon inside input |
| `labelPlacement` | `'top-border' \| 'top' \| 'left'` | No | — | Label position |
| `disabled` | `boolean` | No | `false` | Disabled state |
| `required` | `boolean` | No | `false` | Required field |
| `expand` | `boolean` | No | `false` | Full-width |
| `autoFocus` | `boolean` | No | `false` | Auto focus |
| `register` | `UseFormRegisterReturn` | No | — | React Hook Form register |
| `onEnter` | `KeyboardEventHandler` | No | — | Enter key handler |
| `min` | `number` | No | — | Min value (number type) |
| `max` | `number` | No | — | Max value (number type) |
| `step` | `number \| 'auto'` | No | — | Step value |

---

### InputCheckbox

```ts
import { InputCheckbox } from '@juki-team/base-ui';
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `checked` | `boolean` | Yes | — |
| `onChange` | `(checked: boolean) => void` | No | — |
| `label` | `ReactNode` | No | — |
| `size` | `'tiny' \| 'small' \| 'regular' \| 'large' \| 'huge'` | No | `'regular'` |
| `disabled` | `boolean` | No | `false` |
| `className` | `string` | No | — |

---

### InputToggle

```ts
import { InputToggle } from '@juki-team/base-ui';
```

Toggle switch. Props similar to `InputCheckbox`.

---

### InputRadio

```ts
import { InputRadio } from '@juki-team/base-ui';
```

Radio button input.

---

### InputPassword

```ts
import { InputPassword } from '@juki-team/base-ui';
```

Password input with show/hide toggle. Wraps `Input` with `type="password"`.

---

### InputSelect

```ts
import { InputSelect } from '@juki-team/base-ui';
```

Native HTML `<select>` wrapper.

---

### InputTextArea / TextArea

```ts
import { InputTextArea, TextArea } from '@juki-team/base-ui';
```

Textarea components.

---

### Select

```ts
import { Select } from '@juki-team/base-ui';
```

Custom dropdown selector with floating popover.

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `options` | `SelectOptionType[]` | Yes | — |
| `selectedOption` | `T` | No | — |
| `onChange` | `(selected: T) => void` | No | — |
| `disabled` | `boolean` | No | `false` |
| `expand` | `boolean` | No | `false` |
| `optionsPlacement` | `PlacementType` | No | `'bottom'` |
| `className` | `string` | No | — |
| `popoverClassName` | `string` | No | — |

---

### MultiSelect

```ts
import { MultiSelect } from '@juki-team/base-ui';
```

Multi-value selection dropdown.

---

### Modal

```ts
import { Modal } from '@juki-team/base-ui';
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `isOpen` | `boolean` | Yes | — |
| `onClose` | `ButtonLoaderOnClickType<OnClickModalEventType>` | Yes | — |
| `children` | `ReactNode` | No | — |
| `closeIcon` | `boolean` | No | `false` |
| `expand` | `boolean` | No | `false` |
| `closeOnClickOverlay` | `boolean` | No | `true` |
| `closeOnKeyEscape` | `boolean` | No | `true` |
| `className` | `string` | No | — |
| `containerClassName` | `string` | No | — |

---

### Popover (lazy)

```ts
import { Popover } from '@juki-team/base-ui';
```

Floating popover with animation. Uses `@floating-ui/react` internally. `FloatingFocusManager` is only mounted when `modal=true` or trigger includes `CLICK`.

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `content` | `ReactNodeOrFunctionP1Type<{isOpen, onClose}>` | Yes | — |
| `children` | `ReactElement` | Yes | — |
| `placement` | `Placement` | No | `'top'` |
| `triggerOn` | `TriggerOnActionsType \| TriggerOnActionsType[]` | No | `HOVER` |
| `open` | `boolean` | No | — |
| `onOpenChange` | `(open: boolean) => void` | No | — |
| `modal` | `boolean` | No | `false` |
| `offset` | `number` | No | — |
| `popoverClassName` | `string` | No | — |

---

### T (Translation)

```ts
import { T } from '@juki-team/base-ui';
```

Renders translated text using i18next. `children` is the translation key.

---

### Client

```ts
import { Client } from '@juki-team/base-ui';
```

Renders children only on the client side (no SSR).

---

### DateLiteral

```ts
import { DateLiteral } from '@juki-team/base-ui';
```

Displays a formatted date.

---

### CopyToClipboard

```ts
import { CopyToClipboard } from '@juki-team/base-ui';
```

Copy text to clipboard with icon button.

---

### Collapse (lazy)

```ts
import { Collapse } from '@juki-team/base-ui';
```

Collapsible content section.

---

### InputCellPhoneNumber (lazy)

```ts
import { InputCellPhoneNumber } from '@juki-team/base-ui';
```

International phone number input using `libphonenumber-js`.

---

## Molecules

### ButtonLoader

```ts
import { ButtonLoader } from '@juki-team/base-ui';
```

Button that manages loading state automatically. Extends `ButtonBasicProps`.

| Extra Prop | Type | Required |
|------------|------|----------|
| `onClick` | `ButtonLoaderOnClickType<T>` | No |

---

### ButtonAction

```ts
import { ButtonAction } from '@juki-team/base-ui';
```

Action button with predefined click behavior.

---

### Tabs

```ts
import { Tabs } from '@juki-team/base-ui';
```

| Prop | Type | Required |
|------|------|----------|
| `tabs` | `TabType<T>[]` | Yes |
| `selectedTabKey` | `T` | No |
| `onChange` | `(key: T) => void` | No |
| `className` | `string` | No |
| `extend` | `boolean` | No |
| `extraNodes` | `ReactNode` | No |

`TabType<T>` shape: `{ key: T, header: ReactNodeOrFunctionType, body: ReactNodeOrFunctionType, disabled?: boolean }`.

---

### TabsInline / TabsInlineButton / TabsInlineBody

```ts
import { TabsInline, TabsInlineButton, TabsInlineButtonLoader, TabsInlineBody } from '@juki-team/base-ui';
```

Inline tab variant with individual sub-components.

---

### Drawer

```ts
import { Drawer } from '@juki-team/base-ui';
```

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `content` | `ReactNodeOrFunctionP1Type<DrawerActionsType>` | Yes | — |
| `children` | `ReactNodeOrFunctionP1Type<DrawerActionsType>` | Yes | — |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | No | `'right'` |
| `triggerOn` | `'hover' \| 'click' \| 'none'` | No | `'click'` |
| `closeOnEscape` | `boolean` | No | — |
| `closeOnOutside` | `boolean` | No | — |

---

### Pagination

```ts
import { Pagination } from '@juki-team/base-ui';
```

Pagination controls for data tables.

---

### DatePicker / DayPicker / MonthPicker / YearPicker / TimePicker

```ts
import { DatePicker, DayPicker, MonthPicker, YearPicker, TimePicker } from '@juki-team/base-ui';
```

Date and time selection components.

---

### InputDate

```ts
import { InputDate } from '@juki-team/base-ui';
```

Date input with picker integration.

---

### Timer / TimerDisplay / TimerLabeled

```ts
import { Timer, TimerDisplay, TimerLabeled } from '@juki-team/base-ui';
```

Countdown/timer display components.

---

### SplitPane

```ts
import { SplitPane } from '@juki-team/base-ui';
```

Resizable split-pane layout.

---

### SplitModal

```ts
import { SplitModal } from '@juki-team/base-ui';
```

Modal with split layout (e.g. form on left, preview on right).

---

### TwoActionModal

```ts
import { TwoActionModal } from '@juki-team/base-ui';
```

Modal pre-wired with confirm/cancel buttons.

---

### FloatToolbar

```ts
import { FloatToolbar } from '@juki-team/base-ui';
```

Floating action toolbar.

---

### CircularProgress

```ts
import { CircularProgress } from '@juki-team/base-ui';
```

Circular progress indicator.

---

### ProgressSlide / ProgressMultiBar

```ts
import { ProgressSlide, ProgressMultiBar } from '@juki-team/base-ui';
```

Linear progress indicators.

---

### Breadcrumbs

```ts
import { Breadcrumbs } from '@juki-team/base-ui';
```

Navigation breadcrumbs.

---

### CheckboxList

```ts
import { CheckboxList } from '@juki-team/base-ui';
```

List of checkboxes with select-all support.

---

### MultiSelectSearchable

```ts
import { MultiSelectSearchable } from '@juki-team/base-ui';
```

Searchable multi-select dropdown.

---

### InformationPopover / FrozenInformation / QuietInformation / UpsolvingInformation

```ts
import { InformationPopover, FrozenInformation, QuietInformation, UpsolvingInformation } from '@juki-team/base-ui';
```

Icon + popover information components for various states.

---

### Layouts

```ts
import {
  ApplicationLoaderLayout,
  JukiLoadingLayout,
  PawsLoadingLayout,
  TwoContentLayout,
  TwoContentCardsLayout,
  UserLoaderLayout,
} from '@juki-team/base-ui';
```

Page-level layout wrappers.

---

### TwoContentSection

```ts
import { TwoContentSection } from '@juki-team/base-ui';
```

Two-column content section.

---

### FetcherLayer

```ts
import { FetcherLayer } from '@juki-team/base-ui';
```

Wraps content with a data-fetching SWR layer.

---

### CodeEditor (lazy)

```ts
import { CodeEditor } from '@juki-team/base-ui';
```

Code editor built on CodeMirror 6. Supports multiple programming languages.

---

### CodeViewer (lazy)

```ts
import { CodeViewer } from '@juki-team/base-ui';
```

Read-only code viewer with syntax highlighting.

---

### DataGrid (lazy)

```ts
import { DataGrid } from '@juki-team/base-ui';
```

Data grid built on Handsontable.

---

### BarChart / LineChart (lazy)

```ts
import { BarChart, LineChart } from '@juki-team/base-ui';
```

Charts built on Recharts.

---

### SlideDeck (lazy)

```ts
import { SlideDeck } from '@juki-team/base-ui';
```

Presentation slide deck built on reveal.js v6.

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `children` | `ReactNode` | No | — |
| `fontSize` | `number` | No | `32` |
| `theme` | `Theme` | No | `Theme.LIGHT` |
| `aspectRatio` | `AspectRatioType` | No | — |
| `autoSlide` | `number \| false` | No | `false` |
| `onClose` | `() => void` | No | — |

---

### ImageLoaderCropper (lazy)

```ts
import { ImageLoaderCropper } from '@juki-team/base-ui';
```

Image upload with crop interface using `react-image-crop`.

---

### InputColor (lazy)

```ts
import { InputColor } from '@juki-team/base-ui';
```

Color picker input using `react-color`.

---

### SortableItems (lazy)

```ts
import { SortableItems } from '@juki-team/base-ui';
```

Drag-and-drop sortable list using `@dnd-kit`.

---

## Organisms

### MdMathViewer

```ts
import { MdMathViewer } from '@juki-team/base-ui';
```

Renders Markdown + LaTeX (KaTeX) content. Uses `react-markdown` + `remark-math` + `rehype-katex`.

---

### HorizontalMenu

```ts
import { HorizontalMenu } from '@juki-team/base-ui';
```

Top navigation bar with mobile drawer support.

| Prop | Type | Required |
|------|------|----------|
| `menu` | `MenuType[]` | Yes |
| `leftSection` | `ReactNodeOrFunctionType` | No |
| `rightSection` | `ReactNodeOrFunctionType` | No |
| `rightMobile` | `{ children: ReactNode }` | No |
| `centerMobile` | `{ children: ReactNode }` | No |
| `drawerMenuMobile` | `ReactNode` | No |
| `onBack` | `() => void` | No |
| `children` | `ReactNode` | No |

---

### VerticalMenu

```ts
import { VerticalMenu } from '@juki-team/base-ui';
```

Collapsible sidebar navigation.

| Prop | Type | Required |
|------|------|----------|
| `menu` | `MenuType[]` | Yes |
| `topSection` | `({ isOpen }: { isOpen: boolean }) => ReactNode` | No |
| `bottomSection` | `({ isOpen }: { isOpen: boolean }) => ReactNode` | No |
| `rightMobile` | `{ children: ReactNode }` | No |
| `centerMobile` | `{ children: ReactNode }` | No |
| `onBack` | `() => void` | No |
| `children` | `ReactNode` | No |

---

### LoginUser

```ts
import { LoginUser } from '@juki-team/base-ui';
```

Shows login button when unauthenticated, or user avatar + popover menu when authenticated.

| Prop | Type | Required | Default |
|------|------|----------|---------|
| `collapsed` | `boolean` | Yes | — |
| `isVertical` | `boolean` | No | — |
| `isHorizontal` | `boolean` | No | — |
| `onSeeMyProfile` | `OnSeeMyProfileType` | No | — |
| `profileSelected` | `boolean` | No | — |

---

### PageNotFound

```ts
import { PageNotFound } from '@juki-team/base-ui';
```

404 page component. Accepts optional `children` for custom content.

---

### PagedDataViewer

```ts
import { PagedDataViewer } from '@juki-team/base-ui';
```

Paginated data table with sorting and filtering.

---

### UsersSelector

```ts
import { UsersSelector } from '@juki-team/base-ui';
```

Multi-user selection with search.

---

### UserNicknameLink

```ts
import { UserNicknameLink } from '@juki-team/base-ui';
```

Displays user nickname as a clickable link.

---

### UserChip

```ts
import { UserChip } from '@juki-team/base-ui';
```

User avatar + nickname chip.

---

### ProblemSelector

```ts
import { ProblemSelector } from '@juki-team/base-ui';
```

Problem search and selection component.

---

### ProblemVerdictTag

```ts
import { ProblemVerdictTag } from '@juki-team/base-ui';
```

Displays a color-coded verdict tag (AC, WA, TLE, etc.).

---

### SubmitView

```ts
import { SubmitView } from '@juki-team/base-ui';
```

Detailed submission result view.

---

### GraphvizEditor / GraphvizEditorModal

```ts
import { GraphvizEditor, GraphvizEditorModal } from '@juki-team/base-ui';
```

Graphviz DOT language editor with preview.

---

### GraphvizViewers

```ts
import { GraphvizViewers } from '@juki-team/base-ui';
```

Graphviz diagram viewer.

---

### ImageUploaderButton

```ts
import { ImageUploaderButton } from '@juki-team/base-ui';
```

Image upload button with preview.

---

### CardNotification

```ts
import { CardNotification } from '@juki-team/base-ui';
```

Notification card display.

---

### CheckUnsavedChanges

```ts
import { CheckUnsavedChanges } from '@juki-team/base-ui';
```

Prompts user before leaving with unsaved changes.

---

### AiChatPanel

```ts
import { AiChatPanel } from '@juki-team/base-ui';
```

AI chat interface using Vercel AI SDK (`@ai-sdk/react`).

---

### Modals

```ts
import { LoginModal, SignUpModal, ImageUploaderModal, UserPreviewModal, WelcomeModal, SubmissionModal } from '@juki-team/base-ui';
```

---

### DataViewer (lazy)

```ts
import { DataViewer } from '@juki-team/base-ui';
```

Advanced data table with virtualization, filtering, sorting, column visibility.

---

### MdMathEditor (lazy)

```ts
import { MdMathEditor } from '@juki-team/base-ui';
```

Markdown + LaTeX editor built on Milkdown.

| Prop | Type | Required |
|------|------|----------|
| `value` | `string` | Yes |
| `onChange` | `(value: string) => void` | Yes |
| `informationButton` | `boolean` | No |

---

### WorksheetViewer / WorksheetEditor / WorksheetContents / WorksheetAsSlides (lazy)

```ts
import { WorksheetViewer, WorksheetEditor, WorksheetContents, WorksheetAsSlides } from '@juki-team/base-ui';
```

Worksheet (structured document) components.

---

### UserCodeEditor (lazy)

```ts
import { UserCodeEditor } from '@juki-team/base-ui';
```

Full code editor with run/submit capabilities.

---

### GraphvizViewer (lazy)

```ts
import { GraphvizViewer } from '@juki-team/base-ui';
```

Graphviz diagram viewer with pan/zoom.

---

### ExcalidrawButton (lazy)

```ts
import { ExcalidrawButton } from '@juki-team/base-ui';
```

Opens Excalidraw whiteboard in a modal.

---

## Templates

### MainMenu

```ts
import { MainMenu } from '@juki-team/base-ui';
```

Full application menu (horizontal or vertical based on user preference). Wraps `HorizontalMenu` or `VerticalMenu` with logo, settings, and `LoginUser`. Memoizes `children` to prevent re-renders on internal state changes.

| Prop | Type | Required |
|------|------|----------|
| `menu` | `MenuType[]` | Yes |
| `menuViewMode` | `MenuViewMode` | No |
| `profileSelected` | `boolean` | No |
| `moreApps` | `ReactNode` | No |
| `multiCompanies` | `boolean` | No |
| `topImageUrl` | `string` | No |
| `onSeeMyProfile` | `OnSeeMyProfileType` | No |
| `onBack` | `() => void` | No |
| `children` | `ReactNode` | No |

---

### ProblemView

```ts
import { ProblemView } from '@juki-team/base-ui';
```

Full problem page with statement, code editor, and submissions tabs.

---

### UserViewLayout / UserProfile / UserProfileSettings

```ts
import { UserViewLayout, UserProfile, UserProfileSettings } from '@juki-team/base-ui';
```

User profile page components.

---

### UserMyActiveSessions

```ts
import { UserMyActiveSessions } from '@juki-team/base-ui';
```

Displays and manages user active sessions.

---

### EditProfileModal / ImageProfileModal

```ts
import { EditProfileModal, ImageProfileModal } from '@juki-team/base-ui';
```

Profile editing modals.

---

### EntityCreateLayout / EntityUpdateLayout

```ts
import { EntityCreateLayout, EntityUpdateLayout } from '@juki-team/base-ui';
```

Generic layouts for entity create/update forms.

---

### ErrorBoundary

```ts
import { ErrorBoundary } from '@juki-team/base-ui';
```

React error boundary component.

---

### HelpSection

```ts
import { HelpSection } from '@juki-team/base-ui';
```

Help documentation section with keyboard shortcuts.

---

### DocumentMembersContent / DocumentMembersButton / DocumentMembersModal

```ts
import { DocumentMembersContent, DocumentMembersButton, DocumentMembersModal } from '@juki-team/base-ui';
```

Document membership management components.

---

## Server Components (Icons)

All icons are server-renderable (no client-side state).

```ts
import { SpinIcon, EditIcon, DeleteIcon, SearchIcon, ... } from '@juki-team/base-ui/server-components';
```

All icons accept standard SVG/HTML attributes plus optional `size` or `className`.

**Available icons** (partial list):
`UpdateIcon`, `ExpandLessIcon`, `CloseIcon`, `EditIcon`, `DeleteIcon`, `SearchIcon`,
`SaveIcon`, `RefreshIcon`, `FilterListIcon`, `SettingsIcon`, `AppsIcon`,
`PlayArrowIcon`, `StopCircleIcon`, `HomeIcon`, `PersonIcon`, `AccountCircleIcon`,
`DashboardIcon`, `AdminPanelSettingsIcon`, `LockPersonIcon`, `ManageAccountsIcon`,
`VisibilityIcon`, `VisibilityOffIcon`, `DarkModeIcon`, `InvertColorsIcon`,
`CodeIcon`, `ArticleIcon`, `AssignmentIcon`, `FolderIcon`, `FolderOpenIcon`,
`CloudUploadIcon`, `CloudDownloadIcon`, `AttachmentIcon`, `FileOpenIcon`,
`CalendarMonthIcon`, `AlarmIcon`, `MoreTimeIcon`, `EventListIcon`,
`MailIcon`, `NotificationsActiveIcon`, `SupportAgentIcon`, `HelpIcon`,
`ShareIcon`, `PublicIcon`, `LanguageIcon`, `NavigateNextIcon`, `NavigateBeforeIcon`,
`ArrowLeftIcon`, `ArrowRightIcon`, `ArrowDropDownIcon`, `ForwardIcon`, `ReplyIcon`,
`MenuIcon`, `ViewHeadlineIcon`, `ViewModuleIcon`, `ViewCozyIcon`, `SideNavigationIcon`,
`FormatH4Icon`, `FormatH5Icon`, `FormatH6Icon`, `FormatItalicIcon`, `FormatListBulletedIcon`,
`ErrorIcon`, `NewReleasesIcon`, `TrophyIcon`, `BubbleChartIcon`, `WidgetsIcon`,
`StorageIcon`, `HomeStorageIcon`, `PanToolIcon`, `DesignServicesIcon`,
`AddColumnLeftIcon`, `AddColumnRightIcon`, `TableEyeIcon`, `LoadingIcon`,
`SpinIcon` (animated spinner), `GoogleIcon`

---

## Hooks

### Component Hooks

```ts
import { useJukiUser, useJukiNotification, useFetcher, ... } from '@juki-team/base-ui';
```

| Hook | Description |
|------|-------------|
| `useJukiUser()` | Access user session: `{ logout, ... }` |
| `useJukiNotification()` | Toast notifications: `{ addInfoNotification, addQuietNotification, ... }` |
| `useFetcher<T>(url)` | SWR data fetching: `{ data, isLoading, error }` |
| `useKeyDown(key, handler)` | Keyboard shortcut listener |
| `useWindowSize()` | Responsive window dimensions |
| `useInterval(fn, delay)` | Managed interval |
| `useDebounceEffect(fn, deps, delay)` | Debounced effect |
| `useClickOutside(ref, handler)` | Detect click outside element |
| `usePageFocus()` | Whether browser tab is focused |
| `usePrevious(value)` | Previous render's value |
| `useSessionStorage(key)` | Session storage access |
| `useHash()` | URL hash state |
| `useOverflowDetector(ref)` | Detect element overflow |
| `usePreload(component)` | Preload lazy component |
| `useTrackCursor()` | Cursor position tracking |
| `useMatchMutate()` | SWR bulk revalidation |
| `useResizeDetector` | Re-exported from `react-resize-detector` |

### Store Hooks

```ts
import { useUserStore, useUIStore, usePageStore, useRouterStore, ... } from '@juki-team/base-ui';
```

| Hook | Store content |
|------|---------------|
| `useUserStore(selector)` | `{ user, company, isLoading }` |
| `useUIStore(selector)` | `{ components: { Link, Image }, jukiAppDivRef }` |
| `usePageStore(selector)` | `{ viewPort: { screen: ViewPortSizeType } }` |
| `useRouterStore(selector)` | `{ searchParams, setSearchParams, pathname }` |
| `useI18nStore(selector)` | `{ i18n: { t } }` |
| `useAnimationFrameStore(selector)` | `{ framePending }` |
| `useSoundStore(selector)` | Sound playback state |
| `useWebsocketStore(selector)` | WebSocket connection state |

---

## Enums

```ts
import { QueryParamKey, TriggerAction, Sound, Duration, Period, ProblemTab, ContestTab, ProfileTab } from '@juki-team/base-ui/enums';
```

### QueryParamKey
URL query parameter keys used across the app.
`TOKEN`, `COMPANY`, `SIGN_IN`, `SIGN_UP`, `SUBMISSION`, `USER_PREVIEW`, `WELCOME`, `PAGE_FOCUS`,
`PAGE_TABLE`, `PAGE_SIZE_TABLE`, `SORT_TABLE`, `FILTER_TABLE`, `VIEW_MODE_TABLE`, `VISIBLES`, ...

### TriggerAction
`HOVER`, `CLICK`, `ESCAPE`, `NONE`

Used in `Popover`, `Drawer`, and other interactive components.

### Sound
`CLICK`, `SUCCESS`, `ERROR`, `NOTIFICATION`, `WARNING`, `MESSAGE`, `POP`, `BELL`

### Duration (animation seconds)
`FAST = 0.100`, `NORMAL = 0.250`, `LOW = 0.400`

### Period
`FUTURE`, `LIVE_START`, `LIVE_END`, `PAST`, `CALC`, `TIME_OUT`

### ProblemTab
`STATEMENT`, `EDITOR`, `MY_SUBMISSIONS`, `SUBMISSIONS`, `TESTS`, `STATISTICS`, `SETUP`, `EDITORIAL`, `ACCESS`, `DELETE`

### ContestTab
`OVERVIEW`, `PROBLEMS`, `SCOREBOARD`, `MY_SUBMISSIONS`, `CLARIFICATIONS`, `SUBMISSIONS`, `SETUP`, `MEMBERS`, `EVENTS`, `DELETE`

### ProfileTab
`OVERVIEW`, `SETTINGS`, `SUBMISSIONS`, `MY_SESSIONS`

---

## Constants

```ts
import { EMPTY_USER, EMPTY_COMPANY, PAGE_SIZE_OPTIONS, DEFAULT_TIME_ZONE, ... } from '@juki-team/base-ui/constants';
```

| Constant | Value / Description |
|----------|---------------------|
| `EMPTY_USER` | Default empty user object |
| `EMPTY_COMPANY` | Default empty company object |
| `PAGE_SIZE_OPTIONS` | `[25, 50, 100]` |
| `DEFAULT_TIME_ZONE` | `'America/La_Paz'` |
| `SCROLL_WIDTH` | `8` (px) |
| `EMPTY_ARRAY` | `Object.freeze([])` |
| `EMPTY_OBJECT` | `Object.freeze({})` |
| `ALPHANUMERIC_DASH_UNDERSCORE_REGEX` | Validation regex |
| `LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX` | Password strength regex |
| `CODE_EDIT0R_TAB_SIZES` | `[1, 2, 3, 4, 8]` |
| `CODE_EDIT0R_FONT_SIZES` | `[8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 30, 32, 34, 36, 38, 40, 42]` |
| `RESIZE_DETECTOR_PROPS` | Default props for `react-resize-detector` |
| `DEFAULT_DATA_VIEWER_PROPS` | Default DataViewer configuration |

---

## Types

```ts
import type { ButtonLoaderOnClickType, TabType, DataViewerRequestPropsType, ... } from '@juki-team/base-ui/types';
```

| Type | Description |
|------|-------------|
| `ReactNodeOrFunctionP1Type<T, U>` | `ReactNode \| ((arg: T) => U)` |
| `ReactNodeOrFunctionType` | `ReactNode \| (() => ReactNode)` |
| `ButtonLoaderOnClickType<T>` | `(setLoader: SetLoaderStatusOnClickType, event: T) => void \| Promise<void>` |
| `SetLoaderStatusOnClickType` | `(status: LoaderStatusOnClickType) => void` |
| `LoaderStatusOnClickType` | `'none' \| 'loading' \| 'success' \| 'error'` |
| `TabType<T>` | `{ key: T, header: ReactNodeOrFunctionType, body: ReactNodeOrFunctionType, disabled?: boolean }` |
| `ButtonType` | `'primary' \| 'secondary' \| 'ghost'` |
| `ButtonSizeType` | `'tiny' \| 'small' \| 'regular' \| 'large' \| 'huge'` |
| `ViewPortSizeType` | `'hg' \| 'lg' \| 'md' \| 'sm' \| ''` |
| `DataViewerRequestPropsType` | Pagination, sort, filter params for DataViewer |
| `TriggerOnActionsType` | Trigger action union type |
| `BoundingClientRectType` | Element bounding rect |
| `UpsertComponentEntityProps<E, T>` | Generic create/update component props |
| `UpdatePasswordPayloadDTO` | `{ currentPassword, newPassword }` |
| `SignInPayloadDTO` | `{ nickname, password }` |

---

## Base Styles

Import all base styles via:
```scss
@use '@juki-team/base-ui/styles.scss';
@use '@juki-team/base-ui/vendor-styles.scss';
```

Or in SCSS files:
```scss
@use '@juki-team/base-ui/styles/mixins';
```

---

### CSS Custom Properties (`src/styles/base/_variables.scss`)

#### Screen breakpoints
```css
--screen-hg-min: 1920px
--screen-lg-min: 1280px
--screen-md-min: 640px
--screen-sm-min: 320px
```

#### Spacing (responsive, changes per breakpoint)
```css
--pad-xH   /* extra huge */
--pad-H    /* huge */
--pad-lg   /* large */
--pad-m    /* medium */
--pad-sm   /* small */
--pad-xsm  /* extra small */
--pad-xt   /* tiny */
--gap      /* default flex gap */
```

#### Z-index layers
```css
--zi-menu
--zi-modal
--zi-drawer
--zi-popover
--zi-tooltip
```

#### Typography
```css
--tx-bs          /* base font size */
--font-size-h1, --font-size-h2, --font-size-h3
--weight-lighter, --weight-light, --weight-regular, --weight-bold, --weight-bolder
```

#### UI dimensions
```css
--left-vertical-collapsed-menu-width
--size-scrollbar: 8px
--border-radius
--border-radius-inline
```

#### Transitions
```css
--transition-duration-slow
--transition-duration-normal
--transition-duration-fast
```

---

### Theme Colors (`src/styles/base/_themes-and-colors.scss`)

Applied via `.jk-theme-light` or `.jk-theme-dark` on a parent element.

#### Semantic colors
```css
--cr-io-lt  /* info light */
--cr-io     /* info (blue) */
--cr-io-dk  /* info dark */

--cr-ss-lt  /* success light */
--cr-ss     /* success (green) */
--cr-ss-dk  /* success dark */

--cr-wg-lt  /* warning light */
--cr-wg     /* warning (orange) */
--cr-wg-dk  /* warning dark */

--cr-er-lt  /* error light */
--cr-er     /* error (red) */
--cr-er-dk  /* error dark */

--cr-we-lt  /* white light */
--cr-we     /* white */
--cr-we-dk  /* white dark */
--cr-we-det /* white detail */

--cr-bk-lt  /* black light */
--cr-bk     /* black */

--cr-gy     /* gray */
--cr-gy-1   /* gray 100% */
--cr-gy-2   /* gray 83% */
--cr-gy-3   /* gray 66% */
--cr-gy-4   /* gray 49% */
--cr-gy-5   /* gray 32% */
--cr-gy-6   /* gray 15% */
```

#### Accent (brand color)
```css
--cr-at-lt  /* accent light */
--cr-at     /* accent */
--cr-at-dk  /* accent dark */
--cr-at-it  /* accent interactive */
```

#### Transparent overlays
```css
--cr-ht-lt  /* hover light */
--cr-ht     /* hover */
--cr-ht-dk  /* hover dark */
--cr-sw-lt  /* selected light */
--cr-sw     /* selected */
--cr-sw-dk  /* selected dark */
```

#### Text highlight
```css
--cr-tx-ht-lt
--cr-tx-ht
--cr-tx-ht-dk
--cr-tx-ht-it  /* interactive */
```

#### Navbar colors
```css
--navbar-tx-cr   /* navbar text */
--navbar-bd-cr   /* navbar border */
--navbar-at-cr   /* navbar accent */
```

---

### Color Utility Classes (`src/styles/base/_commons.scss` and `_themes-and-colors.scss`)

**Text color (black/white/gray):**
`.cr-bk`, `.cr-b2` (black-lt), `.cr-we`, `.cr-w2` (white-dk)
`.cr-g1` `.cr-g2` `.cr-g3` `.cr-g4` `.cr-g5` `.cr-g6` (gray scale 100%→15%)

**Text color (semantic):**
`.cr-io-lt`, `.cr-io`, `.cr-io-dk`
`.cr-ss-lt`, `.cr-ss`, `.cr-ss-dk`
`.cr-wg-lt`, `.cr-wg`, `.cr-wg-dk`
`.cr-er-lt`, `.cr-er`, `.cr-er-dk`

**Text color (accent/highlight):**
`.cr-at-lt`, `.cr-at`, `.cr-at-dk`, `.cr-at-it`
`.cr-tx-ht-lt`, `.cr-tx-ht`, `.cr-tx-ht-dk`, `.cr-tx-ht-it`
`.cr-hl` (hover-lt), `.cr-ht` (hover), `.cr-hd` (hover-dk)

**Background color (black/white/gray):**
`.bc-bk`, `.bc-b2`, `.bc-we`, `.bc-we-lt`, `.bc-we-dk`, `.bc-we-det`
`.bc-g1` `.bc-g2` `.bc-g3` `.bc-g4` `.bc-g5` `.bc-g6`

**Background color (semantic):**
`.bc-io-lt`, `.bc-io`, `.bc-io-dk`
`.bc-ss-lt`, `.bc-ss`, `.bc-ss-dk`
`.bc-wg-lt`, `.bc-wg`, `.bc-wg-dk`
`.bc-er-lt`, `.bc-er`, `.bc-er-dk`

**Background color (accent/overlay):**
`.bc-at-lt`, `.bc-at`, `.bc-at-dk`
`.bc-sw-lt`, `.bc-sw`, `.bc-sw-dk`
`.bc-ht-lt`, `.bc-ht`, `.bc-ht-dk`
`.bc-tx-ht`

**Border color:** `.br-bk`, `.br-b2`, `.br-we`, `.br-w2`, `.br-io`, `.br-ss`, `.br-wg`, `.br-er`
`.br-al` (accent-lt), `.br-at`, `.br-ad` (accent-dk)
`.br-hl` (hover-lt), `.br-ht`, `.br-hd` (hover-dk)

---

### Typography Classes (`src/styles/base/_fonts.scss`)

#### Font size
```
.tx-vh   /* viewport huge */
.tx-h    /* huge */
.tx-l    /* large */
.tx-m    /* medium (default) */
.tx-s    /* small */
.tx-t    /* tiny */
.tx-vt   /* viewport tiny */
```

#### Font weight
```
.fw-lr   /* lighter */
.fw-lt   /* light */
.fw-rr   /* regular */
.fw-bd   /* bold */
.fw-br   /* bolder */
```

#### Text transform
```
.tt-se   /* sentence case */
.tt-ce   /* capitalize */
.tt-ue   /* uppercase */
.tt-le   /* lowercase */
```

#### Whitespace
```
.ws-np   /* nowrap */
.ws-nl   /* normal */
.ws-bs   /* break-spaces */
.ws-pe   /* pre */
```

#### Text alignment
```
.ta-lt   /* left */
.ta-rt   /* right */
.ta-cr   /* center */
.ta-st   /* start */
.ta-ed   /* end */
```

---

### Layout Classes (`src/styles/base/_jk-commons.scss`)

#### Flexbox
```
.jk-row              /* display: flex; flex-direction: row; align-items: center */
.jk-col              /* display: flex; flex-direction: column */
.jk-row-col          /* row on desktop, column on mobile */

/* Modifiers (append to .jk-row or .jk-col) */
.gap                 /* adds --gap spacing between children */
.block               /* display: block */
.space-between       /* justify-content: space-between */
.center              /* justify-content: center */
.stretch             /* align-items: stretch */
.extend              /* flex: 1 */
.left                /* justify-content: flex-start */
.right               /* justify-content: flex-end */
.top                 /* align-items: flex-start */
.bottom              /* align-items: flex-end */
.nowrap              /* flex-wrap: nowrap */
```

#### Padding
```
.jk-pg               /* all sides, medium */
.jk-pg-lg            /* all sides, large */
.jk-pg-sm            /* all sides, small */
.jk-pg-xsm           /* all sides, extra small */

/* Directional: -t (top), -r (right), -b (bottom), -l (left) */
/* Combined: -tb (top+bottom), -rl (right+left), -tr, -tl, -br, -bl */
/* Example: .jk-pg-sm-tb = small padding top+bottom */
```

#### User profile image
```
.jk-user-profile-img          /* base circular avatar */
.jk-user-profile-img.tiny     /* 16px */
.jk-user-profile-img.small    /* 24px */
.jk-user-profile-img.large    /* 32px */
.jk-user-profile-img.huge     /* 50px */
```

#### Border radius
```
.jk-br       /* --border-radius */
.jk-br-ie    /* --border-radius-inline */
```

#### Scroll
```
.jk-with-scroll          /* overflow-y: auto with styled scrollbar */
.jk-with-scroll-outside  /* scroll at container level */
```

#### Overlays
```
.jk-overlay            /* full screen overlay */
.jk-overlay-backdrop   /* overlay with backdrop blur */
.jk-loader-layer       /* centered loader overlay */
```

#### Elevation (box-shadow)
```
.elevation-1
.elevation-2
.elevation-3
```

#### Opacity utilities
```
.opacity-0
.opacity-hover      /* 0 → 1 on hover */
.opacity-hover-4    /* 0 → 0.4 on hover */
```

#### Display utilities
```
.dy-cs   /* display: contents */
.dy-bk   /* display: block */
.dy-ib   /* display: inline-block */
.dy-if   /* display: inline-flex */
```

#### Positioning
```
.pn-re   /* position: relative */
.pn-ae   /* position: absolute */
.pn-fd   /* position: fixed */
```

#### Overflow
```
.ow-ao   /* overflow: auto */
.ow-hn   /* overflow: hidden */
.ow-ve   /* overflow: visible */
```

#### Flex sizing
```
.flex-1 through .flex-8   /* flex: 1 ... flex: 8 */
```

#### Misc
```
.hoverable           /* cursor: pointer + hover highlight */
.hr-e1               /* hover elevation */
.ff-me               /* font-family: monospace */
.rotating            /* spin animation */
.pe-ne               /* pointer-events: none */
.cursor-pointer      /* cursor: pointer */
.wb-bw               /* word-break: break-word */
.wb-ba               /* word-break: break-all */
```

---

### Commons Utility Classes (`src/styles/base/_commons.scss`)

```
/* Responsive show/hide */
.screen.hg    /* visible only on hg (≥1920px) */
.screen.lg    /* visible only on lg */
.screen.md    /* visible only on md */
.screen.sm    /* visible only on sm */

/* Hover-reveal opacity levels */
.display-on-hover          /* opacity: 0 → 1 on parent hover */
.display-on-hover.op-1 ... .op-9

/* Borders with accent color */
.border-top-highlight
.border-bottom-highlight
.border-right-highlight

/* Print */
.page-break
.avoid-break

/* Dimensions */
.wh-ao     /* width: auto */
.wh-100    /* width: 100% */
.ht-100    /* height: 100% */
.br-50-pc  /* border-radius: 50% (circle) */

/* Transitions */
.transition-width
```

---

### SCSS Mixins (`src/styles/_mixins.scss`)

```scss
@use '@juki-team/base-ui/styles/mixins';

// Responsive breakpoints
@include mixins.sm { ... }   // ≤639px
@include mixins.md { ... }   // 640–1279px
@include mixins.lg { ... }   // 1280–1919px
@include mixins.hg { ... }   // ≥1920px
@include mixins.md-hg { ... } // ≥640px

// Elevation shadow
@include mixins.elevation(1);  // 1, 2, or 3

// Transition
@include mixins.transition(width, 0.25s);
```