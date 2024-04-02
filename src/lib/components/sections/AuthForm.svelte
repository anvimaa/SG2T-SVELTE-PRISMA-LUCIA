<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  import * as Alert from "$lib/components/ui/alert/index.js";

  import { cn } from "$lib/utils.js";
  import { Loader, CircleAlert } from "lucide-svelte";
  import { redirect } from "@sveltejs/kit";

  let className: string | undefined | null = undefined;
  export { className as class };

  let isLoading = false;
  let username = "";
  let password = "";
  let msg = "";
  async function onSubmit() {
    isLoading = true;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    });

    const { message, success } = await response.json();
    if (success) {
      isLoading = false;
      window.location.href = "/dashboard";
    }
    msg = message;
    isLoading = false;
  }
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
  <form on:submit|preventDefault={onSubmit}>
    <div class="grid gap-2">
      <div class="grid gap-1">
        <Label class="sr-only" for="username">Usuario</Label>
        <Input
          id="username"
          placeholder="Nome de Usuário"
          type="text"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          disabled={isLoading}
          bind:value={username}
        />
      </div>
      <div class="grid gap-1">
        <Label class="sr-only" for="password">Senha</Label>
        <Input
          id="password"
          placeholder="Palavra Passe"
          type="password"
          autocapitalize="none"
          autocomplete="off"
          autocorrect="off"
          disabled={isLoading}
          bind:value={password}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {#if isLoading}
          <Loader class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Iniciar Sessão
      </Button>
      {#if msg}
        <Alert.Root variant="destructive">
          <CircleAlert class="h-4 w-4" />
          <Alert.Title>Atenção!</Alert.Title>
          <Alert.Description>
            {msg}
          </Alert.Description>
        </Alert.Root>
      {/if}
    </div>
  </form>
</div>
