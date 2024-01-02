import {
  Component,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import * as balanceService from "../service/balance";
import { Balance as BalanceType, Item } from "../types";
import { Unsubscribe } from "firebase/firestore";
import Sheet from "./Sheet";

type Props = {
  userId: string;
};

const Balance: Component<Props> = (props) => {
  const [balance, setBalance] = createSignal<BalanceType>({ items: [] });
  const [unsubscribe, setUnsubscribe] = createSignal<Unsubscribe>();

  onMount(() => {
    setUnsubscribe(() => balanceService.subscribe(props.userId, setBalance));
  });

  onCleanup(() => {
    unsubscribe()();
  });

  const onAdd = (item: Item) => {
    balanceService.update(props.userId, {
      ...balance(),
      items: [...balance().items, item],
    });
  };

  const onEdit = (item: Item) => {
    balanceService.update(props.userId, {
      ...balance(),
      items: balance().items.map((i) => (i.id === item.id ? item : i)),
    });
  };

  const onRemove = (id: string) => {
    balanceService.update(props.userId, {
      ...balance(),
      items: balance().items.filter((item) => item.id !== id),
    });
  };

  const items = () => balance().items;
  const sum = (items: Item[]) => items.reduce((t, i) => i.amount + t, 0);
  const income = createMemo(() => items().filter((i) => i.type === "income"));
  const expense = createMemo(() => items().filter((i) => i.type === "expense"));
  const pending = createMemo(() => expense().filter((i) => !i.payed));
  const totalIncome = createMemo(() => sum(income()));
  const totalExpense = createMemo(() => sum(expense()));
  const totalPending = createMemo(() => sum(pending()));

  return (
    <div class="grid md:grid-cols-3 gap-4 align-top">
      <div>
        <Sheet
          title="Income"
          items={income()}
          type="income"
          onAdd={onAdd}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </div>
      <div>
        <Sheet
          title="Expense"
          items={expense()}
          type="expense"
          onAdd={onAdd}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </div>
      <div>
        <Sheet
          title="Summary"
          items={[
            {
              name: "Income",
              amount: totalIncome(),
            },
            {
              name: "Expense",
              amount: totalExpense(),
            },
            {
              name: "To pay",
              variant: "italic",
              amount: totalPending(),
            },
            {
              name: "Saldo",
              variant: "bold",
              amount: totalIncome() - totalExpense(),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Balance;
