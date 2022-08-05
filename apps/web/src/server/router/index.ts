import { createRouter } from "./context";
import superjson from "superjson";
import { protectedExampleRouter } from "./router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("question.", protectedExampleRouter);

export type AppRouter = typeof appRouter;
