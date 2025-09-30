<script setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "pt-BR",
  },
});

const title = "Calculadora Financeira Online Grátis";
const description =
  "Faça seus cálculos financeiros de forma simples e precisa. Calcule aplicações, financiamentos e valor futuro do seu capital com nossa calculadora inspirada na Calculadora do Cidadão do Banco Central.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>

<template>
  <UApp>
    <UHeader :toggle="false">
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="lucide:calculator" />

    <AppFooter />
  </UApp>
</template>
