<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import UserAuthForm from "$lib/components/sections/AuthForm.svelte";
  import AuthenticationLight from "$lib/img/examples/authentication-light.png";
  import AuthenticationDark from "$lib/img/examples/authentication-dark.png";
</script>

<div class="md:hidden">
  <img
    src={AuthenticationLight}
    width={1280}
    height={843}
    alt="Authentication"
    class="block dark:hidden"
  />
  <img
    src={AuthenticationDark}
    width={1280}
    height={843}
    alt="Authentication"
    class="hidden dark:block"
  />
</div>

<div
  class="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
  <Button
    href="/"
    variant="ghost"
    class="absolute right-4 top-4 md:right-8 md:top-8"
  >
    Voltar
  </Button>
  <div
    class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
  >
    <div
      class="absolute inset-0 bg-cover"
      style="background-image:url(/background-login.jpg);"
    />
    <div class="relative z-20 flex items-center text-lg font-medium">
      <!-- <Command class="mr-2 h-6 w-6" /> -->
      SG2T
    </div>
    <div class="relative z-20 mt-auto">
      <blockquote class="space-y-2">
        <p class="text-lg">
          Sistema de Geolocalização e Gerenciamento de Terrenos
        </p>
        <footer class="text-sm">Administração Municipal do Uíge</footer>
      </blockquote>
    </div>
  </div>
  <div class="lg:p-8">
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <div class="flex flex-col space-y-2 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Entrar no Sistema</h1>
        <p class="text-sm text-muted-foreground">
          Introduza o sue Usuário e Senha para ter acesso ao sistema
        </p>
      </div>
      <UserAuthForm />
    </div>
  </div>
</div>
