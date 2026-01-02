export interface InvestmentCalculationData {
  months?: number;
  interestRate?: number;
  monthlyDeposit?: number;
  finalValue?: number;
}

export interface FutureValueCalculationData {
  months?: number;
  interestRate?: number;
  presentValue?: number;
  futureValue?: number;
}

export interface FinancingCalculationData {
  months?: number;
  interestRate?: number;
  installment?: number;
  financedValue?: number;
}

export interface CalculationResult<T = string> {
  field: T;
  value: number;
  formattedValue: string;
}

export function useFinancialCalculators() {
  const formatCurrency = (value: number, locale = "pt-BR", currency = "BRL"): string => {
    return value.toLocaleString(locale, {
      style: "currency",
      currency,
    });
  };

  const formatMonths = (months: number): string => {
    return `${months} ${months === 1 ? "mês" : "meses"}`;
  };

  const formatPercentage = (value: number, decimals = 4): string => {
    return `${value.toFixed(decimals)}%`;
  };

  function calculateInvestment(
    data: InvestmentCalculationData
  ): CalculationResult<keyof InvestmentCalculationData> | null {
    const { months, interestRate, monthlyDeposit, finalValue } = data;

    try {
      if (finalValue === undefined && months && interestRate !== undefined && monthlyDeposit) {
        const j = interestRate / 100;

        if (j === 0) {
          const calculatedValue = months * monthlyDeposit;
          return {
            field: "finalValue",
            value: Number(calculatedValue.toFixed(2)),
            formattedValue: formatCurrency(calculatedValue),
          };
        }

        const onePlusJ = 1 + j;
        const calculatedValue = onePlusJ * ((Math.pow(onePlusJ, months) - 1) / j) * monthlyDeposit;

        return {
          field: "finalValue",
          value: Number(calculatedValue.toFixed(2)),
          formattedValue: formatCurrency(calculatedValue),
        };
      }

      if (monthlyDeposit === undefined && months && interestRate !== undefined && finalValue) {
        const j = interestRate / 100;

        if (j === 0) {
          const calculatedValue = finalValue / months;
          return {
            field: "monthlyDeposit",
            value: Number(calculatedValue.toFixed(2)),
            formattedValue: formatCurrency(calculatedValue),
          };
        }

        const onePlusJ = 1 + j;
        const calculatedValue = (finalValue * j) / (onePlusJ * (Math.pow(onePlusJ, months) - 1));

        return {
          field: "monthlyDeposit",
          value: Number(calculatedValue.toFixed(2)),
          formattedValue: formatCurrency(calculatedValue),
        };
      }

      if (months === undefined && interestRate !== undefined && monthlyDeposit && finalValue) {
        const j = interestRate / 100;

        if (j === 0) {
          const calculatedValue = finalValue / monthlyDeposit;
          const roundedMonths = Math.ceil(calculatedValue);
          return {
            field: "months",
            value: roundedMonths,
            formattedValue: formatMonths(roundedMonths),
          };
        }

        const onePlusJ = 1 + j;
        const term = (finalValue * j) / (onePlusJ * monthlyDeposit) + 1;

        if (term <= 0) {
          throw new Error(
            "O valor final deve ser maior que o depósito mensal para este tipo de investimento."
          );
        }

        const calculatedValue = Math.log(term) / Math.log(onePlusJ);

        if (calculatedValue <= 0 || !isFinite(calculatedValue)) {
          throw new Error(
            "Não foi possível calcular o número de meses com os valores fornecidos."
          );
        }

        const roundedMonths = Math.ceil(calculatedValue);

        return {
          field: "months",
          value: roundedMonths,
          formattedValue: formatMonths(roundedMonths),
        };
      }

      if (interestRate === undefined && months && monthlyDeposit && finalValue) {
        if (finalValue <= monthlyDeposit) {
          throw new Error(
            "O valor final deve ser maior que o depósito mensal para este tipo de investimento."
          );
        }

        let j = 0.01;
        const maxIterations = 100;
        const tolerance = 0.0001;

        for (let i = 0; i < maxIterations; i++) {
          const onePlusJ = 1 + j;
          const power = Math.pow(onePlusJ, months);

          const f = (onePlusJ * (power - 1) / j * monthlyDeposit) - finalValue;

          const fPrime = monthlyDeposit * (
            (power - 1) / j +
            onePlusJ * months * Math.pow(onePlusJ, months - 1) / j -
            onePlusJ * (power - 1) / (j * j)
          );

          const jNext = j - f / fPrime;

          if (Math.abs(jNext - j) < tolerance) {
            const percentageValue = jNext * 100;
            return {
              field: "interestRate",
              value: Number(percentageValue.toFixed(4)),
              formattedValue: formatPercentage(percentageValue),
            };
          }

          j = jNext;

          if (j <= 0 || j > 1) {
            throw new Error(
              "Não foi possível encontrar uma taxa de juros válida com os valores fornecidos."
            );
          }
        }

        throw new Error(
          "Não foi possível calcular a taxa de juros. Tente valores diferentes."
        );
      }

      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao calcular valores.");
    }
  }

  function calculateFutureValue(
    data: FutureValueCalculationData
  ): CalculationResult<keyof FutureValueCalculationData> | null {
    const { months, interestRate, presentValue, futureValue } = data;

    try {
      if (futureValue === undefined && months && interestRate !== undefined && presentValue) {
        const j = interestRate / 100;
        const calculatedValue = presentValue * Math.pow(1 + j, months);

        return {
          field: "futureValue",
          value: Number(calculatedValue.toFixed(2)),
          formattedValue: formatCurrency(calculatedValue),
        };
      }

      if (presentValue === undefined && months && interestRate !== undefined && futureValue) {
        const j = interestRate / 100;
        const calculatedValue = futureValue / Math.pow(1 + j, months);

        return {
          field: "presentValue",
          value: Number(calculatedValue.toFixed(2)),
          formattedValue: formatCurrency(calculatedValue),
        };
      }

      if (months === undefined && interestRate !== undefined && presentValue && futureValue) {
        const j = interestRate / 100;

        if (futureValue <= presentValue) {
          throw new Error(
            "O valor futuro deve ser maior que o capital atual para este cálculo."
          );
        }

        if (j === 0) {
          throw new Error(
            "A taxa de juros não pode ser zero para calcular o número de meses."
          );
        }

        const calculatedValue = Math.log(futureValue / presentValue) / Math.log(1 + j);

        if (calculatedValue <= 0 || !isFinite(calculatedValue)) {
          throw new Error(
            "Não foi possível calcular o número de meses com os valores fornecidos."
          );
        }

        const roundedMonths = Math.ceil(calculatedValue);

        return {
          field: "months",
          value: roundedMonths,
          formattedValue: formatMonths(roundedMonths),
        };
      }

      if (interestRate === undefined && months && presentValue && futureValue) {
        if (futureValue <= presentValue) {
          throw new Error(
            "O valor futuro deve ser maior que o capital atual para este cálculo."
          );
        }

        if (months <= 0) {
          throw new Error(
            "O número de meses deve ser maior que zero para este cálculo."
          );
        }

        const calculatedValue = Math.pow(futureValue / presentValue, 1 / months) - 1;

        if (calculatedValue <= 0 || !isFinite(calculatedValue)) {
          throw new Error(
            "Não foi possível calcular a taxa de juros com os valores fornecidos."
          );
        }

        const percentageValue = calculatedValue * 100;

        return {
          field: "interestRate",
          value: Number(percentageValue.toFixed(4)),
          formattedValue: formatPercentage(percentageValue),
        };
      }

      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao calcular valores.");
    }
  }

  function calculateFinancing(
    data: FinancingCalculationData
  ): CalculationResult<keyof FinancingCalculationData> | null {
    const { months, interestRate, installment, financedValue } = data;

    try {
      if (financedValue === undefined && months && interestRate !== undefined && installment) {
        const j = interestRate / 100;

        if (j === 0) {
          const calculatedValue = months * installment;
          return {
            field: "financedValue",
            value: Number(calculatedValue.toFixed(2)),
            formattedValue: formatCurrency(calculatedValue),
          };
        }

        const onePlusJ = 1 + j;
        const calculatedValue = ((1 - Math.pow(onePlusJ, -months)) / j) * installment;

        return {
          field: "financedValue",
          value: Number(calculatedValue.toFixed(2)),
          formattedValue: formatCurrency(calculatedValue),
        };
      }

      if (installment === undefined && months && interestRate !== undefined && financedValue) {
        const j = interestRate / 100;

        if (j === 0) {
          const calculatedValue = financedValue / months;
          return {
            field: "installment",
            value: Number(calculatedValue.toFixed(2)),
            formattedValue: formatCurrency(calculatedValue),
          };
        }

        const onePlusJ = 1 + j;
        const calculatedValue = (financedValue * j) / (1 - Math.pow(onePlusJ, -months));

        return {
          field: "installment",
          value: Number(calculatedValue.toFixed(2)),
          formattedValue: formatCurrency(calculatedValue),
        };
      }

      if (months === undefined && interestRate !== undefined && installment && financedValue) {
        const j = interestRate / 100;

        if (j === 0) {
          const calculatedValue = financedValue / installment;
          const roundedMonths = Math.ceil(calculatedValue);
          return {
            field: "months",
            value: roundedMonths,
            formattedValue: formatMonths(roundedMonths),
          };
        }

        const onePlusJ = 1 + j;
        const term = 1 - (financedValue * j / installment);

        if (term <= 0) {
          throw new Error(
            "A parcela deve ser maior que os juros do valor financiado para este cálculo."
          );
        }

        const calculatedValue = -Math.log(term) / Math.log(onePlusJ);

        if (calculatedValue <= 0 || !isFinite(calculatedValue)) {
          throw new Error(
            "Não foi possível calcular o número de meses com os valores fornecidos."
          );
        }

        const roundedMonths = Math.ceil(calculatedValue);

        return {
          field: "months",
          value: roundedMonths,
          formattedValue: formatMonths(roundedMonths),
        };
      }

      if (interestRate === undefined && months && installment && financedValue) {
        let j = 0.01;
        const maxIterations = 100;
        const tolerance = 0.0001;

        for (let i = 0; i < maxIterations; i++) {
          const onePlusJ = 1 + j;
          const powerNeg = Math.pow(onePlusJ, -months);

          const f = ((1 - powerNeg) / j) * installment - financedValue;

          const fPrime = installment * (
            -(1 - powerNeg) / (j * j) +
            months * powerNeg / (j * onePlusJ)
          );

          const jNext = j - f / fPrime;

          if (Math.abs(jNext - j) < tolerance) {
            const percentageValue = jNext * 100;
            return {
              field: "interestRate",
              value: Number(percentageValue.toFixed(4)),
              formattedValue: formatPercentage(percentageValue),
            };
          }

          j = jNext;

          if (j <= 0 || j > 1) {
            throw new Error(
              "Não foi possível encontrar uma taxa de juros válida com os valores fornecidos."
            );
          }
        }

        throw new Error(
          "Não foi possível calcular a taxa de juros. Tente valores diferentes."
        );
      }

      return null;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao calcular valores.");
    }
  }

  return {
    calculateInvestment,
    calculateFutureValue,
    calculateFinancing,
    formatCurrency,
    formatMonths,
    formatPercentage,
  };
}
