import { PrismaClient } from "@prisma/client/edge"; // Use the Prisma Client for edge
import { withAccelerate } from "@prisma/extension-accelerate"; // Import Prisma Accelerate extension
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getPagination } from "../utils/paginationHelper";

import { createPostInput, updatePostInput } from "@venteury/blog-common";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user_id: string;
  };
}>();

blogRoute.use("*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set("user_id", payload.id as string);
    return next();
  } catch (error) {
    console.error(error);
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
});

blogRoute.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: c.get("user_id"),
      },
    });
    return c.json({ posts });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoute.get("/getAllBlogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const search = c.req.query("search") ?? "";
    const { skip, take, currentPage, pageSize } = getPagination(
      c.req.query("page") ?? "1",
      c.req.query("limit") ?? "10"
    );

    const posts = await prisma.post.findMany({
      where: {
        OR: search
          ? [{ title: { contains: search, mode: "insensitive" } }]
          : undefined,
      },
      take,
      skip,
    });

    const totalPosts = await prisma.post.count({
      where: {
        OR: search
          ? [{ title: { contains: search, mode: "insensitive" } }]
          : undefined,
      },
    });

    return c.json(
      {
        success: true,
        pagination: {
          currentPage,
          pageSize,
          totalPosts,
          totalPages: Math.ceil(totalPosts / pageSize),
        },
        data: posts,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json({ error: error }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoute.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({ post });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoute.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validationResult = createPostInput.safeParse(body);

    if (!validationResult.success) {
      return c.json({ error: "Invalid input" }, 400);
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("user_id"),
      },
    });

    return c.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoute.put("/update/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const validationResult = updatePostInput.safeParse(body);

    if (!validationResult.success) {
      return c.json({ error: "Invalid input" }, 400);
    }

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoute.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return c.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return c.json({ error: error }, 500);
  } finally {
    await prisma.$disconnect();
  }
});
