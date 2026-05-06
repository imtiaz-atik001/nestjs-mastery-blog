# Step 1: Core Concepts Deep Dive

## 🎯 Goal
Understand the heart of NestJS by building an **in-memory Blog module**. No database yet — pure architecture learning.

---

## 📖 What You'll Learn

1. **Modules** (`@Module`) — How NestJS organizes code
2. **Controllers** (`@Controller`) — How HTTP requests are handled
3. **Providers/Services** (`@Injectable`) — Where business logic lives
4. **Dependency Injection** — How NestJS wires everything together
5. **Decorators** — `@Get`, `@Post`, `@Body`, `@Param`, etc.

---

## 🧠 Core Concept 1: Modules (`@Module`)

A module is a **class annotated with `@Module()`** that organizes related controllers and providers.

```typescript
@Module({
  imports: [],        // Other modules this module depends on
  controllers: [],    // Controllers that handle routes
  providers: [],      // Services that can be injected
  exports: [],        // Providers that other modules can use
})
export class BlogModule {}
```

**Why it matters**: Modules create **boundaries**. Each feature (Blog, Auth, Users) gets its own module. This makes the app scalable and testable.

---

## 🧠 Core Concept 2: Controllers (`@Controller`)

Controllers handle **incoming HTTP requests** and return responses.

```typescript
@Controller('blogs')  // Base route: /blogs
export class BlogController {
  @Get()             // Handles GET /blogs
  findAll() { }

  @Get(':id')        // Handles GET /blogs/123
  findOne(@Param('id') id: string) { }

  @Post()            // Handles POST /blogs
  create(@Body() data: CreateBlogDto) { }
}
```

**Why it matters**: Controllers are **thin**. They delegate work to services. This separation means you can test business logic without HTTP.

---

## 🧠 Core Concept 3: Providers / Services (`@Injectable`)

Providers are **classes that can be injected** as dependencies. The most common is a Service.

```typescript
@Injectable()
export class BlogService {
  private blogs = [];

  findAll() { return this.blogs; }
  create(blog) { this.blogs.push(blog); return blog; }
}
```

**Why it matters**: Services contain **business logic**. They're singletons by default (one instance shared across the app). Because of DI, you can easily swap a real service with a mock in tests.

---

## 🧠 Core Concept 4: Dependency Injection (DI)

This is NestJS's **superpower**.

```typescript
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  // NestJS automatically creates BlogService and injects it here!
}
```

**Normal Node.js way**:
```javascript
const blogService = new BlogService();  // Manual instantiation
// What if BlogService needs DatabaseService?
// You have to manually create DatabaseService too...
```

**NestJS way**:
```typescript
constructor(private readonly blogService: BlogService) {}
// NestJS DI container handles all dependencies automatically!
```

**Why it matters**: 
- No manual `new Service()` calls
- Easy to swap implementations (great for testing)
- Encourages loose coupling

---

## 🧠 Core Concept 5: Decorators Reference

| Decorator | Purpose |
|-----------|---------|
| `@Module()` | Declares a NestJS module |
| `@Controller(path)` | Declares a controller with base route |
| `@Injectable()` | Makes a class injectable as a provider |
| `@Get(path?)` | Handles GET requests |
| `@Post(path?)` | Handles POST requests |
| `@Put(path?)` | Handles PUT requests |
| `@Delete(path?)` | Handles DELETE requests |
| `@Patch(path?)` | Handles PATCH requests |
| `@Body()` | Extracts request body |
| `@Param(key?)` | Extracts route parameters |
| `@Query(key?)` | Extracts query parameters |
| `@Headers()` | Extracts request headers |
| `@HttpCode(status)` | Sets response status code |

---

## 🛠️ What We Built in This Step

### Files Created:
- `src/blog/blog.module.ts` — Blog feature module
- `src/blog/blog.controller.ts` — HTTP route handlers
- `src/blog/blog.service.ts` — Business logic (in-memory store)
- `src/blog/dto/create-blog.dto.ts` — Data Transfer Object
- `src/blog/entities/blog.entity.ts` — Entity definition

### Updated:
- `src/app.module.ts` — Imported `BlogModule`

---

## 🧪 Test the Endpoints

After running `npm run start:dev`, test with:

```bash
# Get all blogs
curl http://localhost:3000/blogs

# Create a blog
curl -X POST http://localhost:3000/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Blog","content":"Hello NestJS!","author":"John"}'

# Get one blog
curl http://localhost:3000/blogs/1

# Update a blog
curl -X PATCH http://localhost:3000/blogs/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete a blog
curl -X DELETE http://localhost:3000/blogs/1
```

---

## ✅ Checklist

- [ ] Understand what `@Module()` does
- [ ] Understand what `@Controller()` does
- [ ] Understand what `@Injectable()` does
- [ ] Understand how DI works via `constructor()`
- [ ] Test all CRUD endpoints

---

## 🚀 Next Step

**Step 2: Configuration Management** — Learn how to use `@nestjs/config` to manage environment variables in a NestJS-native way.
