import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type { PlaintextConverters } from '@payloadcms/richtext-lexical/plaintext';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';

/**
 * Custom converter to ignore heading nodes during plain text conversion.
 */
const noHeadingConverter: PlaintextConverters = {
  heading: () => '',
};

/**
 * Convert Lexical state to plain text, optionally removing headings.
 *
 * @param {SerializedEditorState} content The Lexical content to be converted.
 * @param {boolean} removeHeadings Whether to remove headings (defaults to true).
 * @returns {string} The resulting plain text.
 */
export const extractPlainText = (
  content: SerializedEditorState,
  removeHeadings: boolean = true,
): string => {
  const converters = removeHeadings ? noHeadingConverter : {};

  return convertLexicalToPlaintext({ converters, data: content });
};
