import React, { lazy, Suspense } from 'react';
import { SpinIcon } from '../atoms/server/icons/SpinIcon';
import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import { ModalButtonLoaderEventType } from '../atoms/types';
import { BreadcrumbsProps } from './Breadcrumbs/types';
import { ButtonLoaderProps } from './ButtonLoader/types';
import { CheckboxListProps } from './CheckboxList/types';
import { CodeEditorProps } from './CodeEditor/types';
import { CodeViewerProps } from './CodeViewer/types';
import { DataGridProps } from './DataGrid/types';
import { DrawerProps } from './Drawer/types';
import { DrawerViewProps } from './Drawer/types';
import { FetcherLayerProps } from './FetcherLayer/types';
import { FirstLoginWrapperProps } from './FirstLoginWrapper/types';
import { ButtonActionProps } from './FloatToolbar/types';
import { FloatToolbarProps } from './FloatToolbar/types';
import { ImageLoaderCropperProps } from './ImageLoaderCropper/types';
import { InputColorProps } from './InputColor/types';
import { LinkLastPathProps } from './LinkLastPath/types';
import { MultiSelectSearchableProps } from './MultiSelectSearchable/types';
import { SortableItemsProps } from './SimpleSortableRows/types';
import { SplitModalProps } from './SplitModal/types';
import { SplitPaneProps } from './SplitPane/types';
import { TabsProps } from './Tabs/types';
import { TabsInlineProps } from './Tabs/types';
import { TabsInlineBodyProps } from './Tabs/types';
import { ThemeColorPaletteProps } from './ThemeColorPalette/types';
import { TwoActionModalProps } from './TwoActionModal/types';
import { TwoContentSectionProps } from './TwoContentSection/types';
import { DatePickerProps } from './datePickers/types';
import { DayPickerProps } from './datePickers/types';
import { InputDateProps } from './datePickers/types';
import { MonthPickerProps } from './datePickers/types';
import { TimePickerProps } from './datePickers/types';
import { YearPickerProps } from './datePickers/types';
import { JukiLoadingLayoutProps } from './layouts/types';
import { PawsLoadingLayoutProps } from './layouts/types';
import { TwoContentCardsLayoutProps } from './layouts/types';
import { TwoContentLayoutProps } from './layouts/types';
import { HomeLinkProps } from './links/types';
import { CircularProgressProps } from './progress/types';
import { MultiProgressBarProps } from './progress/types';
import { TimerProps } from './timers/types';
import { TimerLabeledProps } from './timers/types';

const LazyBreadcrumbs = lazy(() => import('./Breadcrumbs/Breadcrumbs').then(module => ({ default: module.Breadcrumbs })));
export const Breadcrumbs = (props: BreadcrumbsProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBreadcrumbs {...props} />
  </Suspense>
);

const LazyButtonLoader = lazy(() => import('./ButtonLoader/ButtonLoader').then(module => ({ default: module.ButtonLoader })));
export const ButtonLoader = (props: ButtonLoaderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyButtonLoader {...props} />
  </Suspense>
);

const LazyCheckboxList = lazy(() => import('./CheckboxList/CheckboxList').then(module => ({ default: module.CheckboxList })));
export const CheckboxList = <T, >(props: CheckboxListProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCheckboxList {...props} />
  </Suspense>
);

const LazyCodeEditor = lazy(() => import('./CodeEditor/CodeEditor').then(module => ({ default: module.CodeEditor })));
export const CodeEditor = <T, >(props: CodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCodeEditor {...props} />
  </Suspense>
);

const LazyCodeViewer = lazy(() => import('./CodeViewer/CodeViewer').then(module => ({ default: module.CodeViewer })));
export const CodeViewer = (props: CodeViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeViewer {...props} />
  </Suspense>
);

const LazyDataGrid = lazy(() => import('./DataGrid/DataGrid').then(module => ({ default: module.DataGrid })));
export const DataGrid = (props: DataGridProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDataGrid {...props} />
  </Suspense>
);

const LazyDrawer = lazy(() => import('./Drawer/Drawer').then(module => ({ default: module.Drawer })));
export const Drawer = (props: DrawerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDrawer {...props} />
  </Suspense>
);

const LazyDrawerView = lazy(() => import('./Drawer/DrawerView').then(module => ({ default: module.DrawerView })));
export const DrawerView = (props: DrawerViewProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDrawerView {...props} />
  </Suspense>
);

const LazyFetcherLayer = lazy(() => import('./FetcherLayer/FetcherLayer').then(module => ({ default: module.FetcherLayer })));
export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyFetcherLayer {...props} />
  </Suspense>
);

const LazyFirstLoginWrapper = lazy(() => import('./FirstLoginWrapper/FirstLoginWrapper').then(module => ({ default: module.FirstLoginWrapper })));
export const FirstLoginWrapper = (props: FirstLoginWrapperProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFirstLoginWrapper {...props} />
  </Suspense>
);

const LazyButtonAction = lazy(() => import('./FloatToolbar/ButtonAction').then(module => ({ default: module.ButtonAction })));
export const ButtonAction = (props: ButtonActionProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyButtonAction {...props} />
  </Suspense>
);

const LazyFloatToolbar = lazy(() => import('./FloatToolbar/FloatToolbar').then(module => ({ default: module.FloatToolbar })));
export const FloatToolbar = (props: FloatToolbarProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFloatToolbar {...props} />
  </Suspense>
);

const LazyImageLoaderCropper = lazy(() => import('./ImageLoaderCropper/ImageLoaderCropper').then(module => ({ default: module.ImageLoaderCropper })));
export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyImageLoaderCropper {...props} />
  </Suspense>
);

const LazyInputColor = lazy(() => import('./InputColor/InputColor').then(module => ({ default: module.InputColor })));
export const InputColor = (props: InputColorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputColor {...props} />
  </Suspense>
);

const LazyLinkLastPath = lazy(() => import('./LinkLastPath/LinkLastPath').then(module => ({ default: module.LinkLastPath })));
export const LinkLastPath = (props: LinkLastPathProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkLastPath {...props} />
  </Suspense>
);

const LazyMultiSelectSearchable = lazy(() => import('./MultiSelectSearchable/MultiSelectSearchable').then(module => ({ default: module.MultiSelectSearchable })));
export const MultiSelectSearchable = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectSearchableProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyMultiSelectSearchable {...props} />
  </Suspense>
);

const LazySortableItems = lazy(() => import('./SimpleSortableRows/SortableItems').then(module => ({ default: module.SortableItems })));
export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazySortableItems {...props} />
  </Suspense>
);

const LazySplitModal = lazy(() => import('./SplitModal/SplitModal').then(module => ({ default: module.SplitModal })));
export const SplitModal = <T extends ModalButtonLoaderEventType, >(props: SplitModalProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazySplitModal {...props} />
  </Suspense>
);

const LazySplitPane = lazy(() => import('./SplitPane/SplitPane').then(module => ({ default: module.SplitPane })));
export const SplitPane = (props: SplitPaneProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySplitPane {...props} />
  </Suspense>
);

const LazyTabs = lazy(() => import('./Tabs/Tabs').then(module => ({ default: module.Tabs })));
export const Tabs = <T extends string, >(props: TabsProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTabs {...props} />
  </Suspense>
);

const LazyTabsInline = lazy(() => import('./Tabs/TabsInline').then(module => ({ default: module.TabsInline })));
export const TabsInline = <T, >(props: TabsInlineProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTabsInline {...props} />
  </Suspense>
);

const LazyTabsInlineBody = lazy(() => import('./Tabs/TabsInlineBody').then(module => ({ default: module.TabsInlineBody })));
export const TabsInlineBody = <T, >(props: TabsInlineBodyProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTabsInlineBody {...props} />
  </Suspense>
);

const LazyThemeColorPalette = lazy(() => import('./ThemeColorPalette/ThemeColorPalette').then(module => ({ default: module.ThemeColorPalette })));
export const ThemeColorPalette = (props: ThemeColorPaletteProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyThemeColorPalette {...props} />
  </Suspense>
);

const LazyTwoActionModal = lazy(() => import('./TwoActionModal/TwoActionModal').then(module => ({ default: module.TwoActionModal })));
export const TwoActionModal = (props: TwoActionModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTwoActionModal {...props} />
  </Suspense>
);

const LazyTwoContentSection = lazy(() => import('./TwoContentSection/TwoContentSection').then(module => ({ default: module.TwoContentSection })));
export const TwoContentSection = (props: TwoContentSectionProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTwoContentSection {...props} />
  </Suspense>
);

const LazyDatePicker = lazy(() => import('./datePickers/DatePicker').then(module => ({ default: module.DatePicker })));
export const DatePicker = (props: DatePickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDatePicker {...props} />
  </Suspense>
);

const LazyDayPicker = lazy(() => import('./datePickers/DayPicker').then(module => ({ default: module.DayPicker })));
export const DayPicker = (props: DayPickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDayPicker {...props} />
  </Suspense>
);

const LazyInputDate = lazy(() => import('./datePickers/InputDate').then(module => ({ default: module.InputDate })));
export const InputDate = (props: InputDateProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputDate {...props} />
  </Suspense>
);

const LazyMonthPicker = lazy(() => import('./datePickers/MonthPicker').then(module => ({ default: module.MonthPicker })));
export const MonthPicker = (props: MonthPickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMonthPicker {...props} />
  </Suspense>
);

const LazyTimePicker = lazy(() => import('./datePickers/TimePicker').then(module => ({ default: module.TimePicker })));
export const TimePicker = (props: TimePickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimePicker {...props} />
  </Suspense>
);

const LazyYearPicker = lazy(() => import('./datePickers/YearPicker').then(module => ({ default: module.YearPicker })));
export const YearPicker = (props: YearPickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyYearPicker {...props} />
  </Suspense>
);

const LazyJukiLoadingLayout = lazy(() => import('./layouts/JukiLoadingLayout').then(module => ({ default: module.JukiLoadingLayout })));
export const JukiLoadingLayout = (props: JukiLoadingLayoutProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiLoadingLayout {...props} />
  </Suspense>
);

const LazyPawsLoadingLayout = lazy(() => import('./layouts/PawsLoadingLayout').then(module => ({ default: module.PawsLoadingLayout })));
export const PawsLoadingLayout = (props: PawsLoadingLayoutProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPawsLoadingLayout {...props} />
  </Suspense>
);

const LazyTwoContentCardsLayout = lazy(() => import('./layouts/TwoContentCardsLayout').then(module => ({ default: module.TwoContentCardsLayout })));
export const TwoContentCardsLayout = <T, >(props: TwoContentCardsLayoutProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTwoContentCardsLayout {...props} />
  </Suspense>
);

const LazyTwoContentLayout = lazy(() => import('./layouts/TwoContentLayout').then(module => ({ default: module.TwoContentLayout })));
export const TwoContentLayout = <T, >(props: TwoContentLayoutProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTwoContentLayout {...props} />
  </Suspense>
);

const LazyHomeLink = lazy(() => import('./links/HomeLink').then(module => ({ default: module.HomeLink })));
export const HomeLink = (props: HomeLinkProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeLink {...props} />
  </Suspense>
);

const LazyCircularProgress = lazy(() => import('./progress/CircularProgress').then(module => ({ default: module.CircularProgress })));
export const CircularProgress = (props: CircularProgressProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCircularProgress {...props} />
  </Suspense>
);

const LazyMultiProgressBar = lazy(() => import('./progress/MultiProgressBar').then(module => ({ default: module.MultiProgressBar })));
export const MultiProgressBar = (props: MultiProgressBarProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMultiProgressBar {...props} />
  </Suspense>
);

const LazyTimer = lazy(() => import('./timers/Timer').then(module => ({ default: module.Timer })));
export const Timer = (props: TimerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimer {...props} />
  </Suspense>
);

const LazyTimerLabeled = lazy(() => import('./timers/TimerLabeled').then(module => ({ default: module.TimerLabeled })));
export const TimerLabeled = (props: TimerLabeledProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimerLabeled {...props} />
  </Suspense>
);
