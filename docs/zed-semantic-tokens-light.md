# Zed Semantic Tokens Configuration - Kleur Light

Enable semantic tokens and configure custom highlighting rules for the Kleur Kleur Light theme.

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
        "foreground_color": "#104b47"
      },
      {
        "token_type": "typeParameter",
        "foreground_color": "#104b47"
      },
      {
        "token_type": "enumMember",
        "foreground_color": "#104b47"
      },
      {
        "token_type": "variable",
        "token_modifiers": ["defaultLibrary"],
        "foreground_color": "#0f4d28"
      },
      {
        "token_type": "variable",
        "token_modifiers": ["readonly"],
        "foreground_color": "#433e68"
      },
      {
        "token_type": "property",
        "token_modifiers": ["readonly"],
        "foreground_color": "#433e68"
      },
      {
        "token_type": "property",
        "token_modifiers": ["static"],
        "foreground_color": "#5c3d06"
      },
      {
        "token_type": "function",
        "token_modifiers": ["declaration"],
        "foreground_color": "#433e68",
        "font_weight": "bold"
      },
      {
        "token_type": "function",
        "token_modifiers": ["async"],
        "foreground_color": "#5c3d06"
      },
      {
        "token_type": "method",
        "token_modifiers": ["declaration"],
        "foreground_color": "#0f4860",
        "font_weight": "bold"
      },
      {
        "token_type": "method",
        "token_modifiers": ["declaration", "async"],
        "foreground_color": "#5c3d06",
        "font_weight": "bold"
      },
      {
        "token_type": "method",
        "token_modifiers": ["static"],
        "foreground_color": "#0f4860",
        "font_style": "normal"
      },
      {
        "token_modifiers": ["deprecated"],
        "foreground_color": "#77777d"
      },
      {
        "token_modifiers": ["unsafe"],
        "foreground_color": "#7b1e1b",
        "font_weight": "bold"
      },
      {
        "token_modifiers": ["mutable"],
        "underline": true
      },
      {
        "token_type": "unresolvedReference",
        "foreground_color": "#7b1e1b",
        "font_weight": "bold"
      }
    ]
  }
}
```

## Color Reference

| Token Type | Color | Description |
|------------|-------|-------------|
| `parameter` | `#104b47` | Function/method parameters |
| `typeParameter` | `#104b47` | Generic type parameters |
| `enumMember` | `#104b47` | Enum variants/members |
| `variable` | `#433e68` | Mutable variables |
| `variable.defaultLibrary` | `#0f4d28` | Built-in variables (e.g., `window`, `document`) |
| `variable.readonly` | `#433e68` | Const/readonly variables |
| `property` | `#433e68` | Mutable properties |
| `property.readonly` | `#433e68` | Readonly properties |
| `property.static` | `#5c3d06` | Static properties |
| `function` | `#0f4860` | Function calls |
| `function.declaration` | `#433e68` (bold) | Function definitions |
| `function.async` | `#5c3d06` | Async functions |
| `method` | `#0f4860` | Method calls |
| `method.declaration` | `#0f4860` (bold) | Method definitions |
| `method.declaration.async` | `#5c3d06` (bold) | Async method definitions |
| `method.static` | `#0f4860` (no italic) | Static methods |
| `*.deprecated` | `#77777d` | Deprecated code |
| `*.unsafe` | `#7b1e1b` (bold) | Unsafe operations (Rust) |
| `*.mutable` | (underline) | Mutable variables (Rust) |
| `unresolvedReference` | `#7b1e1b` (bold) | Unresolved symbols/imports |

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
