# 🚀 NestJS Mastery - Step-by-Step Learning Roadmap

> **Project**: Blog API with MongoDB Atlas + JWT Authentication + Swagger  
> **Goal**: Learn NestJS core concepts by building a real-world Blog API using maximum NestJS-native features.

---

## 📋 Table of Contents

1. [Why NestJS over Express/Node.js?](#why-nestjs)
2. [Learning Steps Overview](#steps-overview)
3. [Step-by-Step Documentation](#step-by-step)

---

## <a name="why-nestjs"></a> 🤔 Why NestJS over Normal Node.js/Express?

| Feature | Express/Node.js | NestJS |
|---------|----------------|--------|
| **Architecture** | Free-form, no structure enforced | Enforces modular MVC architecture out of the box |
| **Dependency Injection** | Manual or third-party libraries | Built-in DI container (like Angular/Spring) |
| **TypeScript** | Optional, manual setup | First-class TypeScript support |
| **Modularity** | Manual folder structure | `@Module()` decorators enforce boundaries |
| **Config Management** | `dotenv` manually | `@nestjs/config` with validation, caching |
| **Database** | Manual connection handling | `@nestjs/mongoose`/`typeorm` with repository pattern |
| **Validation** | Manual `joi` or custom | `class-validator` + `ValidationPipe` auto-validation |
| **AOP (Interceptors, Guards, Pipes)** | Not available | Built-in decorators: `@UseGuards()`, `@UseInterceptors()` |
| **Testing** | Manual mocking | Built-in testing utilities with easy mocking via DI |
| **OpenAPI/Swagger** | Manual setup | `@nestjs/swagger` auto-generates docs from decorators |
| **Microservices** | Complex setup | Built-in support for Kafka, RabbitMQ, gRPC, Redis |

### 🎯 Key Benefits You'll Experience:
1. **Scalability**: Modules make large codebases manageable.
2. **Testability**: DI makes unit testing trivial — just swap providers.
3. **Reusability**: Providers are singletons by default; inject anywhere.
4. **Developer Experience**: Decorators reduce boilerplate dramatically.
5. **Ecosystem**: One `@nestjs/xxx` package for most integrations.

---

## <a name="steps-overview"></a> 🗺️ Learning Steps Overview

| Step | Topic | Status | What You'll Build |
|------|-------|--------|-------------------|
| **0** | Project Setup | ✅ Done | Basic NestJS app |
| **1** | Core Concepts Deep Dive | ✅ Done | In-memory Blog CRUD with Modules, Controllers, Providers, DI |
| **2** | Configuration Management | ✅ Done | `@nestjs/config` for env vars |
| **3** | MongoDB + Mongoose Integration | ✅ Done | Database connection & schemas |
| **4** | Validation & Pipes | ✅ Done | `class-validator` + `ValidationPipe` auto-validation |
| **5** | Exception Filters | ✅ Done | Global error handling with uniform JSON responses |
| **6** | Guards | ✅ Done | Route protection with custom guards + `@Public()` decorator |
| **7** | JWT + Passport Authentication | ✅ Done | Real JWT auth with MongoDB users, bcrypt, Swagger Bearer auth |
| **8** | Custom Decorators | 🔄 Next | `@CurrentUser()`, `@Roles()` decorators |
| **9** | Interceptors | ⬜ Pending | Logging, response transformation, request timing |
| **10** | Advanced: Custom Providers | ⬜ Pending | Factory providers, value providers, dynamic modules |
| **11** | Testing (Unit & E2E) | ⬜ Pending | Jest unit tests, Supertest E2E tests |

---

## <a name="step-by-step"></a> 📚 Step-by-Step Documentation

Each step has its own detailed file:

- ✅ [`docs/STEP_01_CORE_CONCEPTS.md`](docs/STEP_01_CORE_CONCEPTS.md)
- ✅ [`docs/STEP_02_CONFIGURATION.md`](docs/STEP_02_CONFIGURATION.md)
- ✅ [`docs/STEP_03_MONGOOSE_SETUP.md`](docs/STEP_03_MONGOOSE_SETUP.md)
- ✅ [`docs/STEP_04_VALIDATION_PIPES.md`](docs/STEP_04_VALIDATION_PIPES.md) *(in chat instructions)*
- ✅ [`docs/STEP_05_EXCEPTION_FILTERS.md`](docs/STEP_05_EXCEPTION_FILTERS.md) *(in chat instructions)*
- ✅ [`docs/STEP_06_GUARDS.md`](docs/STEP_06_GUARDS.md) *(in chat instructions)*
- ✅ [`docs/STEP_07_JWT_AUTHENTICATION.md`](docs/STEP_07_JWT_AUTHENTICATION.md) *(in chat instructions)*
- 🔄 [`docs/STEP_08_CUSTOM_DECORATORS.md`](docs/STEP_08_CUSTOM_DECORATORS.md) *(in chat instructions below)*

---

## ✅ Completed Implementation Checklist

### Infrastructure & Config
- [x] `tsconfig.json` fixed (removed `ignoreDeprecations`)
- [x] `.env` file with `PORT`, `NODE_ENV`, `MONGODB_URI`, `JWT_SECRET`
- [x] `@nestjs/config` setup with `ConfigModule.forRoot({ isGlobal: true })`
- [x] `main.ts` uses `ConfigService` for port
- [x] `MongooseModule.forRootAsync()` with `ConfigService` injection
- [x] Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, `transform`
- [x] Global `AllExceptionsFilter` for uniform error responses
- [x] Swagger setup with `DocumentBuilder`, `addBearerAuth()`, served at `/api`

### Blog Feature (`src/blog/`)
- [x] `blog.module.ts` with `MongooseModule.forFeature([Blog])`
- [x] `blog.schema.ts` with `@Schema({ timestamps: true })`
- [x] `blog.controller.ts` with full CRUD + `@ApiBearerAuth()` + `@Public()` on GET routes
- [x] `blog.service.ts` with Mongoose model injection (`@InjectModel`)
- [x] `create-blog.dto.ts` with `class-validator` + `@ApiProperty()`
- [x] `update-blog.dto.ts` with `class-validator` + `@ApiPropertyOptional()`

### Auth Feature (`src/auth/`)
- [x] `auth.module.ts` with `JwtModule.registerAsync()`, `PassportModule`, `User` schema
- [x] `user.schema.ts` with `_id`, `name`, `email`, `password`, `role`, timestamps
- [x] `auth.controller.ts` with `/auth/login` and `/auth/register`
- [x] `auth.service.ts` with MongoDB + bcrypt + JWT signing
- [x] `jwt.strategy.ts` with `ExtractJwt.fromAuthHeaderAsBearerToken()`
- [x] `jwt-auth.guard.ts` extending `AuthGuard('jwt')` with `@Public()` support via `Reflector`
- [x] `login.dto.ts` with validation + Swagger
- [x] `register.dto.ts` with validation + Swagger

### Common (`src/common/`)
- [x] `public.decorator.ts` — `@Public()` to skip auth
- [x] `http-exception.filter.ts` — Global exception filter with MongoDB CastError handling

### App Level
- [x] `app.module.ts` imports: `ConfigModule`, `MongooseModule`, `AuthModule`, `BlogModule`

---

## 🔄 Next Step: Step 8 — Custom Decorators

**What to build:**
- [ ] `@CurrentUser()` param decorator — get logged-in user without `@Req()`
- [ ] `@Roles()` method decorator + `RolesGuard` — role-based access control
- [ ] `UserPayload` interface/type

**Chat instructions already given** — search chat for "Step 8: Custom Decorators"

---

## ⬜ Remaining Steps

### Step 9: Interceptors
- [ ] `LoggingInterceptor` — log method name, execution time
- [ ] `TransformInterceptor` — wrap all responses in `{ success: true, data: ... }`
- [ ] `CacheInterceptor` — simple response caching
- [ ] `@UseInterceptors()` on controllers or global setup

### Step 10: Advanced Custom Providers
- [ ] Value providers (`useValue`) — config constants
- [ ] Factory providers (`useFactory`) — async initialization
- [ ] Custom provider tokens (symbols/strings instead of classes)

### Step 11: Testing
- [ ] Unit test `BlogService` with mocked `@InjectModel`
- [ ] Unit test `AuthService` with mocked `JwtService` and `UserModel`
- [ ] E2E test with `Test.createTestingModule()` + `supertest`
- [ ] Mock `ConfigService` in tests

---

## 🏃 How to Continue Later

1. Read the step's markdown file or scroll up in chat history
2. Implement the code yourself
3. Run `npm run start:dev` to see it in action
4. Test endpoints using Swagger UI at `http://localhost:3000/api`
5. Come back and say "next" when ready

**Current state: Step 8 ready to implement. 🚀**
