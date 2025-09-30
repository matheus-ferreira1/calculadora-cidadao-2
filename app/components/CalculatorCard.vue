<template>
  <UCard>
    <template #header>
      <header>
        <div class="flex items-center gap-2">
          <UIcon :name="item.icon" class="size-5 text-primary" />
          <h2 class="font-bold text-lg">{{ item.title }}</h2>
        </div>
        <p class="text-muted">
          {{ item.description }}
        </p>
      </header>
    </template>

    <main>
      <slot />
    </main>

    <template #footer>
      <article
        class="p-4 border border-muted rounded-sm text-muted text-sm space-y-2"
      >
        <h4 class="font-bold">Como usar:</h4>
        <p>{{ item.howToUse }}</p>
      </article>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Props {
  item: {
    label: string;
    description: string;
    icon: string;
    slot: "investment" | "financing" | "future";
    title: string;
    howToUse: string;
  };
}

defineProps<Props>();
</script>
