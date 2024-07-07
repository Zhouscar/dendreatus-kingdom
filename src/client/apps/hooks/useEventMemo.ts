import { useEventListener, useLatest } from "@rbxts/pretty-roact-hooks";
import { useState } from "@rbxts/roact-hooked";

type EventLike<T extends Callback = Callback> =
    | {
          Connect(callback: T): ConnectionLike;
      }
    | {
          connect(callback: T): ConnectionLike;
      }
    | {
          subscribe(callback: T): ConnectionLike;
      };
type ConnectionLike =
    | {
          Disconnect(): void;
      }
    | {
          disconnect(): void;
      }
    | (() => void);

export default function useEventMemo<T>(event: EventLike, callback: () => T) {
    const [state, setState] = useState(callback());
    const latestState = useLatest(state);

    useEventListener(event, () => {
        const newState = callback();
        if (latestState.current !== newState) {
            setState(newState);
        }
    });

    return state;
}
