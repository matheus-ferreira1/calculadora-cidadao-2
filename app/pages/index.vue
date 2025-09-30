<template>
  <div>
    <UPageHero
      title="Calculadora Financeira Online Grátis"
      description="Faça seus cálculos financeiros de forma simples e precisa. Calcule aplicações, financiamentos e valor futuro do seu capital com nossa calculadora inspirada na Calculadora do Cidadão do Banco Central."
    />

    <UPageSection>
      <CalculatorTabs />
    </UPageSection>

    <UPageSection
      id="features"
      title="Como Usar a Calculadora Financeira"
      description="Nossa calculadora oferece três tipos de cálculos financeiros essenciais para seu planejamento. Em cada calculadora, você preenche 3 valores e o sistema calcula automaticamente o quarto valor."
      :features="[
        {
          icon: 'lucide:piggy-bank',
          title: 'Aplicação com Depósitos Regulares',
          description:
            'Ideal para simular poupança programada, investimentos mensais em fundos ou previdência privada. Descubra quanto seu dinheiro pode render ao longo do tempo com aportes regulares.',
        },
        {
          icon: 'lucide:calculator',
          title: 'Financiamento com Prestações Fixas',
          description:
            'Perfeito para calcular financiamentos de imóveis, veículos ou empréstimos pessoais. Descubra o valor das prestações, total financiado ou taxa de juros do seu financiamento.',
        },
        {
          icon: 'lucide:chart-spline',
          title: 'Valor Futuro de Capital',
          description:
            'Útil para simular investimentos de valor único, como CDB, Tesouro Direto ou aplicações de renda fixa. Veja o poder dos juros compostos sobre seu capital inicial.',
        },
      ]"
    />
  </div>
</template>
