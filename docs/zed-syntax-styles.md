# Zed Syntax Style Names

This document outlines the syntax style names available in Zed themes, categorized by their official support status.

## Official Zed Syntax Styles

These style names are used consistently across official Zed themes (One, Ayu, Gruvbox) and are guaranteed to work:

### Core Styles
- `attribute`
- `boolean`
- `comment`
- `comment.doc`
- `constant`
- `constructor`
- `embedded`
- `emphasis`
- `emphasis.strong`
- `enum`
- `function`
- `function.builtin` (Gruvbox uses this)
- `hint`
- `keyword`
- `label`
- `link_text`
- `link_uri`
- `namespace`
- `number`
- `operator`
- `predictive`
- `preproc`
- `primary`
- `property`

### Punctuation Styles
- `punctuation`
- `punctuation.bracket`
- `punctuation.delimiter`
- `punctuation.list_marker`
- `punctuation.markup`
- `punctuation.special`

### Selector Styles
- `selector`
- `selector.pseudo`

### String Styles
- `string`
- `string.escape`
- `string.regex`
- `string.special`
- `string.special.symbol`

### Other Styles
- `tag`
- `text.literal`
- `title`
- `type`
- `variable`
- `variable.special`
- `variant`

## Custom/Community Syntax Styles

Zed **does** accept custom style names in themes (as evidenced by popular community themes like Catppuccin). However, these are not part of the official Zed theme specification and may have limited tree-sitter or LSP mapping support.

### LSP Semantic Token Types (Custom in Zed)
These are standard LSP token types but not in official Zed themes:
- `class`
- `interface`
- `struct`
- `typeParameter`
- `parameter`
- `enumMember`
- `decorator`
- `event`
- `method`
- `macro`

### Extended Community Styles
Popular themes like Catppuccin use many additional custom styles:
- `character`, `character.special`
- `comment.documentation`, `comment.error`, `comment.hint`, `comment.info`, `comment.note`, `comment.todo`, `comment.warn`, `comment.warning`
- `concept`
- `constant.builtin`, `constant.macro`
- `diff.minus`, `diff.plus`
- `field`
- `float`
- `function.call`, `function.decorator`, `function.macro`, `function.method`, `function.method.call`
- `keyword.conditional`, `keyword.conditional.ternary`, `keyword.coroutine`, `keyword.debug`, `keyword.directive`, `keyword.directive.define`, `keyword.exception`, `keyword.export`, `keyword.function`, `keyword.import`, `keyword.modifier`, `keyword.operator`, `keyword.repeat`, `keyword.return`, `keyword.type`
- `module`
- `number.float`
- `parent`
- `predoc`
- `punctuation.special.symbol`
- `string.doc`, `string.documentation`, `string.regexp`, `string.special.path`, `string.special.url`
- `symbol`
- `tag.attribute`, `tag.delimiter`, `tag.doctype`
- `text`
- `type.builtin`, `type.class.definition`, `type.definition`, `type.interface`, `type.super`
- `variable.builtin`, `variable.member`, `variable.parameter`

## Kleur Strategy

For the Kleur theme, we take a hybrid approach:

1. **Theme file (`build/zed.json`)**: Use ONLY official Zed syntax styles to ensure maximum compatibility and avoid confusion.

2. **User settings (`semantic_token_rules`)**: Provide LSP semantic token mappings in documentation that users can add to their `settings.json`. This allows rich semantic highlighting for LSP-aware languages without polluting the theme with non-standard style names.

## Why This Matters

- **Official styles** are guaranteed to work and map to tree-sitter grammars
- **Custom styles** work but may only highlight if:
  - The tree-sitter grammar emits those specific node types
  - The LSP server emits those semantic token types AND you have user-level `semantic_token_rules` configured
  - The style name exactly matches what the parser/LSP expects

By keeping the theme minimal and providing rich semantic token rules separately, we give users:
- A working theme out of the box
- The ability to opt-in to enhanced semantic highlighting
- Clear documentation of what's standard vs. custom

## References

- [Zed One Theme](https://github.com/zed-industries/zed/blob/main/assets/themes/one/one.json)
- [Zed Ayu Theme](https://github.com/zed-industries/zed/blob/main/assets/themes/ayu/ayu.json)
- [Zed Gruvbox Theme](https://github.com/zed-industries/zed/blob/main/assets/themes/gruvbox/gruvbox.json)
- [Catppuccin Zed Theme](https://github.com/catppuccin/zed) - Example of extensive custom styles