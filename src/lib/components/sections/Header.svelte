<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Archive, ArchiveX, Trash2, EllipsisVertical } from "lucide-svelte";
  import Sun from "svelte-radix/Sun.svelte";
  import Moon from "svelte-radix/Moon.svelte";

  import { resetMode, setMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="mb-1 flex items-center p-2">
  <div class="flex items-center gap-2">
    <a href="/about" class="hover:text-neutral-400 dark:hover:text-neutral-300"
      >Sobre</a
    >
    <Separator orientation="vertical" class="mx-1 h-6" />
  </div>

  <div class="ml-auto flex items-center gap-2">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] dark:animate-none animate-bounce rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute animate-nome dark:animate-pulse h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Escolher Tema</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Item on:click={() => setMode("light")}
          >Claro</DropdownMenu.Item
        >
        <DropdownMenu.Item on:click={() => setMode("dark")}
          >Escuro</DropdownMenu.Item
        >
        <DropdownMenu.Item on:click={() => resetMode()}
          >Tema do Sistema</DropdownMenu.Item
        >
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>

  <Separator orientation="vertical" class="mx-2 h-6" />
  <DropdownMenu.Root>
    <DropdownMenu.Trigger
      id="more_options_dropdown"
      class={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <EllipsisVertical class="size-4" />
      <span class="sr-only">More</span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Item>
        <a href="/user/profile/1">Meu Perfil</a>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a href="/api/auth/logout">Sair</a>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
<Separator />
