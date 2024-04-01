<script lang="ts">
  import Header from "$/components/sections/Header.svelte";
  import type { PageData } from "../$types";
  export let data: PageData;
</script>

<header class="header">
  <Header user={data.user} />
</header>
<div class="flex">
  <nav class="sidebar">
    <h1>Teste</h1>
  </nav>
  <main class="main">
    <slot />
  </main>
</div>
<footer class="footer">
  <slot name="footer" />
</footer>
