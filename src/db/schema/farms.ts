import { InferSelectModel, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  uuid,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const farmLogging = pgTable("farm_logging", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  harvestTimestamp: timestamp("harvest_timestamp", { mode: "string" }).default(
    sql`CURRENT_TIMESTAMP`
  ),
  islandOwner: varchar("island_owner", { length: 16 }).notNull(),
  seedType: varchar("seed_type", { length: 28 }).notNull(),
  seedReturnCount: integer("seed_return_count").notNull(),
  seedProduceCount: integer("seed_produce_count").notNull(),
  wormsGathered: integer("worms_gathered").notNull().default(0),
});
export type FarmLoggingRecord = Omit<
  InferSelectModel<typeof farmLogging>,
  "id"
>;
