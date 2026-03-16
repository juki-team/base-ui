import { useState } from 'react';
import { Button, Input, Modal, T } from '../../../../../atoms';
import {
  AddIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
  DraftIcon,
  EditIcon,
  FolderIcon,
  FolderOpenIcon,
} from '../../../../../atoms/server';
import { classNames, normalizeFolderPath } from '../../../../../helpers';
import { TwoActionModal } from '../../../../../molecules';
import type { FileTreePanelProps } from './types';

type TreeNode =
  | {
      type: 'folder';
      name: string;
      path: string;
      children: TreeNode[];
      files: { name: string; index: number }[];
    }
  | {
      type: 'file';
      name: string;
      index: number;
    };

function buildTree(entries: [string, { folderPath: string; index: number }][]): TreeNode[] {
  const root: TreeNode[] = [];
  const folderMap = new Map<string, TreeNode & { type: 'folder' }>();

  const getOrCreateFolder = (path: string): TreeNode & { type: 'folder' } => {
    if (folderMap.has(path)) return folderMap.get(path)!;
    const parts = path.split('/').filter(Boolean);
    const name = parts[parts.length - 1] ?? path;
    const node: TreeNode & { type: 'folder' } = { type: 'folder', name, path, children: [], files: [] };
    folderMap.set(path, node);
    if (parts.length <= 1) {
      root.push(node);
    } else {
      const parentPath = '/' + parts.slice(0, -1).join('/');
      const parent = getOrCreateFolder(parentPath);
      parent.children.push(node);
    }
    return node;
  };

  const rootFiles: { name: string; index: number }[] = [];

  for (const [name, file] of entries) {
    const fp = file.folderPath;
    const isRoot = !fp || fp === '/' || fp === '';
    if (isRoot) {
      rootFiles.push({ name, index: file.index });
    } else {
      const folder = getOrCreateFolder(fp.startsWith('/') ? fp : '/' + fp);
      folder.files.push({ name, index: file.index });
    }
  }

  const rootFileNodes: TreeNode[] = rootFiles
    .sort((a, b) => a.index - b.index)
    .map((f) => ({ type: 'file', name: f.name, index: f.index }));

  return [...rootFileNodes, ...root];
}

interface FileNodeProps<T> {
  name: string;
  globalIndex: number;
  currentFileName: string;
  viewFiles: boolean;
  onChangeRef: FileTreePanelProps<T>['onChangeRef'];
  setOpenFileName: (name: string) => void;
  setFileNameEdit: (name: string) => void;
  setFolderPathEdit: (path: string) => void;
  setFileNameDelete: (name: string) => void;
  folderPath: string;
}

function FileNode<T>({
  name,
  globalIndex,
  currentFileName,
  viewFiles,
  onChangeRef,
  setOpenFileName,
  setFileNameEdit,
  setFolderPathEdit,
  setFileNameDelete,
  folderPath,
}: FileNodeProps<T>) {
  return (
    <div
      key={name}
      className={classNames('tx-t jk-pg-xsm jk-col nowrap left stretch', {
        'bc-al cr-at-it': name === currentFileName,
        hoverable: name !== currentFileName,
      })}
      onClick={
        name !== currentFileName
          ? (e) => {
              e.stopPropagation();
              onChangeRef.current?.({ fileName: name });
            }
          : (e) => e.stopPropagation()
      }
    >
      {viewFiles ? (
        <>
          <div className="jk-row gap nowrap space-between">
            <div className="jk-row nowrap">
              <DraftIcon letter={((globalIndex + 1) % 10) + ''} letterSize={12} size="tiny" />
              <span
                data-tooltip-id="jk-tooltip"
                data-tooltip-content={name}
                style={{
                  marginLeft: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontFamily: 'monospace',
                  letterSpacing: '-0.04em',
                  maxWidth: 64,
                  width: 64,
                }}
              >
                {name}
              </span>
            </div>
            <div className="jk-row gap display-on-hover-2 nowrap">
              <EditIcon
                className={classNames({ 'cr-tx-ht-lt': name !== currentFileName })}
                size="tiny"
                onClick={() => {
                  setOpenFileName(name);
                  setFileNameEdit(name.split('/').filter(Boolean).pop() ?? name);
                  setFolderPathEdit(folderPath.replace(/^\//, ''));
                }}
              />
              <DeleteIcon
                className={classNames({ 'cr-tx-ht-lt': name !== currentFileName })}
                size="tiny"
                onClick={() => setFileNameDelete(name)}
              />
            </div>
          </div>
        </>
      ) : (
        <DraftIcon letter={((globalIndex + 1) % 10) + ''} letterSize={12} size="tiny" />
      )}
    </div>
  );
}

interface FolderNodeProps<T> extends Omit<FileNodeProps<T>, 'name' | 'globalIndex'> {
  node: TreeNode & { type: 'folder' };
  depth: number;
  globalIndexMap: Map<string, number>;
}

function folderContainsFile(node: TreeNode & { type: 'folder' }, fileName: string): boolean {
  if (node.files.some((f) => f.name === fileName)) return true;
  return node.children.some((child) => child.type === 'folder' && folderContainsFile(child, fileName));
}

function FolderNode<T>({
  node,
  depth,
  viewFiles,
  currentFileName,
  onChangeRef,
  setOpenFileName,
  setFileNameEdit,
  setFolderPathEdit,
  setFileNameDelete,
  globalIndexMap,
}: FolderNodeProps<T>) {
  const [expanded, setExpanded] = useState(true);
  const containsCurrent = folderContainsFile(node, currentFileName);
  const isExpanded = containsCurrent || expanded;

  return (
    <div style={{ paddingLeft: depth > 0 ? 0 : 0 }}>
      <div
        className="jk-row left gap hoverable jk-pg-xsm tx-t fw-bd nowrap"
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.stopPropagation();
          if (!containsCurrent) setExpanded((v) => !v);
        }}
      >
        {isExpanded ? <FolderOpenIcon size="tiny" /> : <FolderIcon size="tiny" />}
        {viewFiles && <span>{node.name}</span>}
        {viewFiles && (isExpanded ? <ArrowDropDownIcon size="tiny" /> : <ArrowDropUpIcon size="tiny" />)}
      </div>
      {isExpanded && (
        <div style={{ marginLeft: 14, borderLeft: '1px solid var(--cr-ht)' }}>
          {node.files
            .sort((a, b) => a.index - b.index)
            .map((f) => (
              <FileNode<T>
                key={f.name}
                name={f.name}
                globalIndex={globalIndexMap.get(f.name) ?? f.index}
                currentFileName={currentFileName}
                viewFiles={viewFiles}
                onChangeRef={onChangeRef}
                setOpenFileName={setOpenFileName}
                setFileNameEdit={setFileNameEdit}
                setFolderPathEdit={setFolderPathEdit}
                setFileNameDelete={setFileNameDelete}
                folderPath={node.path}
              />
            ))}
          {node.children.map((child) =>
            child.type === 'folder' ? (
              <FolderNode<T>
                key={child.path}
                node={child}
                depth={depth + 1}
                viewFiles={viewFiles}
                currentFileName={currentFileName}
                onChangeRef={onChangeRef}
                setOpenFileName={setOpenFileName}
                setFileNameEdit={setFileNameEdit}
                setFolderPathEdit={setFolderPathEdit}
                setFileNameDelete={setFileNameDelete}
                globalIndexMap={globalIndexMap}
                folderPath={node.path}
              />
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}

export const FileTreePanel = <T,>(props: FileTreePanelProps<T>) => {
  const { fileTreePanelRef, files, currentFileName, onChangeRef, readOnly } = props;

  const [viewFiles, setViewFiles] = useState<boolean>(false);
  const [openFileName, setOpenFileName] = useState('');
  const [fileNameEdit, setFileNameEdit] = useState('');
  const [folderPathEdit, setFolderPathEdit] = useState('');
  const [fileNameDelete, setFileNameDelete] = useState('');

  const onChange = () => {
    onChangeRef.current?.({ fileNameEdited: [openFileName, fileNameEdit, normalizeFolderPath(folderPathEdit)] });
    setOpenFileName('');
  };

  const entries = Object.entries(files) as [string, { folderPath: string; index: number }][];
  const sorted = [...entries].sort(([, a], [, b]) => a.index - b.index);
  const globalIndexMap = new Map(sorted.map(([name], i) => [name, i]));
  const tree = buildTree(entries);

  const fileNodeProps = {
    currentFileName,
    viewFiles,
    onChangeRef,
    setOpenFileName,
    setFileNameEdit,
    setFolderPathEdit,
    setFileNameDelete,
  };

  return (
    <>
      <TwoActionModal
        primary={{
          label: <T className="tt-se">delete</T>,
          onClick: () => {
            onChangeRef.current?.({ fileNameDeleted: fileNameDelete });
            setFileNameDelete('');
          },
        }}
        title={<T className="tt-se">warning</T>}
        isOpen={!!fileNameDelete}
        onClose={() => setFileNameDelete('')}
      >
        <div className="jk-col gap">
          <T className="tt-se">are you sure you want to delete the file?</T>
          <div className="jk-tag bc-ht-lt">{fileNameDelete}</div>
          <T className="tt-se">{"it can't be undone"}</T>
        </div>
      </TwoActionModal>
      <Modal isOpen={!!openFileName} onClose={() => setOpenFileName('')}>
        <div className="jk-pg jk-col gap stretch">
          <Input
            label={<T className="tt-se">new name</T>}
            labelPlacement="top"
            value={fileNameEdit}
            onChange={setFileNameEdit}
            onEnter={onChange}
            expand
          />
          <Input
            label={<T className="tt-se">folder path</T>}
            labelPlacement="top"
            value={folderPathEdit}
            onChange={setFolderPathEdit}
            onEnter={onChange}
            expand
          />
          <div className="jk-row gap right">
            <Button type="secondary" onClick={() => setOpenFileName('')}>
              <T className="tt-se">cancel</T>
            </Button>
            <Button onClick={onChange}>
              <T className="tt-se">change</T>
            </Button>
          </div>
        </div>
      </Modal>
      <div className="jk-col top stretch nowrap" style={{ borderRight: '1px solid var(--cr-ht-lt)' }} ref={fileTreePanelRef}>
        <div
          className="jk-row fw-bd jk-pg-xsm-tb bc-ht-lt left hoverable"
          onClick={() => setViewFiles(!viewFiles)}
          style={{ paddingLeft: 4 }}
        >
          {viewFiles ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          {viewFiles && <T className="tt-se">files</T>}
        </div>
        <div className="jk-divider vertical tiny" style={{ height: 1 }} />
        <div className="jk-col top stretch gap nowrap ow-ao">
          <div className="jk-col stretch">
            {tree.map((node) =>
              node.type === 'file' ? (
                <FileNode<T>
                  key={node.name}
                  name={node.name}
                  globalIndex={globalIndexMap.get(node.name) ?? node.index}
                  folderPath=""
                  {...fileNodeProps}
                />
              ) : (
                <FolderNode<T>
                  key={node.path}
                  node={node}
                  depth={0}
                  globalIndexMap={globalIndexMap}
                  folderPath=""
                  {...fileNodeProps}
                />
              ),
            )}
          </div>
          <div className="jk-row jk-pg-xsm-t border-top-highlight-light">
            <Button
              size="tiny"
              icon={<AddIcon />}
              disabled={readOnly}
              onClick={() => onChangeRef.current?.({ newFileName: true })}
            >
              {viewFiles && <T className="tt-se">new file</T>}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
