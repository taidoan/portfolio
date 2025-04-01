import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

export const extractPlainText = (content: SerializedEditorState): string => {
  return convertLexicalToPlaintext({ data: content });
};
