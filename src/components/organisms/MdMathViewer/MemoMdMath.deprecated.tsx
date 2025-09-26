import { memo } from 'react';
import { MdMath } from '../_layz_/MdMath';

function splitMarkdownIntoChunks(md: string): string[] {
  const lines = md.split('\n');
  const chunks: string[] = [];
  let buffer: string[] = [];
  let inCodeBlock = false;
  let inTable = false;
  
  const isCodeFence = (line: string): boolean => {
    const trimmed = line.trim();
    return trimmed.startsWith('```') || trimmed.endsWith('```');
  };
  
  const isTableLine = (line: string): boolean => {
    return line.includes('|') && !line.trim().startsWith('-') && !line.trim().startsWith('>');
  };
  
  const isSeparator = (line: string): boolean => {
    const trimmed = line.trim();
    return /^-{3,}$/.test(trimmed); // Match '---', '----', '-----', etc.
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    
    // Detect code block start/end
    if (isCodeFence(line)) {
      inCodeBlock = !inCodeBlock;
    }
    
    // Check table context
    if (isTableLine(line) && !inCodeBlock) {
      inTable = true;
    } else if (line.trim() === '' && !inCodeBlock) {
      inTable = false;
    }
    
    const nextLine = lines[i + 1] ?? '';
    const isBlankLine = line.trim() === '';
    const isNextBlankLine = nextLine.trim() === '';
    
    // Split if line is a separator (--- or more), or double newline
    const shouldSplit =
      !inCodeBlock &&
      !inTable &&
      (
        isSeparator(line) ||
        (isBlankLine && isNextBlankLine)
      );
    
    if (shouldSplit) {
      if (buffer.length > 0) {
        chunks.push(buffer.join('\n').trim());
        buffer = [];
      }
      i++; // Skip next blank line if it's part of the double \n\n
    } else {
      buffer.push(line);
    }
  }
  
  // Add final chunk
  if (buffer.length > 0) {
    chunks.push(buffer.join('\n').trim());
  }
  
  return chunks;
}

export const MemoMdMath = memo(({ source }: { source: string }) => {
  
  const chunks = splitMarkdownIntoChunks(source);
  
  return chunks.map((chunk, index) => <MdMath key={chunk + index} source={chunk} />);
});
