import { Component, For } from "solid-js";

type Props = {
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  value: string;
};

const Select: Component<Props> = (props) => {
  return (
    <select
      class="bg-gray-200 dark:bg-gray-800 py-2 px-2 rounded-md w-full"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <For each={props.options}>
        {(option) => <option value={option.value}>{option.label}</option>}
      </For>
    </select>
  );
};

export default Select;
