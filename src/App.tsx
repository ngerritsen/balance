import { type Component, Show, createSignal, onMount } from "solid-js";
import Header from "./components/Header";
import Balance from "./components/Balance";
import { login, onAuth } from "./service/auth";
import Button from "./components/Button";
import Spinner from "./icons/Spinner";
import GitHub from "./icons/GitHub";

const App: Component = () => {
  const [userId, setUserId] = createSignal<string | undefined>();
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    onAuth((uid) => {
      setUserId(uid);
      setInitialized(true);
    });
  });

  return (
    <div class="md:container mx-auto px-4">
      <Header userId={userId()} />
      <Show
        when={initialized()}
        fallback={
          <div class="pt-12 flex justify-center">
            <Spinner class="animate-spin w-6 h-6" />
          </div>
        }
      >
        <Show
          when={userId()}
          fallback={
            <div class="pt-12 flex justify-center">
              <Button onClick={login}>
                <span
                  class="relative mr-1"
                  style={{ left: "-4px", top: "-1px" }}
                >
                  <GitHub class="inline-block w-5 h-5 fill-white dark:fill-black" />
                </span>
                Login
              </Button>
            </div>
          }
        >
          <Balance userId={userId()} />
        </Show>
      </Show>
    </div>
  );
};

export default App;
