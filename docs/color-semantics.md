# Kleur Color Semantics

This document explains the semantic meaning behind color and styling choices in the Kleur theme.

## Color Palette

| Color | Hex Range | Semantic Meaning | Used For |
|-------|-----------|------------------|----------|
| **Purple** | `#bcb0ff` - `#d4b3ff` | Variables, mutable state, control flow | Variables, properties, keywords, operators, function declarations |
| **Blue** | `#27c7ff` - `#74ade8` | Types, callable entities | Types, classes, functions, methods, attributes |
| **Green** | `#27d796` - `#a1c181` | Literals, namespaces, built-ins | Strings, namespaces, enums, built-in functions/variables |
| **Teal** | `#00cec5` - `#56b6c2` | Parameters, type parameters | Function parameters, generic type parameters, enum members, primitive types |
| **Orange** | `#fd971f` - `#e8af74` | Constants, async, special values | Numbers, booleans, constants, async functions, static members |
| **Red** | `#e06c75` - `#d07277` | Errors, unsafe, warnings | Errors, unsafe code, unresolved references |

## Styling Modifiers

Beyond color, we use font styling to convey additional semantic information:

### Font Weight
- **Bold** → Declarations/definitions (where things are created)
  - `function.declaration`: purple bold
  - `method.declaration`: blue bold
  - `*.declaration`: bold (general rule)

### Font Style
- **Italic** → Dynamic/callable (things that execute)
  - `function`: blue italic (function calls)
  - `method`: blue italic (method calls)
  - `keyword`: blue italic (language keywords)
  - `comment`: italic (secondary information)

### Text Decoration
- **Underline** → Mutability (can be changed - Rust)
  - `*.mutable`: underline (Rust `mut` variables)
  - Only used when LSP explicitly marks mutability (Rust-specific)
  
- **Strikethrough** → Deprecated (should not be used)
  - `*.deprecated`: dimmed with strikethrough

## Conflict Resolution

### Readonly vs Async (Orange Conflict)

**Problem**: Both readonly/const and async were originally using orange, creating visual ambiguity.

**Solution**: Remove readonly from orange, keep only async
- **Async** uses orange (temporal/execution characteristic)
  - `function.async` → orange
  - `method.async` → orange
  - Rationale: Async is a runtime behavior that fundamentally changes how code executes

- **Readonly** uses default purple (no special styling)
  - `variable.readonly` → purple (same as regular variables)
  - `property.readonly` → purple (same as regular properties)
  - Rationale: In most languages, immutability is the safe default

### Mutable Modifier (Rust-specific)

**Language-specific mutability defaults**:
- **TypeScript/JavaScript**: Variables are mutable by default (`let`/`var`), `const` gets `readonly` modifier
- **Rust**: Variables are immutable by default (`let`), `let mut` gets `mutable` modifier
- **Python/Java**: Variables are mutable by default, no explicit modifiers

**Solution**: Underline only explicit `mutable` modifier
- `*.mutable` → underline (Rust `mut` variables)
- This highlights mutability **only in Rust** where it's the exceptional case
- In TypeScript/JavaScript, mutable variables have no modifier, so no underline (which is fine - mutability is normal)

**Why this works**:
- Language-aware: Highlights what's unusual in each language's context
- No false positives: Only underlines when LSP explicitly signals mutability
- Rust-focused: Where mutability is a deliberate choice that deserves attention

### Parameter Color Choice

**Why teal instead of purple?**

Parameters are technically variables, but we chose teal to:
1. **Visual distinction**: Helps track data flow (teal parameters → purple variables)
2. **Function signatures**: Makes parameter lists stand out
3. **Consistency**: Aligns with type parameters (also teal) and enum members

### Built-in Variables (green vs purple)

Built-in/standard library variables use green instead of purple:
- `window`, `document`, `console` → green (via `defaultLibrary` modifier)
- Rationale: Green = "provided by the platform", like namespaces and enums
- Helps distinguish between user code and platform APIs

## Token Type Hierarchy

```
Declarations (where things are defined)
├─ Types
│  ├─ class → blue
│  ├─ interface → orange (abstract contract)
│  ├─ enum → green (named constant set)
│  └─ type → blue
│
├─ Callables
│  ├─ function.declaration → purple bold
│  ├─ method.declaration → blue bold
│  └─ (async variants) → orange bold
│
└─ Data
   ├─ variable → purple
   ├─ property → purple
   ├─ parameter → teal
   └─ (readonly variants) → underline

References (where things are used)
├─ function → blue italic
├─ method → blue italic
├─ variable → purple
└─ property → purple

Literals & Constants
├─ string → green
├─ number → orange
├─ boolean → orange
└─ constant → orange

Special Modifiers
├─ async → orange
├─ mutable → underline (Rust)
├─ static → orange
├─ deprecated → strikethrough
└─ unsafe → red bold
```

## Design Principles

1. **Color = Category**: Primary color indicates the fundamental type (variable, function, type, etc.)
2. **Style = State**: Font weight/style/decoration indicates modifiers (declaration, async, readonly, etc.)
3. **Consistency**: Same semantic concept = same visual treatment across languages
4. **Distinction**: Visually similar code elements should have clearly different purposes
5. **Hierarchy**: Declarations are bold (important), calls are italic (dynamic), values are regular

## Language-Specific Applications

### TypeScript/JavaScript
- `const` → purple (readonly, no special styling)
- `let` / `var` → purple (mutable, no special styling)
- `async function` → orange bold (async declaration)
- `await` → keyword (blue italic)

### Rust
- `let` → purple (immutable by default)
- `let mut` → purple underline (explicitly mutable - stands out!)
- `const` → purple (compile-time constant)
- `unsafe` → red bold (danger!)

### Python
- Type hints → blue (types)
- `self` → purple (special variable)
- Constants (UPPER_CASE) → purple underline (readonly by convention)

### Java
- `final` → purple (readonly, no special styling)
- `static` → orange (class-level)
- Annotations → blue (like decorators)

## VS Code vs Zed Implementation

Both editors achieve the same visual result through different mechanisms:

**VS Code**: Combines tree-sitter scopes + semantic token colors in theme JSON

**Zed**: 
- Tree-sitter styles in theme's `syntax` section (base highlighting)
- Semantic token rules in user `settings.json` (enhanced highlighting)

See [`vscode-zed-alignment.md`](./vscode-zed-alignment.md) for detailed comparison.