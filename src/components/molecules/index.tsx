import { lazy, Suspense, ReactNode } from 'react';
//import { SuspenseWithTracking } from '../SuspenseWithTracking';
import { SpinIcon } from '../atoms/server';
import { ContentResponseType, ContentsResponseType } from '@juki-team/commons';
import { ModalButtonLoaderEventType } from '../atoms/types';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { BarChartProps } from './BarChart/types';
import { BreadcrumbsProps } from './Breadcrumbs/types';
import { ButtonLoaderProps } from './ButtonLoader/types';
import { CheckboxListProps } from './CheckboxList/types';
import { CodeEditorProps } from './CodeEditor/types';
import { CodeViewerProps } from './CodeViewer/types';
import { CodeViewerDeprecatedProps } from './CodeViewer/types';
import { DataGridProps } from './DataGrid/types';
import { DrawerProps } from './Drawer/types';
import { DrawerViewProps } from './Drawer/types';
import { FetcherLayerProps } from './FetcherLayer/types';
import { FirstLoginWrapperProps } from './FirstLoginWrapper/types';
import { ButtonActionProps } from './FloatToolbar/types';
import { FloatToolbarProps } from './FloatToolbar/types';
import { ImageLoaderCropperProps } from './ImageLoaderCropper/types';
import { InputColorProps } from './InputColor/types';
import { LineChartProps } from './LineChart/types';
import { LinkLastPathProps } from './LinkLastPath/types';
import { MultiSelectSearchableProps } from './MultiSelectSearchable/types';
import { SortableItemsProps } from './SimpleSortableRows/types';
import { SlideDeckProps } from './SlideDeck/types';
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

const BarChartImport = () => import('./BarChart/BarChart');
const LazyBarChart = lazy(() => BarChartImport().then(module => ({ default: module.BarChart })));
export const BarChart = <T extends ValueType, U extends NameType>(props: BarChartProps<T, U>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyBarChart {...props} />
  </Suspense>
);

const BreadcrumbsImport = () => import('./Breadcrumbs/Breadcrumbs');
const LazyBreadcrumbs = lazy(() => BreadcrumbsImport().then(module => ({ default: module.Breadcrumbs })));
export const Breadcrumbs = (props: BreadcrumbsProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyBreadcrumbs {...props} />
  </Suspense>
);

const ButtonLoaderImport = () => import('./ButtonLoader/ButtonLoader');
const LazyButtonLoader = lazy(() => ButtonLoaderImport().then(module => ({ default: module.ButtonLoader })));
export const ButtonLoader = (props: ButtonLoaderProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyButtonLoader {...props} />
  </Suspense>
);

const CheckboxListImport = () => import('./CheckboxList/CheckboxList');
const LazyCheckboxList = lazy(() => CheckboxListImport().then(module => ({ default: module.CheckboxList })));
export const CheckboxList = <T, >(props: CheckboxListProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCheckboxList {...props} />
  </Suspense>
);

const CodeEditorImport = () => import('./CodeEditor/CodeEditor');
const LazyCodeEditor = lazy(() => CodeEditorImport().then(module => ({ default: module.CodeEditor })));
export const CodeEditor = <T, >(props: CodeEditorProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyCodeEditor {...props} />
  </Suspense>
);

const CodeViewerImport = () => import('./CodeViewer/CodeViewer');
const LazyCodeViewer = lazy(() => CodeViewerImport().then(module => ({ default: module.CodeViewer })));
export const CodeViewer = (props: CodeViewerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeViewer {...props} />
  </Suspense>
);

const CodeViewerDeprecatedImport = () => import('./CodeViewer/CodeViewerDeprecated');
const LazyCodeViewerDeprecated = lazy(() => CodeViewerDeprecatedImport().then(module => ({ default: module.CodeViewerDeprecated })));
export const CodeViewerDeprecated = (props: CodeViewerDeprecatedProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCodeViewerDeprecated {...props} />
  </Suspense>
);

const DataGridImport = () => import('./DataGrid/DataGrid');
const LazyDataGrid = lazy(() => DataGridImport().then(module => ({ default: module.DataGrid })));
export const DataGrid = (props: DataGridProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDataGrid {...props} />
  </Suspense>
);

const DrawerImport = () => import('./Drawer/Drawer');
const LazyDrawer = lazy(() => DrawerImport().then(module => ({ default: module.Drawer })));
export const Drawer = (props: DrawerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDrawer {...props} />
  </Suspense>
);

const DrawerViewImport = () => import('./Drawer/DrawerView');
const LazyDrawerView = lazy(() => DrawerViewImport().then(module => ({ default: module.DrawerView })));
export const DrawerView = (props: DrawerViewProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDrawerView {...props} />
  </Suspense>
);

const FetcherLayerImport = () => import('./FetcherLayer/FetcherLayer');
const LazyFetcherLayer = lazy(() => FetcherLayerImport().then(module => ({ default: module.FetcherLayer })));
export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyFetcherLayer {...props} />
  </Suspense>
);

const FirstLoginWrapperImport = () => import('./FirstLoginWrapper/FirstLoginWrapper');
const LazyFirstLoginWrapper = lazy(() => FirstLoginWrapperImport().then(module => ({ default: module.FirstLoginWrapper })));
export const FirstLoginWrapper = (props: FirstLoginWrapperProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFirstLoginWrapper {...props} />
  </Suspense>
);

const ButtonActionImport = () => import('./FloatToolbar/ButtonAction');
const LazyButtonAction = lazy(() => ButtonActionImport().then(module => ({ default: module.ButtonAction })));
export const ButtonAction = (props: ButtonActionProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyButtonAction {...props} />
  </Suspense>
);

const FloatToolbarImport = () => import('./FloatToolbar/FloatToolbar');
const LazyFloatToolbar = lazy(() => FloatToolbarImport().then(module => ({ default: module.FloatToolbar })));
export const FloatToolbar = (props: FloatToolbarProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyFloatToolbar {...props} />
  </Suspense>
);

const ImageLoaderCropperImport = () => import('./ImageLoaderCropper/ImageLoaderCropper');
const LazyImageLoaderCropper = lazy(() => ImageLoaderCropperImport().then(module => ({ default: module.ImageLoaderCropper })));
export const ImageLoaderCropper = (props: ImageLoaderCropperProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyImageLoaderCropper {...props} />
  </Suspense>
);

const InputColorImport = () => import('./InputColor/InputColor');
const LazyInputColor = lazy(() => InputColorImport().then(module => ({ default: module.InputColor })));
export const InputColor = (props: InputColorProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputColor {...props} />
  </Suspense>
);

const LineChartImport = () => import('./LineChart/LineChart');
const LazyLineChart = lazy(() => LineChartImport().then(module => ({ default: module.LineChart })));
export const LineChart = <T extends ValueType, U extends NameType>(props: LineChartProps<T, U>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyLineChart {...props} />
  </Suspense>
);

const LinkLastPathImport = () => import('./LinkLastPath/LinkLastPath');
const LazyLinkLastPath = lazy(() => LinkLastPathImport().then(module => ({ default: module.LinkLastPath })));
export const LinkLastPath = (props: LinkLastPathProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyLinkLastPath {...props} />
  </Suspense>
);

const MultiSelectSearchableImport = () => import('./MultiSelectSearchable/MultiSelectSearchable');
const LazyMultiSelectSearchable = lazy(() => MultiSelectSearchableImport().then(module => ({ default: module.MultiSelectSearchable })));
export const MultiSelectSearchable = <T, U extends ReactNode, V extends ReactNode>(props: MultiSelectSearchableProps<T, U, V>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyMultiSelectSearchable {...props} />
  </Suspense>
);

const SortableItemsImport = () => import('./SimpleSortableRows/SortableItems');
const LazySortableItems = lazy(() => SortableItemsImport().then(module => ({ default: module.SortableItems })));
export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazySortableItems {...props} />
  </Suspense>
);

const SlideDeckImport = () => import('./SlideDeck/SlideDeck');
const LazySlideDeck = lazy(() => SlideDeckImport().then(module => ({ default: module.SlideDeck })));
export const SlideDeck = (props: SlideDeckProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySlideDeck {...props} />
  </Suspense>
);

const SplitModalImport = () => import('./SplitModal/SplitModal');
const LazySplitModal = lazy(() => SplitModalImport().then(module => ({ default: module.SplitModal })));
export const SplitModal = <T extends ModalButtonLoaderEventType, >(props: SplitModalProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazySplitModal {...props} />
  </Suspense>
);

const SplitPaneImport = () => import('./SplitPane/SplitPane');
const LazySplitPane = lazy(() => SplitPaneImport().then(module => ({ default: module.SplitPane })));
export const SplitPane = (props: SplitPaneProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazySplitPane {...props} />
  </Suspense>
);

const TabsImport = () => import('./Tabs/Tabs');
const LazyTabs = lazy(() => TabsImport().then(module => ({ default: module.Tabs })));
export const Tabs = <T extends string, >(props: TabsProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTabs {...props} />
  </Suspense>
);

const TabsInlineImport = () => import('./Tabs/TabsInline');
const LazyTabsInline = lazy(() => TabsInlineImport().then(module => ({ default: module.TabsInline })));
export const TabsInline = <T, >(props: TabsInlineProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTabsInline {...props} />
  </Suspense>
);

const TabsInlineBodyImport = () => import('./Tabs/TabsInlineBody');
const LazyTabsInlineBody = lazy(() => TabsInlineBodyImport().then(module => ({ default: module.TabsInlineBody })));
export const TabsInlineBody = <T, >(props: TabsInlineBodyProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTabsInlineBody {...props} />
  </Suspense>
);

const ThemeColorPaletteImport = () => import('./ThemeColorPalette/ThemeColorPalette');
const LazyThemeColorPalette = lazy(() => ThemeColorPaletteImport().then(module => ({ default: module.ThemeColorPalette })));
export const ThemeColorPalette = (props: ThemeColorPaletteProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyThemeColorPalette {...props} />
  </Suspense>
);

const TwoActionModalImport = () => import('./TwoActionModal/TwoActionModal');
const LazyTwoActionModal = lazy(() => TwoActionModalImport().then(module => ({ default: module.TwoActionModal })));
export const TwoActionModal = (props: TwoActionModalProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTwoActionModal {...props} />
  </Suspense>
);

const TwoContentSectionImport = () => import('./TwoContentSection/TwoContentSection');
const LazyTwoContentSection = lazy(() => TwoContentSectionImport().then(module => ({ default: module.TwoContentSection })));
export const TwoContentSection = (props: TwoContentSectionProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTwoContentSection {...props} />
  </Suspense>
);

const DatePickerImport = () => import('./datePickers/DatePicker');
const LazyDatePicker = lazy(() => DatePickerImport().then(module => ({ default: module.DatePicker })));
export const DatePicker = (props: DatePickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDatePicker {...props} />
  </Suspense>
);

const DayPickerImport = () => import('./datePickers/DayPicker');
const LazyDayPicker = lazy(() => DayPickerImport().then(module => ({ default: module.DayPicker })));
export const DayPicker = (props: DayPickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyDayPicker {...props} />
  </Suspense>
);

const InputDateImport = () => import('./datePickers/InputDate');
const LazyInputDate = lazy(() => InputDateImport().then(module => ({ default: module.InputDate })));
export const InputDate = (props: InputDateProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyInputDate {...props} />
  </Suspense>
);

const MonthPickerImport = () => import('./datePickers/MonthPicker');
const LazyMonthPicker = lazy(() => MonthPickerImport().then(module => ({ default: module.MonthPicker })));
export const MonthPicker = (props: MonthPickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMonthPicker {...props} />
  </Suspense>
);

const TimePickerImport = () => import('./datePickers/TimePicker');
const LazyTimePicker = lazy(() => TimePickerImport().then(module => ({ default: module.TimePicker })));
export const TimePicker = (props: TimePickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimePicker {...props} />
  </Suspense>
);

const YearPickerImport = () => import('./datePickers/YearPicker');
const LazyYearPicker = lazy(() => YearPickerImport().then(module => ({ default: module.YearPicker })));
export const YearPicker = (props: YearPickerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyYearPicker {...props} />
  </Suspense>
);

const JukiLoadingLayoutImport = () => import('./layouts/JukiLoadingLayout');
const LazyJukiLoadingLayout = lazy(() => JukiLoadingLayoutImport().then(module => ({ default: module.JukiLoadingLayout })));
export const JukiLoadingLayout = (props: JukiLoadingLayoutProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyJukiLoadingLayout {...props} />
  </Suspense>
);

const PawsLoadingLayoutImport = () => import('./layouts/PawsLoadingLayout');
const LazyPawsLoadingLayout = lazy(() => PawsLoadingLayoutImport().then(module => ({ default: module.PawsLoadingLayout })));
export const PawsLoadingLayout = (props: PawsLoadingLayoutProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyPawsLoadingLayout {...props} />
  </Suspense>
);

const TwoContentCardsLayoutImport = () => import('./layouts/TwoContentCardsLayout');
const LazyTwoContentCardsLayout = lazy(() => TwoContentCardsLayoutImport().then(module => ({ default: module.TwoContentCardsLayout })));
export const TwoContentCardsLayout = <T, >(props: TwoContentCardsLayoutProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTwoContentCardsLayout {...props} />
  </Suspense>
);

const TwoContentLayoutImport = () => import('./layouts/TwoContentLayout');
const LazyTwoContentLayout = lazy(() => TwoContentLayoutImport().then(module => ({ default: module.TwoContentLayout })));
export const TwoContentLayout = <T, >(props: TwoContentLayoutProps<T>) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    {/*@ts-ignore*/}
    <LazyTwoContentLayout {...props} />
  </Suspense>
);

const HomeLinkImport = () => import('./links/HomeLink');
const LazyHomeLink = lazy(() => HomeLinkImport().then(module => ({ default: module.HomeLink })));
export const HomeLink = (props: HomeLinkProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyHomeLink {...props} />
  </Suspense>
);

const CircularProgressImport = () => import('./progress/CircularProgress');
const LazyCircularProgress = lazy(() => CircularProgressImport().then(module => ({ default: module.CircularProgress })));
export const CircularProgress = (props: CircularProgressProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyCircularProgress {...props} />
  </Suspense>
);

const MultiProgressBarImport = () => import('./progress/MultiProgressBar');
const LazyMultiProgressBar = lazy(() => MultiProgressBarImport().then(module => ({ default: module.MultiProgressBar })));
export const MultiProgressBar = (props: MultiProgressBarProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyMultiProgressBar {...props} />
  </Suspense>
);

const TimerImport = () => import('./timers/Timer');
const LazyTimer = lazy(() => TimerImport().then(module => ({ default: module.Timer })));
export const Timer = (props: TimerProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimer {...props} />
  </Suspense>
);

const TimerLabeledImport = () => import('./timers/TimerLabeled');
const LazyTimerLabeled = lazy(() => TimerLabeledImport().then(module => ({ default: module.TimerLabeled })));
export const TimerLabeled = (props: TimerLabeledProps) => (
  <Suspense fallback={<SpinIcon size="tiny" />}>
    <LazyTimerLabeled {...props} />
  </Suspense>
);

export const preloadMolecules = async () => {
  await BarChartImport();
  await BreadcrumbsImport();
  await ButtonLoaderImport();
  await CheckboxListImport();
  await CodeEditorImport();
  await CodeViewerImport();
  await CodeViewerDeprecatedImport();
  await DataGridImport();
  await DrawerImport();
  await DrawerViewImport();
  await FetcherLayerImport();
  await FirstLoginWrapperImport();
  await ButtonActionImport();
  await FloatToolbarImport();
  await ImageLoaderCropperImport();
  await InputColorImport();
  await LineChartImport();
  await LinkLastPathImport();
  await MultiSelectSearchableImport();
  await SortableItemsImport();
  await SlideDeckImport();
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
