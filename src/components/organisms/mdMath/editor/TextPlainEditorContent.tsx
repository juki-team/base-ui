import { Status } from '@juki-team/commons';
import { ClipboardEventHandler, useRef } from 'react';
import { classNames, handleUploadImage } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { NotificationType, TextPlainEditorContentProps } from '../../../../types';
import { T, TextArea } from '../../../atoms';

export const TextPlainEditorContent = (props: TextPlainEditorContentProps) => {
  
  const { value, onChange, setLoader, enableImageUpload } = props;
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addNotification } = useJukiNotification();
  
  const insertTextAtCursor = (insertText: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textareaRef.current?.value ?? '';
    const newText = text.substring(0, start) + insertText + text.substring(end);
    
    onChange?.(newText);
    
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
    }, 0);
  };
  
  const handlePaste: ClipboardEventHandler = async (event) => {
    const items = event.clipboardData?.items;
    if (items) {
      const imageFiles: File[] = [];
      for (const item of items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file && file.type.startsWith('image/')) {
            imageFiles.push(file);
          }
        }
      }
      if (imageFiles.length > 0) {
        event.stopPropagation();
        event.preventDefault();
        let extraText = '';
        setLoader(Status.LOADING);
        for (const imageFile of imageFiles) {
          const { status, message, content } = await handleUploadImage(imageFile, false);
          if (status === Status.SUCCESS) {
            addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
            extraText += (extraText ? '\n\n' : '') + `![image alt](${content!.imageUrl})`;
          } else {
            addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
          }
        }
        setLoader(Status.NONE);
        insertTextAtCursor(extraText);
      }
    }
  };
  
  return (
    <div
      className={classNames('jk-md-math-textarea-editor jk-border-radius-inline')}
      onPaste={enableImageUpload ? handlePaste : undefined}
    >
      <TextArea
        ref={textareaRef}
        value={value}
        onChange={value => {
          onChange?.(value);
        }}
      />
    </div>
  );
};
