const fs = require('fs');
const path = require('path');

const componentDirs = [
  {
    dir: path.resolve('./src/components/atoms'),
    loadingLine: `import { LoadingIcon } from './server';\nimport { ModalButtonLoaderEventType, ReactNodeOrFunctionType } from '../../types';`,
    withTypes: true,
  },
  {
    dir: path.resolve('./src/components/molecules'),
    loadingLine: `import { LoadingIcon } from '../atoms/server';\nimport { ContentResponseType, ContentsResponseType } from '@juki-team/commons';\nimport { ModalButtonLoaderEventType } from '../atoms/types';`,
    withTypes: true,
  },
  {
    dir: path.resolve('./src/components/atoms/server/icons/google'),
    depth: 0,
    loadingLine: `import { LoadingIcon } from '../LoadingIcon';\nimport { BasicIconProps } from '../types';`,
    withTypes: false,
    commonProp: 'BasicIconProps',
  },
  {
    dir: path.resolve('./src/components/atoms/server/icons/signs'),
    loadingLine: `import { LoadingIcon } from '../LoadingIcon';\nimport { SignIconProps } from '../types';`,
    withTypes: false,
    commonProp: 'SignIconProps',
    cmpIndex: true,
  },
  {
    dir: path.resolve('./src/components/atoms/server/icons/specials'),
    loadingLine: `import { LoadingIcon } from '../LoadingIcon';`,
    withTypes: false,
    cmpIndex: true,
  },
  {
    dir: path.resolve('./src/components/atoms/server/images'),
    depth: 0,
    loadingLine: `import { LoadingIcon } from '../icons/LoadingIcon';`,
    withTypes: false,
    withoutProps: true,
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
]

for (let {dir, loadingLine, withTypes, commonProp, depth, cmpIndex, withoutProps} of componentDirs) {
  console.log(`Generating ${dir}`);
  if (!fs.existsSync(dir)) continue;
  
  const folders = depth === 0 ?
    [ dir.split('/').slice(-1) ] :
    fs.readdirSync(dir)
      .filter(name => fs.statSync(path.join(dir, name)).isDirectory());
  if (depth === 0) {
    dir = dir.replace('/' + folders[0], '');
  }
  console.log({folders})
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
  
  console.log({folders, files})
  
  const indexContent = [
    `import React, { lazy, Suspense } from 'react';`,
    loadingLine,
    !commonProp && !withoutProps
      ? files.map(({
                     basePath,
                     name
                   }) => `import { ${name}Props } from '${cmpIndex ? `./${name}` : basePath}/types';`).join('\n') + '\n'
      : '',
    ...files.map(({basePath, path, name}) => {
      const lines = [
        `const Lazy${name} = lazy(() => import('${basePath}/${name}').then(module => ({ default: module.${name} })));`,
      ];
      
      let exportLine = `export const ${name} = (${withoutProps ? '' : (`props: ${commonProp ? commonProp : `${name}Props`}`)}) => (`;
      const index = withGenericity.findIndex(([ line, newLine ]) => {
        return exportLine === line;
      })
      if (index !== -1) {
        exportLine = withGenericity[index][1];
      }
      
      lines.push(exportLine, `  <Suspense fallback={<LoadingIcon size="tiny" />}>`,);
      
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
  ].join('\n');
  
  const indexTypesContent = [
    ...files.map(({basePath, name}) => `export * from '${basePath}/types';`),
  ].join('\n')
  
  if (depth === 0) {
    fs.writeFileSync(path.join(dir + '/' + folders[0], 'index.tsx'), indexContent);
    if (withTypes) {
      fs.writeFileSync(path.join(dir + '/' + folders[0], 'types.ts'), indexTypesContent);
    }
    console.log(`✅ Generado: ${path.join(dir + '/' + folders[0], 'index.tsx')}`);
  } else {
    fs.writeFileSync(path.join(dir, 'index.tsx'), indexContent);
    if (withTypes) {
      fs.writeFileSync(path.join(dir, 'types.ts'), indexTypesContent);
    }
    console.log(`✅ Generado: ${path.join(dir, 'index.tsx')}`);
  }
}
