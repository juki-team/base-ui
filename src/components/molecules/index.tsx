import React, { lazy } from 'react';
import { SuspenseWithTracking } from '../SuspenseWithTracking';
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

const BreadcrumbsImport = () => import('./Breadcrumbs/Breadcrumbs');
const LazyBreadcrumbs = lazy(() => BreadcrumbsImport().then(module => ({ default: module.Breadcrumbs })));
export const Breadcrumbs = (props: BreadcrumbsProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Breadcrumbs">
    <LazyBreadcrumbs {...props} />
  </SuspenseWithTracking>
);

const ButtonLoaderImport = () => import('./ButtonLoader/ButtonLoader');
const LazyButtonLoader = lazy(() => ButtonLoaderImport().then(module => ({ default: module.ButtonLoader })));
export const ButtonLoader = (props: ButtonLoaderProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ButtonLoader">
    <LazyButtonLoader {...props} />
  </SuspenseWithTracking>
);

const CheckboxListImport = () => import('./CheckboxList/CheckboxList');
const LazyCheckboxList = lazy(() => CheckboxListImport().then(module => ({ default: module.CheckboxList })));
export const CheckboxList = <T, >(props: CheckboxListProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CheckboxList">
    {/*@ts-ignore*/}
    <LazyCheckboxList {...props} />
  </SuspenseWithTracking>
);

const CodeEditorImport = () => import('./CodeEditor/CodeEditor');
const LazyCodeEditor = lazy(() => CodeEditorImport().then(module => ({ default: module.CodeEditor })));
export const CodeEditor = <T, >(props: CodeEditorProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CodeEditor">
    {/*@ts-ignore*/}
    <LazyCodeEditor {...props} />
  </SuspenseWithTracking>
);

const CodeViewerImport = () => import('./CodeViewer/CodeViewer');
const LazyCodeViewer = lazy(() => CodeViewerImport().then(module => ({ default: module.CodeViewer })));
export const CodeViewer = (props: CodeViewerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CodeViewer">
    <LazyCodeViewer {...props} />
  </SuspenseWithTracking>
);

const DataGridImport = () => import('./DataGrid/DataGrid');
const LazyDataGrid = lazy(() => DataGridImport().then(module => ({ default: module.DataGrid })));
export const DataGrid = (props: DataGridProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DataGrid">
    <LazyDataGrid {...props} />
  </SuspenseWithTracking>
);

const DrawerImport = () => import('./Drawer/Drawer');
const LazyDrawer = lazy(() => DrawerImport().then(module => ({ default: module.Drawer })));
export const Drawer = (props: DrawerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Drawer">
    <LazyDrawer {...props} />
  </SuspenseWithTracking>
);

const DrawerViewImport = () => import('./Drawer/DrawerView');
const LazyDrawerView = lazy(() => DrawerViewImport().then(module => ({ default: module.DrawerView })));
export const DrawerView = (props: DrawerViewProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DrawerView">
    <LazyDrawerView {...props} />
  </SuspenseWithTracking>
);

const FetcherLayerImport = () => import('./FetcherLayer/FetcherLayer');
const LazyFetcherLayer = lazy(() => FetcherLayerImport().then(module => ({ default: module.FetcherLayer })));
export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FetcherLayer">
    {/*@ts-ignore*/}
    <LazyFetcherLayer {...props} />
  </SuspenseWithTracking>
);

const FirstLoginWrapperImport = () => import('./FirstLoginWrapper/FirstLoginWrapper');
const LazyFirstLoginWrapper = lazy(() => FirstLoginWrapperImport().then(module => ({ default: module.FirstLoginWrapper })));
export const FirstLoginWrapper = (props: FirstLoginWrapperProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FirstLoginWrapper">
    <LazyFirstLoginWrapper {...props} />
  </SuspenseWithTracking>
);

const ButtonActionImport = () => import('./FloatToolbar/ButtonAction');
const LazyButtonAction = lazy(() => ButtonActionImport().then(module => ({ default: module.ButtonAction })));
export const ButtonAction = (props: ButtonActionProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ButtonAction">
    <LazyButtonAction {...props} />
  </SuspenseWithTracking>
);

const FloatToolbarImport = () => import('./FloatToolbar/FloatToolbar');
const LazyFloatToolbar = lazy(() => FloatToolbarImport().then(module => ({ default: module.FloatToolbar })));
export const FloatToolbar = (props: FloatToolbarProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="FloatToolbar">
    <LazyFloatToolbar {...props} />
  </SuspenseWithTracking>
);

const ImageLoaderCropperImport = () => import('./ImageLoaderCropper/ImageLoaderCropper');
const LazyImageLoaderCropper = lazy(() => ImageLoaderCropperImport().then(module => ({ default: module.ImageLoaderCropper })));
export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ImageLoaderCropper">
    <LazyImageLoaderCropper {...props} />
  </SuspenseWithTracking>
);

const InputColorImport = () => import('./InputColor/InputColor');
const LazyInputColor = lazy(() => InputColorImport().then(module => ({ default: module.InputColor })));
export const InputColor = (props: InputColorProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputColor">
    <LazyInputColor {...props} />
  </SuspenseWithTracking>
);

const LinkLastPathImport = () => import('./LinkLastPath/LinkLastPath');
const LazyLinkLastPath = lazy(() => LinkLastPathImport().then(module => ({ default: module.LinkLastPath })));
export const LinkLastPath = (props: LinkLastPathProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="LinkLastPath">
    <LazyLinkLastPath {...props} />
  </SuspenseWithTracking>
);

const MultiSelectSearchableImport = () => import('./MultiSelectSearchable/MultiSelectSearchable');
const LazyMultiSelectSearchable = lazy(() => MultiSelectSearchableImport().then(module => ({ default: module.MultiSelectSearchable })));
export const MultiSelectSearchable = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectSearchableProps<T, U, V>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MultiSelectSearchable">
    {/*@ts-ignore*/}
    <LazyMultiSelectSearchable {...props} />
  </SuspenseWithTracking>
);

const SortableItemsImport = () => import('./SimpleSortableRows/SortableItems');
const LazySortableItems = lazy(() => SortableItemsImport().then(module => ({ default: module.SortableItems })));
export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SortableItems">
    {/*@ts-ignore*/}
    <LazySortableItems {...props} />
  </SuspenseWithTracking>
);

const SplitModalImport = () => import('./SplitModal/SplitModal');
const LazySplitModal = lazy(() => SplitModalImport().then(module => ({ default: module.SplitModal })));
export const SplitModal = <T extends ModalButtonLoaderEventType, >(props: SplitModalProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SplitModal">
    {/*@ts-ignore*/}
    <LazySplitModal {...props} />
  </SuspenseWithTracking>
);

const SplitPaneImport = () => import('./SplitPane/SplitPane');
const LazySplitPane = lazy(() => SplitPaneImport().then(module => ({ default: module.SplitPane })));
export const SplitPane = (props: SplitPaneProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="SplitPane">
    <LazySplitPane {...props} />
  </SuspenseWithTracking>
);

const TabsImport = () => import('./Tabs/Tabs');
const LazyTabs = lazy(() => TabsImport().then(module => ({ default: module.Tabs })));
export const Tabs = <T extends string, >(props: TabsProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Tabs">
    {/*@ts-ignore*/}
    <LazyTabs {...props} />
  </SuspenseWithTracking>
);

const TabsInlineImport = () => import('./Tabs/TabsInline');
const LazyTabsInline = lazy(() => TabsInlineImport().then(module => ({ default: module.TabsInline })));
export const TabsInline = <T, >(props: TabsInlineProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TabsInline">
    {/*@ts-ignore*/}
    <LazyTabsInline {...props} />
  </SuspenseWithTracking>
);

const TabsInlineBodyImport = () => import('./Tabs/TabsInlineBody');
const LazyTabsInlineBody = lazy(() => TabsInlineBodyImport().then(module => ({ default: module.TabsInlineBody })));
export const TabsInlineBody = <T, >(props: TabsInlineBodyProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TabsInlineBody">
    {/*@ts-ignore*/}
    <LazyTabsInlineBody {...props} />
  </SuspenseWithTracking>
);

const ThemeColorPaletteImport = () => import('./ThemeColorPalette/ThemeColorPalette');
const LazyThemeColorPalette = lazy(() => ThemeColorPaletteImport().then(module => ({ default: module.ThemeColorPalette })));
export const ThemeColorPalette = (props: ThemeColorPaletteProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="ThemeColorPalette">
    <LazyThemeColorPalette {...props} />
  </SuspenseWithTracking>
);

const TwoActionModalImport = () => import('./TwoActionModal/TwoActionModal');
const LazyTwoActionModal = lazy(() => TwoActionModalImport().then(module => ({ default: module.TwoActionModal })));
export const TwoActionModal = (props: TwoActionModalProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TwoActionModal">
    <LazyTwoActionModal {...props} />
  </SuspenseWithTracking>
);

const TwoContentSectionImport = () => import('./TwoContentSection/TwoContentSection');
const LazyTwoContentSection = lazy(() => TwoContentSectionImport().then(module => ({ default: module.TwoContentSection })));
export const TwoContentSection = (props: TwoContentSectionProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TwoContentSection">
    <LazyTwoContentSection {...props} />
  </SuspenseWithTracking>
);

const DatePickerImport = () => import('./datePickers/DatePicker');
const LazyDatePicker = lazy(() => DatePickerImport().then(module => ({ default: module.DatePicker })));
export const DatePicker = (props: DatePickerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DatePicker">
    <LazyDatePicker {...props} />
  </SuspenseWithTracking>
);

const DayPickerImport = () => import('./datePickers/DayPicker');
const LazyDayPicker = lazy(() => DayPickerImport().then(module => ({ default: module.DayPicker })));
export const DayPicker = (props: DayPickerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="DayPicker">
    <LazyDayPicker {...props} />
  </SuspenseWithTracking>
);

const InputDateImport = () => import('./datePickers/InputDate');
const LazyInputDate = lazy(() => InputDateImport().then(module => ({ default: module.InputDate })));
export const InputDate = (props: InputDateProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="InputDate">
    <LazyInputDate {...props} />
  </SuspenseWithTracking>
);

const MonthPickerImport = () => import('./datePickers/MonthPicker');
const LazyMonthPicker = lazy(() => MonthPickerImport().then(module => ({ default: module.MonthPicker })));
export const MonthPicker = (props: MonthPickerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MonthPicker">
    <LazyMonthPicker {...props} />
  </SuspenseWithTracking>
);

const TimePickerImport = () => import('./datePickers/TimePicker');
const LazyTimePicker = lazy(() => TimePickerImport().then(module => ({ default: module.TimePicker })));
export const TimePicker = (props: TimePickerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TimePicker">
    <LazyTimePicker {...props} />
  </SuspenseWithTracking>
);

const YearPickerImport = () => import('./datePickers/YearPicker');
const LazyYearPicker = lazy(() => YearPickerImport().then(module => ({ default: module.YearPicker })));
export const YearPicker = (props: YearPickerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="YearPicker">
    <LazyYearPicker {...props} />
  </SuspenseWithTracking>
);

const JukiLoadingLayoutImport = () => import('./layouts/JukiLoadingLayout');
const LazyJukiLoadingLayout = lazy(() => JukiLoadingLayoutImport().then(module => ({ default: module.JukiLoadingLayout })));
export const JukiLoadingLayout = (props: JukiLoadingLayoutProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="JukiLoadingLayout">
    <LazyJukiLoadingLayout {...props} />
  </SuspenseWithTracking>
);

const PawsLoadingLayoutImport = () => import('./layouts/PawsLoadingLayout');
const LazyPawsLoadingLayout = lazy(() => PawsLoadingLayoutImport().then(module => ({ default: module.PawsLoadingLayout })));
export const PawsLoadingLayout = (props: PawsLoadingLayoutProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="PawsLoadingLayout">
    <LazyPawsLoadingLayout {...props} />
  </SuspenseWithTracking>
);

const TwoContentCardsLayoutImport = () => import('./layouts/TwoContentCardsLayout');
const LazyTwoContentCardsLayout = lazy(() => TwoContentCardsLayoutImport().then(module => ({ default: module.TwoContentCardsLayout })));
export const TwoContentCardsLayout = <T, >(props: TwoContentCardsLayoutProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TwoContentCardsLayout">
    {/*@ts-ignore*/}
    <LazyTwoContentCardsLayout {...props} />
  </SuspenseWithTracking>
);

const TwoContentLayoutImport = () => import('./layouts/TwoContentLayout');
const LazyTwoContentLayout = lazy(() => TwoContentLayoutImport().then(module => ({ default: module.TwoContentLayout })));
export const TwoContentLayout = <T, >(props: TwoContentLayoutProps<T>) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TwoContentLayout">
    {/*@ts-ignore*/}
    <LazyTwoContentLayout {...props} />
  </SuspenseWithTracking>
);

const HomeLinkImport = () => import('./links/HomeLink');
const LazyHomeLink = lazy(() => HomeLinkImport().then(module => ({ default: module.HomeLink })));
export const HomeLink = (props: HomeLinkProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="HomeLink">
    <LazyHomeLink {...props} />
  </SuspenseWithTracking>
);

const CircularProgressImport = () => import('./progress/CircularProgress');
const LazyCircularProgress = lazy(() => CircularProgressImport().then(module => ({ default: module.CircularProgress })));
export const CircularProgress = (props: CircularProgressProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="CircularProgress">
    <LazyCircularProgress {...props} />
  </SuspenseWithTracking>
);

const MultiProgressBarImport = () => import('./progress/MultiProgressBar');
const LazyMultiProgressBar = lazy(() => MultiProgressBarImport().then(module => ({ default: module.MultiProgressBar })));
export const MultiProgressBar = (props: MultiProgressBarProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="MultiProgressBar">
    <LazyMultiProgressBar {...props} />
  </SuspenseWithTracking>
);

const TimerImport = () => import('./timers/Timer');
const LazyTimer = lazy(() => TimerImport().then(module => ({ default: module.Timer })));
export const Timer = (props: TimerProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="Timer">
    <LazyTimer {...props} />
  </SuspenseWithTracking>
);

const TimerLabeledImport = () => import('./timers/TimerLabeled');
const LazyTimerLabeled = lazy(() => TimerLabeledImport().then(module => ({ default: module.TimerLabeled })));
export const TimerLabeled = (props: TimerLabeledProps) => (
  <SuspenseWithTracking fallback={<SpinIcon size="tiny" />} id="TimerLabeled">
    <LazyTimerLabeled {...props} />
  </SuspenseWithTracking>
);

export const preloadMolecules = async () => {
  await BreadcrumbsImport();
  await ButtonLoaderImport();
  await CheckboxListImport();
  await CodeEditorImport();
  await CodeViewerImport();
  await DataGridImport();
  await DrawerImport();
  await DrawerViewImport();
  await FetcherLayerImport();
  await FirstLoginWrapperImport();
  await ButtonActionImport();
  await FloatToolbarImport();
  await ImageLoaderCropperImport();
  await InputColorImport();
  await LinkLastPathImport();
  await MultiSelectSearchableImport();
  await SortableItemsImport();
  await SplitModalImport();
  await SplitPaneImport();
  await TabsImport();
  await TabsInlineImport();
  await TabsInlineBodyImport();
  await ThemeColorPaletteImport();
  await TwoActionModalImport();
  await TwoContentSectionImport();
  await DatePickerImport();
  await DayPickerImport();
  await InputDateImport();
  await MonthPickerImport();
  await TimePickerImport();
  await YearPickerImport();
  await JukiLoadingLayoutImport();
  await PawsLoadingLayoutImport();
  await TwoContentCardsLayoutImport();
  await TwoContentLayoutImport();
  await HomeLinkImport();
  await CircularProgressImport();
  await MultiProgressBarImport();
  await TimerImport();
  await TimerLabeledImport();
};
