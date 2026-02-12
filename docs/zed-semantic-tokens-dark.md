# Zed Semantic Tokens Configuration - Kleur Dark

Enable semantic tokens and configure custom highlighting rules for the Kleur Kleur Dark theme.

## Quick Start

Add to `~/.config/zed/settings.json`:

```json
{
  "semantic_tokens": "combined"
}
```

## Enhanced Semantic Highlighting

To match the VS Code Kleur theme's semantic token behavior, add these rules to your `~/.config/zed/settings.json`:

```json
{
  "semantic_tokens": "combined",
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "parameter",
        "foreground_color": "#00cec5"
      },
      {
        "token_type": "typeParameter",
        "foreground_color": "#00cec5"
      },
      {
        "token_type": "enumMember",
        "foreground_color": "#00cec5"
      },
      {
        "token_type": "variable",
        "token_modifiers": ["defaultLibrary"],
        "foreground_color": "#06d46e"
      },
      {
        "token_type": "variable",
        "token_modifiers": ["readonly"],
        "foreground_color": "#bcb0ff"
      },
      {
        "token_type": "property",
        "token_modifiers": ["readonly"],
        "foreground_color": "#bcb0ff"
      },
      {
        "token_type": "property",
        "token_modifiers": ["static"],
        "foreground_color": "#f8aa14"
      },
      {
        "token_type": "function",
        "token_modifiers": ["declaration"],
        "foreground_color": "#bcb0ff",
        "font_weight": "bold"
      },
      {
        "token_type": "function",
        "token_modifiers": ["async"],
        "foreground_color": "#f8aa14"
      },
      {
        "token_type": "method",
        "token_modifiers": ["declaration"],
        "foreground_color": "#27c7ff",
        "font_weight": "bold"
      },
      {
        "token_type": "method",
        "token_modifiers": ["declaration", "async"],
        "foreground_color": "#f8aa14",
        "font_weight": "bold"
      },
      {
        "token_type": "method",
        "token_modifiers": ["static"],
        "foreground_color": "#27c7ff",
        "font_style": "normal"
      },
      {
        "token_modifiers": ["deprecated"],
        "foreground_color": "#bab9be"
      },
      {
        "token_modifiers": ["unsafe"],
        "foreground_color": "#ffa192",
        "font_weight": "bold"
      },
      {
        "token_modifiers": ["mutable"],
        "underline": true
      },
      {
        "token_type": "unresolvedReference",
        "foreground_color": "#ffa192",
        "font_weight": "bold"
      }
    ]
  }
}
```

## Color Reference

| Token Type | Color | Description |
|------------|-------|-------------|
| `parameter` | `#00cec5` | Function/method parameters |
| `typeParameter` | `#00cec5` | Generic type parameters |
| `enumMember` | `#00cec5` | Enum variants/members |
| `variable` | `#bcb0ff` | Mutable variables |
| `variable.defaultLibrary` | `#06d46e` | Built-in variables (e.g., `window`, `document`) |
| `variable.readonly` | `#bcb0ff` | Const/readonly variables |
| `property` | `#bcb0ff` | Mutable properties |
| `property.readonly` | `#bcb0ff` | Readonly properties |
| `property.static` | `#f8aa14` | Static properties |
| `function` | `#27c7ff` | Function calls |
| `function.declaration` | `#bcb0ff` (bold) | Function definitions |
| `function.async` | `#f8aa14` | Async functions |
| `method` | `#27c7ff` | Method calls |
| `method.declaration` | `#27c7ff` (bold) | Method definitions |
| `method.declaration.async` | `#f8aa14` (bold) | Async method definitions |
| `method.static` | `#27c7ff` (no italic) | Static methods |
| `*.deprecated` | `#bab9be` | Deprecated code |
| `*.unsafe` | `#ffa192` (bold) | Unsafe operations (Rust) |
| `*.mutable` | (underline) | Mutable variables (Rust) |
| `unresolvedReference` | `#ffa192` (bold) | Unresolved symbols/imports |

## What's Different from the Theme

The Kleur Zed theme includes basic syntax highlighting, but Zed requires user configuration for semantic token modifiers. This configuration adds:

- **Teal for parameters** - Distinct from variables
- **Teal for type parameters** - Distinct from namespaces
- **Teal for enum members** - Distinct from enum types
- **Green for built-in variables** - Standard library globals
- **Underline for mutable** - Rust `mut` variables stand out
- **Orange for async** - Asynchronous execution
- **Bold declarations** - Function/method definitions stand out
- **Static member styling** - Visual distinction from instance members
- **Deprecated dimming** - Old code is visually muted
- **Unsafe highlighting** - Critical Rust safety warnings
- **Error highlighting** - Unresolved references stand out

## Benefits

### Readability
- Parameters (teal) stand out in function signatures
- Enum members (teal) distinct from types (green)
- Mutable variables (underlined) vs immutable (plain) in Rust
- Async functions (orange) vs sync functions (blue/purple)
- Declarations (bold) vs usages

### Code Understanding
- Track data flow: parameters → variables
- Spot immutability instantly
- Distinguish static from instance members
- Recognize deprecated APIs

### Language Support
- **TypeScript/JavaScript**: `const` vs `let`, readonly props
- **Rust**: `mut` vs immutable, unsafe blocks
- **Python**: Type hints, constants
- **Java**: `final`, static members
- **Go**: Exported vs unexported

## Debugging

- `zed: show default semantic token rules` - View Zed's defaults
- `dev: open highlights tree view` - Inspect tokens in real-time
- `lsp: restart language servers` - Refresh after config changes
