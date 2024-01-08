import * as ts from 'typescript';

/**
 * Stringifies the text within a JSDocTagInfo AST node with compatibility for
 * pre/post TypeScript 4.3 API changes.
 *
 * @internal
 */
export function stringifyJSDocTag(
  tag: ts.JSDocTagInfo | { text: ts.SymbolDisplayPart[] },
): string {
  return isJSDocTagInfo4Point2AndBefore(tag)
    ? tag.text ?? ''
    : ts.displayPartsToString(tag.text);
}

/**
 * Copied from TypeScript 4.2.
 * https://github.com/microsoft/TypeScript/blob/fb6c8392681f50a305236a7d662123a69827061f/lib/protocol.d.ts#L2820-L2823
 *
 * The `text` field was changed from `string` to `SymbolDisplayPart[]` in 4.3.
 */
interface JSDocTagInfo4Point2AndBefore {
  name: string;
  text?: string;
}

function isJSDocTagInfo4Point2AndBefore(
  tag:
    | ts.JSDocTagInfo
    | JSDocTagInfo4Point2AndBefore
    | { text: ts.SymbolDisplayPart[] },
): tag is JSDocTagInfo4Point2AndBefore {
  return typeof tag.text === 'string';
}
