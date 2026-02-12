# VS Code ↔ Zed Theme Alignment

This document describes how the Kleur theme achieves visual consistency between VS Code and Zed editors.

## Strategy

### VS Code
- **Tree-sitter highlighting**: Defined in `tokenColors` (TextMate scopes)
- **Semantic highlighting**: Defined in `semanticTokenColors` (LSP token types)
- Both are built into the theme JSON file

### Zed
- **Tree-sitter highlighting**: Defined in theme's `syntax` section (style names)
- **Semantic highlighting**: Mapped via `semantic_token_rules` in user settings
- Theme provides base styles; semantic tokens require user configuration

## Base Syntax Alignment (Tree-sitter)

These colors are identical between VS Code tokenColors and Zed theme syntax:

| Element | VS Code Scope | Zed Style | Color |
|---------|---------------|-----------|-------|
| Comment | `comment` | `comment` | `base03` italic |
| String | `string` | `string` | `green` |
| Number | `constant.numeric` | `number` | `orange` |
| Boolean | `constant.language.boolean` | `boolean` | `orange` |
| Keyword | `keyword` | `keyword` | `blue` italic |
| Operator | `keyword.operator` | `operator` | `base05` |
| Punctuation | `punctuation` | `punctuation` | `base05` |
| Function | `entity.name.function` | `function` | `blue` italic |
| Type | `entity.name.type` | `type` | `blue` |
| Variable | `variable` | `variable` | `purple` |
| Property | `variable.other.property` | `property` | `purple` |
| Tag | `entity.name.tag` | `tag` | `purple` |
| Namespace | `entity.name.namespace` | `namespace` | `green` |
| Enum | `entity.name.type.enum` | `enum` | `green` |
| Embedded | `meta.embedded` | `embedded` | `base0F` |
| Constant | `constant` | `constant` | `orange` |

## Semantic Token Alignment

Zed's default semantic token rules map LSP tokens to theme styles. To match VS Code's semantic highlighting, users must add custom rules.

### Default Zed Mappings (No User Config)

| LSP Token | Zed Default Style | Color |
|-----------|-------------------|-------|
| `parameter` | `variable` | purple |
| `typeParameter` | `type` | blue |
| `enumMember` | `variant` | blue |
| `class` | `type` | blue |
| `interface` | `type` | blue |
| `struct` | `type` | blue |
| `method` | `function` | blue italic |
| `decorator` | `attribute` | blue |

### VS Code Semantic Colors

| LSP Token | VS Code Color | Matches Zed Default? |
|-----------|---------------|---------------------|
| `parameter` | teal | ❌ (Zed: purple) |
| `typeParameter` | teal | ❌ (Zed: blue) |
| `enumMember` | teal | ❌ (Zed: blue) |
| `variable.readonly` | purple | ❌ (Zed: purple) |
| `property.readonly` | purple | ❌ (Zed: purple) |
| `property.static` | orange | ❌ (Zed: purple) |
| `*.mutable` | underline | ❌ (Zed: no style) |
| `function.declaration` | purple bold | ❌ (Zed: blue italic) |
| `function.async` | orange bold | ❌ (Zed: blue italic) |
| `method.declaration` | blue bold | ❌ (Zed: blue italic) |
| `method.static` | blue (no italic) | ❌ (Zed: blue italic) |
| `*.deprecated` | base04 dim | ❌ (Zed: no special style) |
| `*.unsafe` | red bold | ❌ (Zed: no special style) |

## User Configuration Required

To achieve full VS Code → Zed parity, users must add semantic token rules to `~/.config/zed/settings.json`.

See [`docs/zed-semantic-tokens.md`](./zed-semantic-tokens.md) for the complete configuration.

### Key Differences After User Config

With recommended user configuration:

✅ **Parameters** → teal (matches VS Code)  
✅ **Type parameters** → teal (matches VS Code)  
✅ **Enum members** → teal (matches VS Code)  
✅ **Readonly/const** → purple (matches VS Code)  
✅ **Mutable** → underline for Rust `mut` (matches VS Code)  
✅ **Function declarations** → purple bold (matches VS Code)  
✅ **Async functions** → orange (matches VS Code)  
✅ **Static methods** → blue no-italic (matches VS Code)  
✅ **Deprecated** → dimmed (matches VS Code)  
✅ **Unsafe** → red bold (matches VS Code)

## Why This Approach?

1. **Official Zed themes** use minimal syntax styles (42 standard names)
2. **Semantic tokens** are language-server dependent and not guaranteed
3. **User configuration** gives flexibility without breaking base theme
4. **Tree-sitter base** ensures highlighting works even without LSP

## Testing Alignment

1. Open the same code file in both editors
2. In VS Code: Theme should work immediately
3. In Zed: 
   - Base highlighting works immediately (tree-sitter)
   - Enhanced highlighting requires settings.json config (semantic tokens)
4. Compare:
   - Keywords, strings, numbers → should match immediately
   - Parameters, const variables → require Zed user config

## References

- VS Code template: [`templates/vscode.mustache`](../templates/vscode.mustache)
- Zed theme template: [`templates/zed-theme.mustache`](../templates/zed-theme.mustache)
- Zed semantic token docs: [`templates/zed-semantic-tokens.mustache`](../templates/zed-semantic-tokens.mustache)
- Zed default semantic rules: [zed-industries/zed](https://github.com/zed-industries/zed/blob/main/assets/settings/default_semantic_token_rules.json)
- LSP spec: [microsoft.github.io/language-server-protocol](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#semanticTokenTypes)