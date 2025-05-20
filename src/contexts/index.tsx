// const LazyJukiProviders = lazy(() => import('./JukiProviders').then(module => ({ default: module.JukiProviders })));
//
// export const JukiProviders = <T extends string | number, >(props: PropsWithChildren<JukiProvidersProps<T>>) => (
//   <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
//     <LazyJukiProviders {...props} />
//   </Suspense>
// );
export * from './JukiProviders';
export * from './JukiI18nProvider';
