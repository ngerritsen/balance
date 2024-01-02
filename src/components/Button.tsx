import { Component, JSX, JSXElement } from "solid-js";

type Props = {
  children: JSXElement;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  type?: "button" | "submit";
};

const Button: Component<Props> = (props) => {
  return (
    <button
      class="bg-black dark:bg-gray-200 dark:text-gray-900 text-white py-2 px-4 rounded-md font-bold text-sm"
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
