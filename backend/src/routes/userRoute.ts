import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@venteury/blog-common";

const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user_id: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validationResult = signupInput.safeParse(body);

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
    return c.json({ error }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

userRoute.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validationResult = signinInput.safeParse(body);

    if (!validationResult.success) {
      return c.json({ error: "Invalid input" }, 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    if (user.password !== body.password) {
      return c.json({ error: "Invalid password" }, 401);
    }

    const payload = { email: user.email, id: user.id };

    const token = await sign(payload, c.env.JWT_SECRET);

    return c.json({ success: true, jwt: token });
  } catch (error) {
    console.error(error);
    return c.json({ error }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

export { userRoute };
