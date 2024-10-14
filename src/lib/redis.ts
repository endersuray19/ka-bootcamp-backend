import { createClient } from "redis";

export const client = createClient();

export async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}
