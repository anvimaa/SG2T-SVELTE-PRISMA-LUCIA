<script lang="ts">
  export let user: any;
</script>

<header class="bg-gray-800 text-white flex justify-between p-4 mb-4">
  <h1 class="text-3xl font-bold">Logo</h1>
  <nav>
    <a class="mx-4 text-gray-400 hover:text-white" href="/">Home</a>
    <a class="mx-4 text-gray-400 hover:text-white" href="/about">Sobre</a>
    <a class="mx-4 text-gray-400 hover:text-white" href="/contact">Contato</a>
    <a class="mx-4 text-gray-400 hover:text-white" href="/api/auth/logout"
      >Log Out</a
    >
    <span class="text-gray-400">{user.username}</span>
  </nav>
</header>
