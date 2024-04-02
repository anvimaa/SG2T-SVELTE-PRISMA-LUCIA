<script lang="ts">
  import AccountSwitcher from "./account-switcher.svelte";
  import { primaryRoutes, secondaryRoutes } from "../config.js";
  import MailDisplay from "./mail-display.svelte";
  import MailList from "./mail-list.svelte";
  import Nav from "./nav.svelte";
  import { mailStore } from "../store.js";
  import { cn } from "$lib/utils.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  import { Separator } from "$lib/components/ui/select/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import Search from "lucide-svelte/icons/search";
  import type { Account, Mail } from "../data.js";

  import MailLight from "$lib/img/examples/mail-light.png";
  import MailDark from "$lib/img/examples/mail-dark.png";

  export let accounts: Account[];
  export let mails: Mail[];
  export let defaultLayout = [265, 440, 655];
  export let defaultCollapsed = false;
  export let navCollapsedSize: number;

  let isCollapsed = defaultCollapsed;

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

<div class="md:hidden">
  <img
    src={MailLight}
    width={1280}
    height={1114}
    alt="Mail"
    class="block dark:hidden"
  />
  <img
    src={MailDark}
    width={1280}
    height={1114}
    alt="Mail"
    class="hidden dark:block"
  />
</div>

<div class="hidden md:block">
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
        <AccountSwitcher {isCollapsed} {accounts} />
      </div>
      <Separator />
      <Nav {isCollapsed} routes={primaryRoutes} />
      <Separator />
      <Nav {isCollapsed} routes={secondaryRoutes} />
    </Resizable.Pane>

    <Resizable.Handle withHandle />

    <Resizable.Pane defaultSize={defaultLayout[2]}>
      <MailDisplay
        mail={mails.find((item) => item.id === $mailStore.selected) || null}
      />
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>
