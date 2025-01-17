import { PrismaClient } from "@prisma/client/edge"; // Use the Prisma Client for edge
import { withAccelerate } from "@prisma/extension-accelerate"; // Import Prisma Accelerate extension
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { z } from "zod";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// const prisma = new PrismaClient({
//   datasourceUrl: env.DATABASE_URL,
// }).$extends(withAccelerate());

//  avoid using global varialble in serverless environment as you might miss the context

// app.use("*", (c, next) => {
//   const jwtMiddleware = jwt({
//     secret: c.env.JWT_SECRET,
//   });
//   return jwtMiddleware(c, next);
// });

// Input validation schema using zod
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validationResult = userSchema.safeParse(body);

    if (!validationResult.success) {
      return c.json({ error: "Invalid input" }, 400);
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    const payload = { email: user.email, id: user.id };

    const token = await sign(payload, c.env.JWT_SECRET);

    return c.json({ success: true, jwt: token });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal server error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/api/v1/signin", (c) => {
  return c.text("Hello Hono!");
});
app.post("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});
app.put("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/v1/blog", (c) => {
  return c.text("Hello Hono!");
});

export default app;
