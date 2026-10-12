<template>
  <div class="flex min-h-screen bg-white font-body">
    <BackofficeSidebar />
    <main class="flex flex-1 flex-col bg-bo-canvas">
      <slot />
    </main>
  </div>
</template>
