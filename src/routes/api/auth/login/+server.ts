import { lucia } from "$lib/server/auth";
import { fail, redirect, json } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { db } from "$lib/server/db";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
  if (locals.user) {
    return redirect(302, "/dashboard");
  }

  const { username, password } = await request.json();

  try {
    const existingUser = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return json({ succsses: false, message: "Usuario não existe!" });
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password
    );
    if (!validPassword) {
      return json({ succsses: false, message: "Senha Inválida" });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    return redirect(302, "/dashboard");
  } catch (error) {
    console.error(error);
    return json({ succsses: false, message: "Erro no servidor" });
  }
};
