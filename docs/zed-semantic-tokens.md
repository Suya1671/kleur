# Zed Semantic Tokens Configuration

Add to `~/.config/zed/settings.json`:

```json
{
  "semantic_tokens": "combined",
  "global_lsp_settings": {
    "semantic_token_rules": [
      {
        "token_type": "typeParameter",
        "style": ["typeParameter"]
      },
      {
        "token_type": "parameter",
        "style": ["parameter"]
      },
      {
        "token_type": "variable",
        "token_modifiers": ["readonly"],
        "style": ["variable.readonly"]
      },
      {
        "token_type": "property",
        "token_modifiers": ["readonly"],
        "style": ["property.readonly"]
      },
      {
        "token_type": "property",
        "token_modifiers": ["static"],
        "style": ["property.static"]
      },
      {
        "token_type": "enumMember",
        "style": ["enumMember"]
      },
      {
        "token_type": "function",
        "token_modifiers": ["declaration"],
        "style": ["function.declaration"]
      },
      {
        "token_type": "function",
        "token_modifiers": ["declaration", "async"],
        "style": ["function.async"]
      },
      {
        "token_type": "method",
        "token_modifiers": ["declaration"],
        "style": ["method.declaration"]
      },
      {
        "token_type": "method",
        "token_modifiers": ["declaration", "async"],
        "style": ["function.async"]
      },
      {
        "token_type": "method",
        "token_modifiers": ["static"],
        "style": ["method.static"]
      },
      {
        "token_type": "variable",
        "token_modifiers": ["defaultLibrary"],
        "style": ["variable.builtin"]
      },
      {
        "token_modifiers": ["deprecated"],
        "style": ["*.deprecated"]
      },
      {
        "token_modifiers": ["unsafe"],
        "style": ["*.unsafe"]
      }
    ]
  }
}
```
