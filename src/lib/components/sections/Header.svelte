<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import {
    Archive,
    ArchiveX,
    Trash2,
    ReplyAll,
    Reply,
    Forward,
    EllipsisVertical,
  } from "lucide-svelte";
</script>

<div class="mb-1 flex items-center p-2">
  <div class="flex items-center gap-2">
    <Tooltip.Root openDelay={0} group>
      <Tooltip.Trigger
        id="archive_tooltip"
        class={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <Archive class="size-4" />
        <span class="sr-only">Archive</span>
      </Tooltip.Trigger>
      <Tooltip.Content>Archive</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root openDelay={0} group>
      <Tooltip.Trigger
        id="move_to_junk_tooltip"
        class={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <ArchiveX class="size-4" />
        <span class="sr-only">Move to junk</span>
      </Tooltip.Trigger>
      <Tooltip.Content>Move to junk</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root openDelay={0} group>
      <Tooltip.Trigger
        id="move_to_trash_tooltip"
        class={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <Trash2 class="size-4" />
        <span class="sr-only">Move to trash</span>
      </Tooltip.Trigger>
      <Tooltip.Content>Move to trash</Tooltip.Content>
    </Tooltip.Root>
    <Separator orientation="vertical" class="mx-1 h-6" />
  </div>
  <div class="ml-auto flex items-center gap-2">
    <Tooltip.Root openDelay={0} group>
      <Tooltip.Trigger
        id="reply_tooltip"
        class={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <Reply class="size-4" />
        <span class="sr-only">Reply</span>
      </Tooltip.Trigger>
      <Tooltip.Content>Reply</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root openDelay={0} group>
      <Tooltip.Trigger
        id="reply_all_tooltip"
        class={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <ReplyAll class="size-4" />
        <span class="sr-only">Reply all</span>
      </Tooltip.Trigger>
      <Tooltip.Content>Reply all</Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root openDelay={0} group>
      <Tooltip.Trigger
        id="forward_tooltip"
        class={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <Forward class="size-4" />
        <span class="sr-only">Forward</span>
      </Tooltip.Trigger>
      <Tooltip.Content>Forward</Tooltip.Content>
    </Tooltip.Root>
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
      <DropdownMenu.Item>Mark as unread</DropdownMenu.Item>
      <DropdownMenu.Item>Star thread</DropdownMenu.Item>
      <DropdownMenu.Item>Add label</DropdownMenu.Item>
      <DropdownMenu.Item>Mute thread</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
<Separator />
