
# Naming Convention (Backend & Frontend)

## 1. General Principles
- Use English for all identifiers (variables, functions, classes, constants, files).
- Choose meaningful names that clearly express intent.
- Avoid abbreviations unless they are widely accepted in the domain.
- One concept = one name. Avoid synonyms (“fetchUser”, “getUserDetail”, “retrieveUserInfo” all for same thing).

## 2. File and Directory Naming
### Backend
- Go/C#: Directory names in `kebab-case` or `snake_case` (depending on language norms).
- File names: `lower_snake_case.go` (Go), `PascalCase.cs` (C#).
- Migration files: `YYYYMMDDHHMM_add_<feature>_table.sql`.

### Frontend (Next.js / React / TS)
- Directories: `kebab-case` (e.g., `user-profile`, `checkout-page`).
- React component files: `PascalCase.tsx` (e.g., `UserProfile.tsx`).
- Utility files: `camelCase.ts` or `kebab-case.ts` (choose one and keep consistent).
- Constant files: `constants.ts`.

## 3. Variables, Constants, Types
- Variables: `lowerCamelCase` (e.g., `userName`, `orderTotal`).
- Constants:
  - For language/native constants: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).
  - For values in TS/JS modules: `camelCase` if exported default, else `PascalCase` for classes/interfaces.
- Types & Interfaces: `UpperCamelCase` (e.g., `UserProfile`, `OrderItem`).
- Enums: `PascalCase` for enum name, `UPPER_SNAKE_CASE` for enum members.

## 4. Functions and Methods
- Functions: `lowerCamelCase` (backend JS/TS) or `PascalCase` (public classes in Go/C#).
- Methods: Should express action (verb + object) e.g., `getUserById`, `processPayment`, `ValidateOrder`.
- Avoid generic names like `handleStuff`, `doTask`.

## 5. Classes, Modules, Components
- Classes, modules, components: `PascalCase`.
- React Hooks: prefix with `use` + `PascalCase` (e.g., `useFetchUser`).
- React components representing pages: `PascalCasePage` or just `PascalCase`.

## 6. API Endpoints & Routes
- Use nouns and pluralization for resources (e.g., `/users`, `/orders`).
- Use `kebab-case` for URL segments: `/users/{userId}/orders`.
- HTTP method semantics: `GET /users`, `POST /users`, `PATCH /users/{userId}`, `DELETE /users/{userId}`.

## 7. Naming Conventions by Language
### Go
- Packages: `lowercase` without underscores, singular nouns (e.g., `user`, `order`).
- Variables always camelCase.
- Exported identifiers start with uppercase.
  
### C#
- Namespaces: `Company.Project.Feature`.
- Classes/interfaces: `PascalCase`.
- Interfaces prefix `I` (e.g., `IUserService`).
  
### Python
- Modules: `snake_case`.
- Classes: `PascalCase`.
- Functions/variables: `snake_case`.
- Constants: `UPPER_SNAKE_CASE`.

### TypeScript / JavaScript
- Files: `kebab-case` or `camelCase`, **but be consistent**.
- React components: `PascalCase`.
- Hooks: `usePascalCase`.
- Extensions: `.ts`, `.tsx`, `.js`, `.jsx` accordingly.

## 8. Database Naming
- Tables: `snake_case`, plural (e.g., `users`, `orders`).
- Columns: `snake_case` (e.g., `user_id`, `order_total_amt`).
- Primary keys: `id`.
- Foreign keys: `<referenced_table>_id` (e.g., `user_id`).
- Index names: `idx_<table>_<column>`.

## 9. Events / Topics / Messages
- Event names: use `PascalCase` or `kebab-case` depending on platform, e.g., `UserSignedUp`, `order.created`.
- Topic names: `service.feature.action` (e.g., `auth.user.created`).

## 10. Review Checklist for Naming
- [ ] Name indicates *why*, not *how*.
- [ ] No ambiguous words like `data`, `info`, `obj`.
- [ ] Avoid numeric suffixes (`file1`, `file2`); prefer descriptive names.
- [ ] Follow language-specific conventions (see above).
- [ ] File/component names match what they export.

---

