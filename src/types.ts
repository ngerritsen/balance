export type Category =
  | "salary"
  | "subscription"
  | "car"
  | "tax"
  | "insurance"
  | "house"
  | "health"
  | "other";

export type ItemType = "income" | "expense";

export type Balance = {
  items: Item[];
};

export type Item = {
  id?: string;
  name: string;
  amount: number;
  category?: Category;
  payed?: boolean;
  type?: ItemType;
};
