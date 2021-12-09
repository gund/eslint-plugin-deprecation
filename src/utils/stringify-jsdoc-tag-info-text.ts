import * as ts from 'typescript';

/**
 * Stringifies the text within a JSDocTagInfo AST node with compatibility for
 * pre/post TypeScript 4.3 API changes.
 */
export function stringifyJsdocTagInfoText(tag: ts.JSDocTagInfo): string {
  return isJSDocTagInfo4Point3Plus(tag)
    ? ts.displayPartsToString(tag.text)
    : (<any>tag).text ?? '';
}

/**
 * Copied from TypeScript 4.3.
 *
 * The `text` field was changed from `string` to `SymbolDisplayPart[]` in 4.3.
 */
interface JSDocTagInfo4Point3Plus {
  name: string;
  text?: ts.SymbolDisplayPart[];
}

function isJSDocTagInfo4Point3Plus(
  tag: ts.JSDocTagInfo | JSDocTagInfo4Point3Plus,
): tag is JSDocTagInfo4Point3Plus {
  return Array.isArray(tag.text);
}
