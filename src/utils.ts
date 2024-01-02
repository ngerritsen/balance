export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

const formatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export const formatAmount = (value: number) => formatter.format(value);
