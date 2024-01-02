import { Component } from "solid-js";

type Props = {
  onChange: (value: string) => void;
  value: string;
  type: "text" | "number";
  step?: string;
};

const Input: Component<Props> = (props) => {
  const onInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    props.onChange(target.value);
  };

  return (
    <input
      class="bg-gray-200 dark:bg-gray-800 py-2 px-3 rounded-md w-full"
      type={props.type}
      value={props.value}
      step={props.step}
      onInput={onInput}
    />
  );
};

export default Input;
