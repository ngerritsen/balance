import { Component } from "solid-js";
import SignOut from "../icons/SignOut";
import * as auth from "../service/auth";

type Props = {
  userId?: string;
};

const Header: Component<Props> = (props) => {
  return (
    <header class="py-7 flex justify-between">
      <h1 class="text-xl font-bold">Balance</h1>
      {props.userId && (
        <button aria-label="Sign out" onClick={() => auth.logout()}>
          <SignOut class="dark:fill-gray-50" />
        </button>
      )}
    </header>
  );
};

export default Header;
