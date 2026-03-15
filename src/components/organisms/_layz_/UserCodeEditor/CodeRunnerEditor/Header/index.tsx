import { CodeLanguage, RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES } from '@juki-team/commons';
import domToImage from 'dom-to-image-more';
import { ReactNode, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../../../../constants';
import { Button, Select, T } from '../../../../../atoms';
import { classNames, downloadBlobAsFile } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { useKeyDown } from '../../../../../hooks/useKeyDown';
import { CodeViewer } from '../../../../../molecules';
import { ContentCopyIcon, DownloadIcon, FullscreenExitIcon, FullscreenIcon, SettingsIcon } from '../../../../../server';
import type { HeaderProps } from '../types';
import { RunCodeButton } from './RunCodeButton';

export const Header = <T,>(props: HeaderProps<T>) => {
  const {
    onChangeRef,
    setShowSettings,
    leftOptions,
    centerOptions,
    rightOptions,
    onRunStart,
    expanded,
    setExpanded,
    headerRef,
    headerWidthContainer,
    files,
    currentFileName,
    runner,
    setRunState,
    languages,
    readOnly,
  } = props;

  const { addQuietNotification } = useJukiNotification();
  const { width: widthLeftSection = 0, ref: refLeftSection } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { width: widthRightSection = 0, ref: refRightSection } = useResizeDetector(RESIZE_DETECTOR_PROPS);

  const { source = '', language = CodeLanguage.TEXT } = files[currentFileName] ?? {};

  const downloadAsText = useCallback(() => {
    const currentFile = files[currentFileName];
    if (currentFile?.source && currentFile?.name) {
      downloadBlobAsFile(currentFile.source as unknown as Blob, currentFile.name);
      addQuietNotification(<T className="tt-se">downloaded</T>);
    }
  }, [addQuietNotification, currentFileName, files]);

  const toPng = async () => {
    const cmThemeNode = document.querySelector('.code-viewer-to-print');
    if (!cmThemeNode) {
      return;
    }
    try {
      return await domToImage.toBlob(cmThemeNode);
    } catch (error) {
      console.error('Error al capturar imagen:', error);
    }
    return;
  };

  const downloadAsPng = useCallback(async () => {
    const currentFile = files[currentFileName];
    if (currentFile?.source && currentFile?.name) {
      const blob = await toPng();
      if (blob) {
        downloadBlobAsFile(blob, `${currentFile.name}.png`);
        addQuietNotification(<T className="tt-se">downloaded</T>);
      }
    }
  }, [addQuietNotification, currentFileName, files]);

  const copyAsText = useCallback(async () => {
    const currentFile = files[currentFileName];
    if (currentFile?.source) {
      try {
        await navigator.clipboard.writeText(currentFile.source);
        addQuietNotification(<T className="tt-se">copied</T>);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }, [addQuietNotification, currentFileName, files]);

  const copyAsPng = useCallback(async () => {
    try {
      const blob = await toPng();
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        addQuietNotification(<T className="tt-se">copied</T>);
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  }, [addQuietNotification]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const metaOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (!metaOrCtrl) {
        return;
      }

      // Download as text (Ctrl+Shift+S / ⌘+Shift+S)
      if (e.shiftKey && !e.altKey && e.code === 'KeyS') {
        e.preventDefault();
        downloadAsText();
        return;
      }

      // Download as PNG (Ctrl+Alt+S / ⌘+Option+S)
      if (!e.shiftKey && e.altKey && e.code === 'KeyS') {
        e.preventDefault();
        void downloadAsPng();
        return;
      }

      // Copy as text (Ctrl+Shift+C / ⌘+Shift+C)
      if (e.shiftKey && !e.altKey && e.code === 'KeyC') {
        e.preventDefault();
        void copyAsText();
        return;
      }

      // Copy as PNG (Ctrl+Alt+C / ⌘+Option+C)
      if (!e.shiftKey && e.altKey && e.code === 'KeyC') {
        e.preventDefault();
        void copyAsPng();
      }
    },
    [downloadAsText, downloadAsPng, copyAsText, copyAsPng],
  );

  useKeyDown(handleKeyDown);

  const withRunCodeButton = RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES.includes(language as CodeLanguage);
  const minWidth = runner ? 620 : 570;
  const withLabels = headerWidthContainer > minWidth;

  const widthCenterContainer = headerWidthContainer - widthLeftSection - widthRightSection;

  return (
    <div className="options-header-content jk-row jk-pg-xsm" ref={headerRef}>
      <div className={classNames('cr-tx-ht jk-row gap left')} ref={refLeftSection}>
        {readOnly || languages.length === 1 ? (
          <div className="jk-tag bc-io">{(languages.find((lang) => lang.value === language)?.label || language) + ''}</div>
        ) : (
          <Select
            className="languages-selector tx-s"
            options={languages.map((language) => ({
              value: language.value,
              label: (language.label || language.value) as ReactNode,
            }))}
            selectedOption={{
              value: language,
              label: (languages.find((lang) => lang.value === language)?.label || language) as ReactNode,
            }}
            onChange={({ value }) => onChangeRef?.current?.({ language: value as T })}
          />
        )}
        {withRunCodeButton && (
          <RunCodeButton
            {...runner}
            onRunStart={onRunStart}
            withLabels={withLabels}
            files={files}
            currentFileName={currentFileName}
            onChangeRef={onChangeRef}
            setRunState={setRunState}
          />
        )}
        <div className="code-viewer-to-print bc-we jk-pg jk-br-ie">
          <CodeViewer code={source} language={language as CodeLanguage} />
        </div>
        <Select
          options={[
            {
              value: 'copy-text',
              label: (
                <>
                  <T className="tt-se tx-t">copy as text</T>&nbsp;
                  <span className="fw-lr tx-t">(Ctrl+Shift+C / ⌘+Shift+C)</span>
                </>
              ),
            },
            {
              value: 'copy-png',
              label: (
                <>
                  <T className="tt-se tx-t">copy as png</T>&nbsp;
                  <span className="fw-lr tx-t">(Ctrl+Alt+C / ⌘+Option+C)</span>
                </>
              ),
            },
          ]}
          disabled={!source}
          selectedOption={{
            value: '',
            label: withLabels ? (
              <>
                <ContentCopyIcon size="tiny" />
                <T className="tt-se tx-t ws-np">copy</T>
              </>
            ) : (
              <ContentCopyIcon size="tiny" />
            ),
          }}
          style={{ width: 'auto' }}
          onChange={async ({ value }) => {
            if (source) {
              switch (value) {
                case 'copy-text':
                  void copyAsText();
                  break;
                case 'copy-png':
                  void copyAsPng();
                  break;
              }
            }
          }}
        />
        <Select
          options={[
            {
              value: 'download-text',
              label: (
                <>
                  <T className="tt-se tx-t">download as file</T>&nbsp;
                  <span className="fw-lr tx-t">(Ctrl+Shift+S / ⌘+Shift+S)</span>
                </>
              ),
            },
            {
              value: 'download-png',
              label: (
                <>
                  <T className="tt-se tx-t">download as png</T>&nbsp;
                  <span className="fw-lr tx-t">(Ctrl+Alt+S / ⌘+Option+S)</span>
                </>
              ),
            },
          ]}
          disabled={!source}
          selectedOption={{
            value: '',
            label: withLabels ? (
              <>
                <DownloadIcon size="tiny" />
                <T className="tt-se tx-t ws-np">download</T>
              </>
            ) : (
              <DownloadIcon size="tiny" />
            ),
          }}
          style={{ width: 'auto' }}
          onChange={async ({ value }) => {
            if (source) {
              switch (value) {
                case 'download-text':
                  downloadAsText();
                  break;
                case 'download-png':
                  void downloadAsPng();
                  break;
                case 'copy-text':
                  void copyAsText();
                  break;
                case 'copy-png':
                  void copyAsPng();
                  break;
              }
            }
          }}
        />
        {leftOptions({ withLabels })}
      </div>
      <div className="jk-row flex-1" style={{ width: widthCenterContainer }}>
        {centerOptions({ widthContainer: widthCenterContainer, withLabels })}
      </div>
      <div className={classNames('jk-row gap cr-tx-ht')} ref={refRightSection}>
        {rightOptions({ withLabels })}
        <Button
          data-tooltip-id="jk-tooltip"
          data-tooltip-content={!withLabels ? 'settings' : ''}
          data-tooltip-place="bottom-end"
          size="small"
          type="secondary"
          onClick={() => setShowSettings(true)}
          icon={<SettingsIcon />}
        >
          {withLabels && <T className="tt-se">settings</T>}
        </Button>
        {expanded !== null && (
          <Button
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={!withLabels ? (expanded ? 'back' : 'expand') : ''}
            data-tooltip-place="bottom-end"
            size="small"
            type="secondary"
            onClick={() => setExpanded((prevState) => !prevState)}
            icon={expanded ? <FullscreenExitIcon /> : <FullscreenIcon />}
          >
            {withLabels && <T className="tt-se">{expanded ? 'back' : 'expand'}</T>}
          </Button>
        )}
      </div>
    </div>
  );
};
