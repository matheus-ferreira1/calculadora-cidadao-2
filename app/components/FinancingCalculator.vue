<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

const schema = z
  .object({
    months: z.number().int().gt(0),
    interestRate: z.number().gt(0),
    installment: z.number().gt(0),
    financedValue: z.number().gt(0),
  })
  .refine((data) => Object.values(data).filter(Boolean).length >= 3);

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  months: undefined,
  interestRate: undefined,
  installment: undefined,
  financedValue: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const fields = Object.values(event.data).filter(Boolean);
  if (fields.length !== 3) {
    toast.add({
      title: "Erro",
      description: "Preencha 3 campos para calcular.",
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <UFormField label="Número de meses" name="months">
        <UInput
          v-model="state.months"
          type="number"
          placeholder="Ex: 24"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Taxa de Juros Mensal (%)" name="interestRate">
        <UInput
          v-model="state.interestRate"
          type="number"
          placeholder="Ex: 1.5"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Valor da Prestação (R$)" name="installment">
        <UInput
          v-model="state.installment"
          type="number"
          placeholder="Ex: 1200.00"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Valor Financiado (R$)" name="financedValue">
        <UInput
          v-model="state.financedValue"
          type="number"
          placeholder="Ex: 200000.00"
          class="w-full"
        />
      </UFormField>
    </div>

    <footer class="grid grid-cols-[1fr_min-content] gap-4">
      <UButton type="submit" class="flex justify-center"> Calcular </UButton>
      <UButton variant="outline">Limpar</UButton>
    </footer>
  </UForm>
</template>
