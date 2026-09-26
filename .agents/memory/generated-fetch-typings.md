---
name: Generated fetch typings
description: TypeScript configuration needed by generated Orval fetch clients in this workspace
---

Generated API clients use `Headers.entries()` when normalizing request headers.

**Why:** The workspace base library target does not automatically include the iterable DOM declarations, so codegen can succeed while the composite library typecheck fails.

**How to apply:** When generated client code reports that `Headers.entries()` is missing, ensure the client package includes both `dom` and `dom.iterable` in its TypeScript `lib` list before debugging application code.