import { Component, JSXElement, createEffect, onCleanup } from "solid-js";
import { Portal } from "solid-js/web";
import Close from "../icons/Close";

type Props = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: JSXElement;
};

const Modal: Component<Props> = (props) => {
  let modalDiv: HTMLDivElement;

  createEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.isOpen) {
        props.onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    onCleanup(() => {
      window.removeEventListener("keydown", onKeyDown);
    });
  });

  createEffect(() => {
    if (props.isOpen && modalDiv) {
      modalDiv.focus();
    }
  });

  return (
    <Portal mount={document.getElementById("modal")}>
      <div
        class="w-full h-full top-0 left-0 flex fixed justify-center items-center p-4 bg-black/20 dark:bg-gray-950/50"
        classList={{
          fixed: props.isOpen,
          hidden: !props.isOpen,
        }}
      >
        <div
          ref={modalDiv}
          class="p-4 bg-white dark:bg-gray-900 rounded-md shadow shadow-gray-400 dark:shadow-gray-950 grow max-w-md"
          tabindex="-1"
        >
          <div class="flex justify-between">
            <h2 class="font-bold text-lg">{props.title}</h2>
            <button onClick={props.onClose} aria-label="Close">
              <Close class="dark:fill-gray-50" />
            </button>
          </div>
          {props.children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
