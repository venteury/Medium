import { Hono } from "hono";
import { cors } from "hono/cors";
// import { sign, verify } from "hono/jwt";

import { logger } from "hono/logger";
import { blogRoute, userRoute } from "./routes";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    user_id: string;
  };
}>();

app.use(
  cors({
    origin: "*", // Allow all origins
    allowMethods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowHeaders: ["Content-Type", "Authorization"], // Allowed headers
    maxAge: 600, // Cache preflight response
  })
);

app.use(logger());
// app.use("/api/v1/*", async (c, next) => {
//   const jwt = c.req.header("Authorization");
//   if (!jwt) {
//     c.status(401);
//     return c.json({ error: "unauthorized" });
//   }
//   const token = jwt.split(" ")[1];

//   try {
//     const payload = await verify(token, c.env.JWT_SECRET);

//     if (!payload) {
//       c.status(401);
//       return c.json({ error: "unauthorized" });
//     }

//     c.set("user_id", payload.id as string);

//     return next();
//   } catch (error) {
//     c.status(401);
//     return c.json({ error: "unauthorized" });
//   }
// });

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

// const prisma = new PrismaClient({
//   datasourceUrl: env.DATABASE_URL,
// }).$extends(withAccelerate());
//  avoid using global varialble in serverless environment as you might miss the context

// const userSchema = z.object({
//   email: z.string().email(),
//   name: z.string().min(1),
//   password: z.string().min(8),
// });

// app.post("/api/v1/signup", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   try {
//     const body = await c.req.json();
//     const validationResult = userSchema.safeParse(body);

//     if (!validationResult.success) {
//       return c.json({ error: "Invalid input" }, 400);
//     }

//     const user = await prisma.user.create({
//       data: {
//         email: body.email,
//         name: body.name,
//         password: body.password,
//       },
//     });

//     const payload = { email: user.email, id: user.id };

//     const token = await sign(payload, c.env.JWT_SECRET);

//     return c.json({ success: true, jwt: token });
//   } catch (error) {
//     console.error(error);
//     return c.json({ error: "Internal server error" }, 500);
//   } finally {
//     await prisma.$disconnect();
//   }
// });

export default app;
