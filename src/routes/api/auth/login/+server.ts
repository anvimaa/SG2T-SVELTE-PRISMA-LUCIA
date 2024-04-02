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

  if (username === "") {
    return json({ success: false, message: "Introduzir Usuario" });
  }

  if (password === "") {
    return json({ success: false, message: "Introduzir a senha" });
  }

  try {
    //check if user exists
    const existingUser = await db.user.findFirst({
      where: {
        username,
      },
    });
    if (!existingUser) {
      return json({ success: false, message: "Usuario não existe!" });
    }

    //check if password is correct
    const validPassword = await new Argon2id().verify(
      existingUser.password,
      password
    );
    if (!validPassword) {
      return json({ success: false, message: "Senha Inválida" });
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });

    //redirect to dashboard page
    return json({ success: true, message: "" });
  } catch (error) {
    console.error(error);
    return json({ success: false, message: "Erro no servidor" });
  }
};
