import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import postgres from "postgres";
import * as schema from "./db/schema/farms";
import { drizzle } from "drizzle-orm/postgres-js";
import { asc } from "drizzle-orm";

const pg = postgres(process.env.PG_URL || "");
const db = drizzle(pg, { schema });

export const app = new Elysia();
app.use(
  cors({
    origin: true,
  })
);
app.post(
  "/farm-logging",
  ({ body }) => {
    console.log("Nice.");
    return db.insert(schema.farmLogging).values(body).returning();
  },
  {
    body: t.Object({
      islandOwner: t.String(),
      seedType: t.String(),
      seedReturnCount: t.Number(),
      seedProduceCount: t.Number(),
      harvestTimestamp: t.Optional(t.String()),
      wormsGathered: t.Number(),
    }),
  }
);

app.get("/farm-data", () => {
  return db.query.farmLogging.findMany({
    orderBy: [asc(schema.farmLogging.harvestTimestamp)],
  });
});

app.listen(3000);

console.log(
  `� Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);