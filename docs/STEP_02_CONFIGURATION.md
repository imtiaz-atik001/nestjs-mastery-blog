# Step 2: Configuration Management with `@nestjs/config`

## 🎯 Goal
Learn how NestJS natively handles environment variables using `@nestjs/config` instead of manually using `dotenv`.

---

## 🤔 Why `@nestjs/config` over `process.env` / `dotenv`?

| Problem with Manual `dotenv` | `@nestjs/config` Solution |
|------------------------------|---------------------------|
| `require('dotenv').config()` at top of every file | One global setup in `AppModule` |
| No validation — app crashes later if env var missing | Schema validation at startup |
| No TypeScript support for env vars | `ConfigService.get('PORT')` with types |
| Hard to mock in tests | Easy to provide mock `ConfigService` via DI |
| No caching — reads disk every time | Caches values, supports hot reloading |
| Can't use in decorators easily | Works with NestJS DI system everywhere |

**The NestJS way**: Configuration is a **provider** like any other service. You inject it where needed.

---

## 📋 What You Need to Do

### 1. Install the Package

```bash
npm install @nestjs/config
```

### 2. Create a `.env` File

Create `.env` in the project root:

```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB (we'll use this in Step 3)
MONGODB_URI=mongodb://localhost:27017/nestjs-blog
```

> Don't forget to add `.env` to `.gitignore` if not already there!

### 3. Update `src/app.module.ts`

Import `ConfigModule` and register it globally:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,    // Makes ConfigModule available everywhere without importing
      envFilePath: '.env',
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**Key options**:
- `isGlobal: true` — No need to import ConfigModule in every feature module
- `envFilePath` — Which file to load (default is `.env`)
- `cache: true` — Caches env vars for performance
- `expandVariables: true` — Allows `${VAR}` syntax in `.env`

### 4. Update `src/main.ts` to Use ConfigService

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get config via DI instead of process.env
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  
  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}`);
}
bootstrap();
```

**Why `app.get(ConfigService)`?**
- Before `app.listen()`, we can't use constructor injection
- `app.get()` retrieves any provider from the DI container directly

### 5. (Optional but Recommended) Create Typed Config File

Create `src/config/app.config.ts`:

```typescript
export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongodb: {
    uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/nestjs-blog',
  },
});
```

Then update `app.module.ts`:

```typescript
import appConfig from './config/app.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig],  // Loads your custom config object
}),
```

Now access nested values with dot notation:

```typescript
configService.get('mongodb.uri');
configService.get('port');
```

### 6. (Optional) Validation with `Joi`

Install Joi for runtime validation:

```bash
npm install joi
```

Update `app.module.ts`:

```typescript
import * as Joi from 'joi';

ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    MONGODB_URI: Joi.string().required(),
  }),
}),
```

**Benefit**: App refuses to start if required env vars are missing!

---

## 🧪 How to Test

1. Make sure your `.env` file has `PORT=3000`
2. Run `npm run start:dev`
3. Check console output — you should see the port from `.env`
4. Change `PORT` in `.env` and restart — port should change

---

## ✅ Checklist

- [ ] `@nestjs/config` installed
- [ ] `.env` file created with `PORT` and `MONGODB_URI`
- [ ] `ConfigModule.forRoot({ isGlobal: true })` added to `AppModule`
- [ ] `main.ts` uses `ConfigService` instead of `process.env`
- [ ] App starts and reads port from `.env`

---

## 🚀 Next Step

**Step 3: MongoDB + Mongoose Integration** — Replace in-memory storage with real MongoDB database using `@nestjs/mongoose`.
