<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

const schema = z
  .object({
    months: z.number().int().gt(0).optional(),
    interestRate: z.number().gt(0).optional(),
    presentValue: z.number().gt(0).optional(),
    futureValue: z.number().gt(0).optional(),
  })
  .refine(
    (data) => {
      const filledFields = Object.values(data).filter(
        (value) => value !== undefined && value !== null
      ).length;
      return filledFields === 3;
    },
    {
      message: "Preencha exatamente 3 campos para calcular o quarto",
    }
  );

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  months: undefined,
  interestRate: undefined,
  presentValue: undefined,
  futureValue: undefined,
});

const toast = useToast();
const { calculateFutureValue } = useFinancialCalculators();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const fields = Object.values(event.data).filter(Boolean);
  if (fields.length !== 3) {
    toast.add({
      title: "Erro",
      description: "Preencha exatamente 3 campos para calcular o quarto.",
      color: "error",
    });
    return;
  }

  try {
    const result = calculateFutureValue(event.data);

    if (!result) {
      toast.add({
        title: "Erro",
        description: "Não foi possível realizar o cálculo com os valores fornecidos.",
        color: "error",
      });
      return;
    }

    state[result.field] = result.value;

    toast.add({
      title: "Cálculo realizado com sucesso",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao realizar o cálculo.";

    toast.add({
      title: "Erro no cálculo",
      description: errorMessage,
      color: "error",
    });
  }
}

function resetForm() {
  state.months = undefined;
  state.interestRate = undefined;
  state.presentValue = undefined;
  state.futureValue = undefined;
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    :validate-on="[]"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <UFormField label="Capital Atual (R$)" name="presentValue">
        <UInput
          v-model="state.presentValue"
          type="number"
          placeholder="Ex: 10000.00"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Valor Futuro (R$)" name="futureValue">
        <UInput
          v-model="state.futureValue"
          type="number"
          placeholder="Ex: 12500.00"
          class="w-full"
        />
      </UFormField>
    </div>

    <footer class="grid grid-cols-[1fr_min-content] gap-4">
      <UButton type="submit" class="flex justify-center"> Calcular </UButton>
      <UButton variant="outline" @click="resetForm">Limpar</UButton>
    </footer>
  </UForm>
</template>
