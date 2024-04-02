<script lang="ts">
  import { primaryRoutes, secondaryRoutes } from "./config.js";
  import Header from "$/components/sections/Header.svelte";
  import Nav from "$lib/components/sections/Nav.svelte";
  import { cn } from "$lib/utils.js";
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  import { Separator } from "$lib/components/ui/select/index.js";

  export let data;

  let defaultLayout = data.layout || [265, 440, 655];

  let navCollapsedSize = 6;
  let isCollapsed = data.collapsed || false;

  function onLayoutChange(sizes: number[]) {
    document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
  }

  function onCollapse() {
    isCollapsed = true;
    document.cookie = `PaneForge:collapsed=${true}`;
  }

  function onExpand() {
    isCollapsed = false;
    document.cookie = `PaneForge:collapsed=${false}`;
  }
</script>

<div class="md:block">
  <Resizable.PaneGroup
    direction="horizontal"
    {onLayoutChange}
    class="h-screen items-stretch"
  >
    <Resizable.Pane
      defaultSize={defaultLayout[0]}
      collapsedSize={navCollapsedSize}
      collapsible
      minSize={15}
      maxSize={20}
      {onCollapse}
      {onExpand}
    >
      <div
        class={cn(
          "flex h-[52px] items-center justify-center",
          isCollapsed ? "h-[52px]" : "px-2"
        )}
      >
        <h1 class="text-2xl font-bold">SG2T</h1>
      </div>
      <Separator />
      <Nav {isCollapsed} routes={primaryRoutes} />
      <Separator />
      <Nav {isCollapsed} routes={secondaryRoutes} />
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <Resizable.Pane defaultSize={defaultLayout[2]}>
      <div class="flex h-full flex-col">
        <Header></Header>
        <div class="flex flex-col p-8">
          <slot />
        </div>
      </div>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>
