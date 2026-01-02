# Calculadora Financeira

Uma aplicação web moderna para cálculos financeiros inspirada na Calculadora do Cidadão do BCB, construída com Nuxt 3 e Nuxt UI.

[![CI](https://github.com/matheus-ferreira1/calculadora-cidadao-2/actions/workflows/ci.yml/badge.svg)](https://github.com/matheus-ferreira1/calculadora-cidadao-2/actions/workflows/ci.yml)

## Funcionalidades

### Calculadora de Investimentos
Calcule qualquer uma das seguintes variáveis fornecendo as outras três:
- **Valor Final**: Quanto você terá ao final do investimento
- **Depósito Mensal**: Quanto você precisa investir por mês
- **Taxa de Juros**: Qual a rentabilidade mensal necessária
- **Número de Meses**: Quanto tempo levará para atingir seu objetivo

**Fórmula utilizada**: Sn = (1 + j) × ((1 + j)^n - 1) / j × p

### Calculadora de Valor Futuro
Calcule o valor futuro de um capital inicial com juros compostos:
- **Valor Futuro**: Quanto seu capital valerá no futuro
- **Capital Atual**: Quanto você tem hoje
- **Taxa de Juros**: Rentabilidade mensal esperada
- **Número de Meses**: Período do investimento

**Fórmula utilizada**: FV = PV × (1 + j)^n

### Calculadora de Financiamento
Calcule valores relacionados a financiamentos:
- **Valor Financiado**: Quanto você pode financiar
- **Valor da Parcela**: Quanto pagará mensalmente
- **Taxa de Juros**: Taxa mensal do financiamento
- **Número de Meses**: Prazo do financiamento

**Fórmula utilizada**: q0 = ((1 - (1+j)^-n)/j) × p

## Tecnologias

- **[Nuxt 3](https://nuxt.com/)**
- **[Vue 3](https://vuejs.org/)**
- **[Nuxt UI](https://ui.nuxt.com/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Zod](https://zod.dev/)**

## Instalação

```bash
# Clone o repositório
git clone https://github.com/matheus-ferreira1/calculadora-cidadao-2.git

# Entre no diretório
cd calculadora-cidadao-2

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Gera a versão de produção
npm run generate     # Gera site estático
npm run preview      # Visualiza a versão de produção

# Qualidade de Código
npm run lint         # Executa o linter
npm run typecheck    # Verifica tipos TypeScript
```

## Estrutura do Projeto

```
app/
├── components/
│   ├── CalculatorCard.vue           # Card wrapper para calculadoras
│   ├── CalculatorTabs.vue           # Navegação entre calculadoras
│   ├── InvestmentCalculator.vue     # Calculadora de investimentos
│   ├── FutureValueCalculator.vue    # Calculadora de valor futuro
│   └── FinancingCalculator.vue      # Calculadora de financiamento
├── composables/
│   └── useFinancialCalculators.ts   # Lógica de cálculos financeiros
└── app.vue                          # Componente raiz

.github/
└── workflows/
    └── ci.yml                       # GitHub Actions CI/CD
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
