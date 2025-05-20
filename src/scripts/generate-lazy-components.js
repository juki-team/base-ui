const fs = require('fs');
const path = require('path');

const componentDirs = [
  {
    chunkName: 'Atoms',
    dir: path.resolve('./src/components/atoms'),
    headerLines: `import { SpinIcon } from './server/icons/SpinIcon';\nimport { ModalButtonLoaderEventType, ReactNodeOrFunctionType } from '../../types';`,
    withTypes: true,
  },
  {
    chunkName: 'Molecules',
    dir: path.resolve('./src/components/molecules'),
    headerLines: `import { SpinIcon } from '../atoms/server/icons/SpinIcon';\nimport { ContentResponseType, ContentsResponseType } from '@juki-team/commons';\nimport { ModalButtonLoaderEventType } from '../atoms/types';`,
    withTypes: true,
  },
  {
    chunkName: 'AtomsIconsGoogle',
    dir: path.resolve('./src/components/atoms/server/icons/google'),
    depth: 0,
    headerLines: `import { SpinIcon } from '../SpinIcon';\nimport { BasicIconProps } from '../types';`,
    withTypes: false,
    commonProp: 'BasicIconProps',
  },
  {
    chunkName: 'AtomsIconsSigns',
    dir: path.resolve('./src/components/atoms/server/icons/signs'),
    headerLines: `import { SpinIcon } from '../SpinIcon';\nimport { SignIconProps } from '../types';`,
    withTypes: false,
    commonProp: 'SignIconProps',
    cmpIndex: true,
  },
  {
    chunkName: 'AtomsIconsSpecials',
    dir: path.resolve('./src/components/atoms/server/icons/specials'),
    headerLines: `import { SpinIcon } from '../SpinIcon';`,
    withTypes: false,
    cmpIndex: true,
  },
  {
    chunkName: 'AtomsImages',
    dir: path.resolve('./src/components/atoms/server/images'),
    depth: 0,
    headerLines: `import { SpinIcon } from '../icons/SpinIcon';`,
    withTypes: false,
    withoutProps: true,
  },
  {
    chunkName: 'Organisms',
    dir: path.resolve('./src/components/organisms'),
    headerLines: `import { SpinIcon } from '../atoms/server/icons/SpinIcon';`,
    withTypes: true,
  },
  {
    chunkName: 'Templates',
    dir: path.resolve('./src/components/templates'),
    headerLines: `import { SpinIcon } from '../atoms/server/icons/SpinIcon';`,
    withTypes: true,
    footerLines: `export * from './helpers';`,
  },
];

const withGenericity = [
  [ `export const Modal = (props: ModalProps) => (`, "export const Modal = <T extends ModalButtonLoaderEventType = () => void>(props: ModalProps<T>) => (" ],
  [ `export const MultiSelect = (props: MultiSelectProps) => (`, `export const MultiSelect = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectProps<T, U, V>) => (` ],
  [ `export const Select = (props: SelectProps) => (`, `export const Select = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) => (` ],
  [ `export const Input = (props: InputProps) => (`, `export const Input = <T extends string | number | FileList, >(props: InputProps<T>) => (` ],
  [ `export const InputSelect = (props: InputSelectProps) => (`, `export const InputSelect = <T, U extends React.ReactNode, V extends ReactNodeOrFunctionType>(props: InputSelectProps<T, U, V>) => (` ],
  // molecules
  [ `export const CheckboxList = (props: CheckboxListProps) => (`, `export const CheckboxList = <T, >(props: CheckboxListProps<T>) => (` ],
  [ `export const CodeEditor = (props: CodeEditorProps) => (`, `export const CodeEditor = <T, >(props: CodeEditorProps<T>) => (` ],
  [ `export const FetcherLayer = (props: FetcherLayerProps) => (`, `export const FetcherLayer = <T extends (ContentResponseType<U> | ContentsResponseType<U>), U = any>(props: FetcherLayerProps<T, U>) => (` ],
  [ `export const MultiSelectSearchable = (props: MultiSelectSearchableProps) => (`, `export const MultiSelectSearchable = <T, U extends React.ReactNode, V extends React.ReactNode>(props: MultiSelectSearchableProps<T, U, V>) => (` ],
  [ `export const SortableItems = (props: SortableItemsProps) => (`, `export const SortableItems = <T, U = undefined>(props: SortableItemsProps<T, U>) => (` ],
  [ `export const SplitModal = (props: SplitModalProps) => (`, `export const SplitModal = <T extends ModalButtonLoaderEventType, >(props: SplitModalProps<T>) => (` ],
  [ `export const TabsInline = (props: TabsInlineProps) => (`, `export const TabsInline = <T, >(props: TabsInlineProps<T>) => (` ],
  [ `export const Tabs = (props: TabsProps) => (`, `export const Tabs = <T extends string, >(props: TabsProps<T>) => (` ],
  [ `export const TabsInlineBody = (props: TabsInlineBodyProps) => (`, `export const TabsInlineBody = <T, >(props: TabsInlineBodyProps<T>) => (` ],
  [ `export const TwoContentCardsLayout = (props: TwoContentCardsLayoutProps) => (`, `export const TwoContentCardsLayout = <T, >(props: TwoContentCardsLayoutProps<T>) => (` ],
  [ `export const TwoContentLayout = (props: TwoContentLayoutProps) => (`, `export const TwoContentLayout = <T, >(props: TwoContentLayoutProps<T>) => (` ],
  // organisms
  [ `export const CheckUnsavedChanges = (props: CheckUnsavedChangesProps) => (`, `export const CheckUnsavedChanges = <T extends object, >(props: CheckUnsavedChangesProps<T>) => (` ],
  [ `export const CodeRunnerEditor = (props: CodeRunnerEditorProps) => (`, `export const CodeRunnerEditor = <T, >(props: CodeRunnerEditorProps<T>) => (` ],
  [ `export const DataViewer = (props: DataViewerProps) => (`, `export const DataViewer = <T extends { [key: string]: any }, >(props: DataViewerProps<T>) => (` ],
  [ `export const PagedDataViewer = (props: PagedDataViewerProps) => (`, `export const PagedDataViewer = <T extends { [key: string]: any }, V = "T">(props: PagedDataViewerProps<T, V>) => (` ],
  [ `export const UserCodeEditor = (props: UserCodeEditorProps) => (`, `export const UserCodeEditor = <T, >(props: UserCodeEditorProps<T>) => (` ],
  // templates
  [ 'export const ProblemView = (props: ProblemViewProps) => (', 'export const ProblemView = <T, >(props: ProblemViewProps<T>) => (' ],
  [ 'export const CreateEntityLayout = (props: CreateEntityLayoutProps) => (', 'export const CreateEntityLayout = <T, U, V>(props: CreateEntityLayoutProps<T, U, V>) => (' ],
  [ 'export const UpdateEntityLayout = (props: UpdateEntityLayoutProps) => (', 'export const UpdateEntityLayout = <T, U, V>(props: UpdateEntityLayoutProps<T, U, V>) => (' ],
]

const preloadNames = [];

for (let {
  dir,
  headerLines,
  withTypes,
  commonProp,
  depth,
  cmpIndex,
  withoutProps,
  footerLines,
  chunkName
} of componentDirs) {
  
  console.info(`Generating ${dir}`);
  if (!fs.existsSync(dir)) continue;
  
  const folders = depth === 0 ?
    [ dir.split('/').slice(-1) ] :
    fs.readdirSync(dir)
      .filter(name => fs.statSync(path.join(dir, name)).isDirectory());
  if (depth === 0) {
    dir = dir.replace('/' + folders[0], '');
  }
  
  const files = (cmpIndex ? folders.map(folder => ({path: '.', file: folder}))
      : (folders
        .map(baseFolder => fs.readdirSync(dir + '/' + baseFolder)
          .map(folder => ({path: `./${baseFolder}/${folder}`, file: folder}))
        )
        .flat()
        .filter(({file}) => /^[A-Z]/.test(file) && file.endsWith('.tsx') && !file.endsWith('.stories.tsx')))
  )
    .map(({path: _path, file}) => {
      const name = path.basename(file, path.extname(file));
      return {basePath: (depth === 0 || cmpIndex) ? '.' : _path.replace('/' + name + '.tsx', ''), path: _path, name};
    })
  
  console.info({foldersSize: folders.length, filesSize: files.length});
  
  let indexContent = [
    `import React, { lazy, Suspense } from 'react';`,
    headerLines,
    ...(!commonProp && !withoutProps
      ? files.map(({
                     basePath,
                     name
                   }) => `import { ${name}Props } from '${cmpIndex ? `./${name}` : basePath}/types';`)
      : []),
    '',
    ...files.map(({basePath, path, name}) => {
      const lines = [
        `const ${name}Import = () => import('${basePath}/${name}');`,
        `const Lazy${name} = lazy(() => ${name}Import().then(module => ({ default: module.${name} })));`,
      ];
      
      let exportLine = `export const ${name} = (${withoutProps ? '' : (`props: ${commonProp ? commonProp : `${name}Props`}`)}) => (`;
      const index = withGenericity.findIndex(([ line, newLine ]) => {
        return exportLine === line;
      })
      if (index !== -1) {
        exportLine = withGenericity[index][1];
      }
      
      lines.push(exportLine, `  <Suspense fallback={<SpinIcon size="tiny" />}>`,);
      
      if (index !== -1) {
        lines.push(`    {/*@ts-ignore*/}`);
      }
      
      lines.push(
        `    <Lazy${name} ${withoutProps ? '' : '{...props} '}/>`,
        `  </Suspense>`,
        `);`,
        ``
      );
      
      return lines.join('\n');
    }),
    `export const preload${chunkName} = async () => {`,
    ...files.map(({name}) => `  await ${name}Import();`),
    '};',
    ''
  ].join('\n');
  
  if (footerLines) {
    indexContent += '\n' + footerLines + '\n';
  }
  
  const indexTypesContent = [
    ...files.map(({basePath, name}) => `export type * from '${basePath}/types';`),
  ].join('\n')
  
  if (depth === 0) {
    fs.writeFileSync(path.join(dir + '/' + folders[0], 'index.tsx'), indexContent);
    if (withTypes) {
      fs.writeFileSync(path.join(dir + '/' + folders[0], 'types.ts'), indexTypesContent);
    }
    console.info(`✅ Generated: ${path.join(dir + '/' + folders[0], 'index.tsx')}`);
  } else {
    fs.writeFileSync(path.join(dir, 'index.tsx'), indexContent);
    if (withTypes) {
      fs.writeFileSync(path.join(dir, 'types.ts'), indexTypesContent);
    }
    console.info(`✅ Generated: ${path.join(dir, 'index.tsx')}`);
  }
  preloadNames.push(`void preload${chunkName}();`);
}

console.info(preloadNames.join('\n'));
