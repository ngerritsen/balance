import { Component } from "solid-js";

type Props = {
  class?: string;
};

const Ellipsis: Component<Props> = (props) => (
  <svg
    class={props.class}
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="14"
    viewBox="0 0 448 512"
  >
    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
  </svg>
);

export default Ellipsis;
