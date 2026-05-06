# Step 3: MongoDB + Mongoose Integration

## 🎯 Goal
Replace in-memory storage with a real **MongoDB Atlas** database using `@nestjs/mongoose`. No entity files — use Mongoose Schemas directly.

---

## 🤔 Why `@nestjs/mongoose` over raw `mongoose`?

| Raw Mongoose | `@nestjs/mongoose` |
|--------------|-------------------|
| Manual connection handling | `MongooseModule.forRoot()` — connection as module |
| Manual model registration | `MongooseModule.forFeature()` — models as providers |
| `new BlogModel()` everywhere | `@InjectModel()` — inject models via DI |
| Hard to mock in tests | Swap `@InjectModel()` with mock provider easily |
| No integration with pipes/filters | Works natively with ValidationPipe, ExceptionFilters |

**The NestJS way**: Models are **providers** in the DI container.

---

## 📋 What You Need to Do

### 1. Install Dependencies

```bash
npm install @nestjs/mongoose mongoose
npm install -D @types/mongoose
```

### 2. Ensure ConfigModule is Setup (from Step 2)

Your `.env` file should have:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://test:XhAiPzzPNyVP9H8@cluster0.teo92.mongodb.net/nestjs-blog
```

> **Note**: We added `/nestjs-blog` at the end — that's the database name.

Your `src/app.module.ts` should import `ConfigModule.forRoot({ isGlobal: true })`.

### 3. Connect to MongoDB in `AppModule`

Update `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

**Why `forRootAsync`?**
- We need to read `MONGODB_URI` from `ConfigService`
- `forRootAsync` allows **asynchronous** configuration using DI
- `inject: [ConfigService]` tells NestJS to inject ConfigService into the factory

### 4. Create Mongoose Schema

Create `src/blog/schemas/blog.schema.ts`:

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
```

**Key decorators**:
- `@Schema()` — Marks class as a Mongoose schema. `timestamps: true` auto-adds `createdAt` and `updatedAt`.
- `@Prop()` — Defines a schema property.
- `SchemaFactory.createForClass()` — Generates the actual Mongoose schema.

**Why no `id` field?** MongoDB automatically creates `_id` (ObjectId).

### 5. Update `BlogModule` to Register the Schema

Update `src/blog/blog.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog, BlogSchema } from './schemas/blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
```

**`forFeature([{ name, schema }])`** registers the model for THIS module only.

### 6. Update DTOs

Update `src/blog/dto/create-blog.dto.ts`:

```typescript
export class CreateBlogDto {
  title: string;
  content: string;
  author: string;
}
```

Update `src/blog/dto/update-blog.dto.ts`:

```typescript
export class UpdateBlogDto {
  title?: string;
  content?: string;
  author?: string;
}
```

### 7. Rewrite `BlogService` to Use Mongoose

Update `src/blog/blog.service.ts`:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    return createdBlog.save();
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
  }
}
```

**Key changes**:
- `@InjectModel(Blog.name)` injects the Mongoose model
- All methods are `async` now (MongoDB is async)
- IDs are `string` (MongoDB ObjectIds), not `number`

### 8. Update `BlogController` for MongoDB ObjectIds

Update `src/blog/blog.controller.ts`:

```typescript
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './schemas/blog.schema';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(id);
  }
}
```

**Key changes**:
- Removed `ParseIntPipe` — MongoDB IDs are strings
- All route handlers are `async`
- Import `Blog` from schemas instead of entities

### 9. Delete Old Files

Remove these files (they're no longer needed):
```
src/blog/entities/blog.entity.ts   (already removed)
src/blog/blog.service.ts           (rewrite)
src/blog/blog.controller.ts        (rewrite)
```

---

## 🧪 How to Test

1. Run `npm run start:dev`
2. You should see MongoDB connection success in console
3. Test endpoints:

```bash
# Create a blog
curl -X POST http://localhost:3000/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"First Mongo Blog","content":"Using Mongoose!","author":"You"}'

# Copy the returned _id and use it:
curl http://localhost:3000/blogs/<_id>

# Get all
curl http://localhost:3000/blogs
```

---

## ✅ Checklist

- [ ] `@nestjs/mongoose` and `mongoose` installed
- [ ] `.env` has `MONGODB_URI` with your Atlas connection string
- [ ] `AppModule` uses `MongooseModule.forRootAsync()` with ConfigService
- [ ] `BlogSchema` created in `src/blog/schemas/blog.schema.ts`
- [ ] `BlogModule` imports `MongooseModule.forFeature()`
- [ ] `BlogService` uses `@InjectModel()` and Mongoose methods
- [ ] Controller handles string IDs (no ParseIntPipe)
- [ ] All methods are async
- [ ] CRUD endpoints work with MongoDB Atlas

---

## 🚀 Next Step

**Step 4: DTOs, Validation & Pipes** — Add `class-validator` and `ValidationPipe` so invalid requests are rejected automatically with nice error messages.
