import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { Category, Item, ItemType } from "../types";
import { categories } from "../constants";
import Input from "./Input";
import Button from "./Button";
import Select from "./Select";
import Label from "./Label";
import { nanoid } from "nanoid";
import { capitalize } from "lodash";

type AddProps = {
  type: ItemType;
  onAdd: (item: Item) => void;
};

type EditProps = {
  item: Item;
  onEdit: (item: Item) => void;
  onRemove: (id: string) => void;
};

const categoryOptions = categories.map((category) => ({
  label: capitalize(category),
  value: category,
}));

const Editor: Component<AddProps | EditProps> = (props) => {
  const [name, setName] = createSignal("");
  const [amount, setAmount] = createSignal("");
  const [category, setCategory] = createSignal("other");
  const isAdding = "onAdd" in props;

  createEffect(() => {
    const item = (props as EditProps).item || ({} as Item);

    setName(item.name || "");
    setAmount(String(item.amount) || "");
    setCategory(item.category || "other");
  });

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (isAdding) {
      props.onAdd({
        id: nanoid(),
        name: name(),
        amount: Number(amount()),
        category: category() as Category,
        type: props.type,
      });
    } else {
      props.onEdit({
        ...props.item,
        name: name(),
        amount: Number(amount()),
        category: category() as Category,
      });
    }

    setName("");
    setAmount("");
    setCategory("other");
  };

  return (
    <form onSubmit={onSubmit}>
      <div class="mt-4">
        <Label>Name</Label>
        <Input type="text" value={name()} onChange={setName} />
      </div>
      <div class="mt-4">
        <Label>Amount</Label>
        <Input
          type="number"
          step="0.01"
          value={amount()}
          onChange={setAmount}
        />
      </div>
      <div class="mt-4">
        <Label>Category</Label>
        <Select
          value={category()}
          onChange={setCategory}
          options={categoryOptions}
        />
      </div>
      <div class="mt-6 flex gap-3 justify-end">
        {!isAdding && (
          <Button type="button" onClick={() => props.onRemove(props.item.id)}>
            Remove
          </Button>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default Editor;
