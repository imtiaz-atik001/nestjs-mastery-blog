# 🚀 NestJS Mastery - Step-by-Step Learning Roadmap

> **Project**: Blog API with MongoDB  
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

| Step | Topic | What You'll Build |
|------|-------|-------------------|
| **0** | Project Setup ✅ | Basic NestJS app (already done) |
| **1** | Core Concepts Deep Dive ✅ | In-memory Blog CRUD with Modules, Controllers, Providers, DI |
| **2** | Configuration Management ✅ | `@nestjs/config` for env vars |
| **3** | MongoDB + Mongoose Integration 🔄 | Database connection & schemas |
| **3** | MongoDB + Mongoose Integration | Database connection & schemas |
| **4** | Blog Feature Module | CRUD for Blog Posts with Mongoose |
| **5** | DTOs, Validation & Pipes | Request validation using `class-validator` |
| **6** | Global Error Handling | Exception Filters |
| **7** | Middleware & Interceptors | Logging, response transformation |
| **8** | Guards & Authorization | Route protection with custom guards |
| **9** | Custom Decorators | `@CurrentUser()`, `@Public()` |
| **10** | Authentication (JWT) | Passport + JWT strategy |
| **11** | Swagger/OpenAPI | Auto-generated API documentation |
| **12** | Advanced: Custom Providers | Factory providers, value providers |
| **13** | Testing | Unit & E2E tests |

---

## <a name="step-by-step"></a> 📚 Step-by-Step Documentation

Each step has its own detailed file:

- [`docs/STEP_01_CORE_CONCEPTS.md`](docs/STEP_01_CORE_CONCEPTS.md)
- [`docs/STEP_02_CONFIGURATION.md`](docs/STEP_02_CONFIGURATION.md)
- [`docs/STEP_03_MONGOOSE_SETUP.md`](docs/STEP_03_MONGOOSE_SETUP.md)
- ... (more added as we progress)

---

## 🏃 How to Follow Along

1. Read the step's markdown file first.
2. Implement the code yourself (I'll guide you).
3. Run `npm run start:dev` to see it in action.
4. Test endpoints using browser/curl/Postman.

**Let's build this together! 🚀**
