# Coding Convention (Backend & Frontend)

## 1) Git & Pull Request

- **Branching**
  - `main`: stable, release
  - `develop`: tích hợp
  - `feature/<scope>-<short-desc>`
  - `fix/<scope>-<bug>`
  - `chore/<task>`
- **Commit**: theo Conventional Commits  
  `feat(core): add device share API`  
  `fix(auth): refresh-token when 401`  
  `chore(ci): add docker buildx`
- **PR rules**
  - Nhỏ gọn (< 400 lines thay đổi), có **title**, **description**, ảnh/chứng cứ nếu UI.
  - Checklist: [ ] build ok, [ ] test pass, [ ] lint pass, [ ] migration reviewed, [ ] docs updated.
  - Gắn labels: `backend`, `frontend`, `breaking`, `db-migration`, `security`.

## 2) Code Style chung

- **Ngôn ngữ**: Tiếng Anh trong code, comment ngắn, doc rõ.  
- **Đặt tên**
  - Biến/const: `lowerCamelCase`
  - Hàm/Phương thức: `lowerCamelCase` (JS/TS), `UpperCamelCase` (Go, C# public)
  - Kiểu/class/interface: `UpperCamelCase`
  - Env var: `UPPER_SNAKE_CASE`
- **Early return** để giảm nesting.
- **Không “magic number/string”** → `const`.
- **Log có context**: `trace_id`, `user_id`, `resource`, `latency_ms`.

## 3) Backend

### 3.1 Go (ConnectRPC / Clean Architecture)

**Layout**
```
/cmd/<svc>/main.go
/internal/
  domain/
  usecase/
  infra/
  delivery/
  pkg/
```

**Style**
- Go 1.23+, `golangci-lint` bắt buộc.
- Context trong mọi I/O.
- Error: wrap `%w`, sentinel errors trong `pkg/errors.go`.
- Config qua env.
- DB: dùng context + prepared statements.
- Caching: Redis với key namespace `svc:v1:<entity>:<id>`.
- Observability: Prometheus + Jaeger.

### 3.2 .NET Core

- C# 12, nullable enable.
- DI chuẩn `AddScoped/AddSingleton`.
- FluentValidation cho request.
- Serilog + enrichers.
- EF Core: `AsNoTracking` cho read.
- AutoMapper profile riêng.

### 3.3 Python (FastAPI)

- Python 3.11+, `ruff` + `black` + `mypy`.
- Pydantic models, dependency injection nhẹ.
- SQLAlchemy 2.0 + Alembic.
- BackgroundTasks cho async.

```py
class CreateOrderReq(BaseModel):
    user_id: UUID
    package_id: str

@router.post("/orders", response_model=OrderOut)
async def create_order(req: CreateOrderReq, svc: OrderService = Depends(get_service)):
    return await svc.create(req)
```

## 4) Frontend

### 4.1 Next.js (App Router, TS, Tailwind)

**Structure**
```
/src/app/
/src/components/ui/
/src/lib/
/src/hooks/
/src/styles/
/src/types/
```

**Style**
- TypeScript strict; ESLint + Prettier.
- Server Actions cho tác vụ tin cậy.
- State: React Query.
- Form: `react-hook-form` + `zod`.
- UI: Tailwind.

**Performance**
- `next/image`.
- dynamic import.
- tránh client component nếu không cần.

### 4.2 Flutter

- DDD nhẹ: `/core`, `/features/...`.
- State: Riverpod/Bloc.
- L10n.
- Lint: `flutter_lints`.

## 5) API Design

- **Versioning**: `/v1/...`
- **Errors**
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "email is invalid" } }
```
- **Pagination**
```json
{ "data":[...], "next_cursor":"...", "has_more":true }
```
- **Idempotency**: `Idempotency-Key` header.

## 6) Security

- Secrets qua env.
- Rate limit.
- Input validation.
- Auth: JWT short-lived + refresh.
- HTTP headers: CSP, HSTS, etc.

## 7) Testing & QA

- Unit + Integration tests.
- Contract tests.
- CI: lint → test → build → scan → image.

## 8) Logging & Metrics

- Structured logs (JSON).
- Metrics: Prometheus.
- Tracing: OpenTelemetry.

## 9) Lint/Format Samples

**.editorconfig**
```
[*]
indent_style = space
indent_size = 2
```

**.eslintrc.json**
```json
{
  "extends": ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"]
}
```

**golangci-lint.yaml**
```yaml
linters:
  enable:
    - govet
    - errcheck
    - staticcheck
    - revive
```

**pyproject.toml**
```toml
[tool.black]
line-length = 100
```

## 10) PR Review Checklist

- [ ] Lint/Test pass
- [ ] Không log secrets
- [ ] Docs updated

## 11) Templates

**PULL_REQUEST_TEMPLATE.md**
```md
## Summary
- ...

## Checklist
- [ ] Lint/Test passed
- [ ] Docs updated
```

