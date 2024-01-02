import { Component, For, createSignal } from "solid-js";
import { Item, ItemType } from "../types";
import Modal from "./Modal";
import Editor from "./Editor";
import CirclePlus from "../icons/CirclePlus";
import { formatAmount } from "../utils";
import Square from "../icons/Square";
import More from "../icons/More";
import SquareCheck from "../icons/SquareCheck";

type SummaryItem = Pick<Item, "name" | "amount"> & {
  variant?: "italic" | "bold";
};

type EditableProps = {
  title: string;
  items: Item[];
  type: ItemType;
  onAdd: (item: Item) => void;
  onEdit: (item: Item) => void;
  onRemove: (id: string) => void;
};

type SummaryProps = {
  title: string;
  items: SummaryItem[];
};

const Sheet: Component<EditableProps | SummaryProps> = (props) => {
  const [showAdd, setShowAdd] = createSignal(false);
  const [edit, setEdit] = createSignal("");
  const isEditable = "onAdd" in props;
  const editItem = () =>
    isEditable && props.items.find((item) => item.id === edit());

  return (
    <div class="bg-white shadow-sm shadow-gray-300 dark:shadow-none dark:bg-gray-900 rounded-md">
      <div class="p-3 flex justify-between">
        <h2 class="font-bold">{props.title}</h2>
        {isEditable && (
          <>
            <button onClick={() => setShowAdd(true)}>
              <CirclePlus class="dark:fill-gray-50" />
            </button>
            <Modal
              title={`Add ${props.title.toLowerCase()}`}
              isOpen={showAdd()}
              onClose={() => setShowAdd(false)}
            >
              <Editor
                type={(props as EditableProps).type}
                onAdd={(item) => {
                  setShowAdd(false);
                  props.onAdd(item);
                }}
              />
            </Modal>
            <Modal
              title={`Edit ${props.title.toLowerCase()}`}
              isOpen={!!edit() && !!editItem()}
              onClose={() => setEdit("")}
            >
              <Editor
                item={editItem()}
                onRemove={(id) => {
                  setEdit("");
                  props.onRemove(id);
                }}
                onEdit={(item) => {
                  setEdit("");
                  props.onEdit(item);
                }}
              />
            </Modal>
          </>
        )}
      </div>
      <ul>
        <For each={props.items}>
          {(item) => (
            <li
              class="py-2 px-3 border-t border-gray-200 dark:border-gray-800 flex gap-3 items-center"
              classList={{
                "font-bold": (item as SummaryItem).variant === "bold",
                italic: (item as SummaryItem).variant === "italic",
              }}
            >
              {isEditable && "type" in item && item.type === "expense" && (
                <button
                  onClick={() => props.onEdit({ ...item, payed: !item.payed })}
                >
                  {!item.payed ? (
                    <Square class="dark:fill-gray-50" />
                  ) : (
                    <SquareCheck class="dark:fill-gray-50" />
                  )}
                </button>
              )}
              <span class="grow">{item.name}</span>
              <span
                classList={{
                  "text-red-500": item.amount < 0 && !isEditable,
                }}
              >
                {formatAmount(item.amount)}
              </span>

              {isEditable && "id" in item && (
                <button onClick={() => setEdit(item.id)}>
                  <More class="opacity-50 hover:opacity-100 ml-1 dark:fill-gray-400" />
                </button>
              )}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Sheet;