import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // @ts-ignore
      username: attributes.username,
      // @ts-ignore
      avater: attributes.avater,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
