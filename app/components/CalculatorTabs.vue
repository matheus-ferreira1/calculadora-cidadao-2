<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items = [
  {
    label: "Aplicação com Depósitos",
    description:
      "Calcule o rendimento de uma aplicação com depósitos mensais regulares",
    icon: "lucide:chart-spline",
    slot: "investment" as const,
    title: "Aplicação com Depósitos Regulares",
    howToUse:
      'Preencha 3 dos 4 campos acima e clique em "Calcular" para descobrir o valor do campo em branco. Esta calculadora usa a fórmula de juros compostos para aplicações com depósitos regulares.',
  },
  {
    label: "Financiamento",
    description:
      "Calcule valores relacionados a financiamentos com prestações fixas",
    icon: "lucide:house",
    slot: "financing" as const,
    title: "Financiamento com Prestações Fixas",
    howToUse:
      'Preencha 3 dos 4 campos acima e clique em "Calcular" para descobrir o valor do campo em branco. Esta calculadora usa o sistema de amortização constante (SAC) para financiamentos.',
  },
  {
    label: "Valor Futuro",
    description:
      "Calcule o valor futuro de um capital aplicado a juros compostos",
    icon: "lucide:dollar-sign",
    slot: "future" as const,
    title: "Valor Futuro de um Capital",
    howToUse:
      'Preencha 3 dos 4 campos acima e clique em "Calcular" para descobrir o valor do campo em branco. Esta calculadora usa a fórmula de juros compostos: FV = PV × (1 + i)^n',
  },
] satisfies TabsItem[];
</script>

<template>
  <UTabs :items="items" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
    <template #investment="{ item }">
      <CalculatorCard :item="item">
        <InvestmentCalculator />
      </CalculatorCard>
    </template>

    <template #financing="{ item }">
      <CalculatorCard :item="item">
        <FinancingCalculator />
      </CalculatorCard>
    </template>

    <template #future="{ item }">
      <CalculatorCard :item="item">
        <FutureValueCalculator />
      </CalculatorCard>
    </template>
  </UTabs>
</template>
