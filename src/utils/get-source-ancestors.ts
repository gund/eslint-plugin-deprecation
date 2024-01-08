import { TSESLint, TSESTree } from '@typescript-eslint/utils';

/**
 * Get the ancestors of a node from the source code.
 *
 * NOTE: For ESLint <9.0.0 will return ancestors of the currently-traversed node in the context.
 *
 * @internal
 */
export function getSourceAncestors<
  TMessageIds extends string,
  TOptions extends readonly unknown[],
>(
  node: TSESTree.Node,
  context: TSESLint.RuleContext<TMessageIds, TOptions> | ESLintRuleContextPreV9,
): TSESTree.Node[] {
  // Use ESLint 9.0.0 API if available
  return isContextV9(context)
    ? context.sourceCode.getAncestors(node)
    : // Fallback to ESLint <9.0.0 API
      context.getAncestors();
}

function isContextV9<
  TMessageIds extends string,
  TOptions extends readonly unknown[],
>(
  context: TSESLint.RuleContext<TMessageIds, TOptions> | ESLintRuleContextPreV9,
): context is TSESLint.RuleContext<TMessageIds, TOptions> & {
  sourceCode: TSESLint.SourceCode &
    Required<Pick<TSESLint.SourceCode, 'getAncestors'>>;
} {
  return 'sourceCode' in context && context.sourceCode !== undefined;
}

/**
 * Backwards compatibility interface for ESLint <9.0.0
 *
 * @deprecated API of ESLint <9.0.0
 */
interface ESLintRuleContextPreV9 {
  getAncestors(): TSESTree.Node[];
}
