import { useKeyPress } from "@rbxts/pretty-roact-hooks";
import { useEffect, useMemo, useMutable } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-reflex";
import { RunService } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { theLocalPlr } from "client/localPlr";
import { selectPlayerKeybinds } from "shared/store/players/keybinds";
import { KeyCode, KeyName } from "type";

export default function useKeybindPress(keyName: KeyName) {
    const keybinds = useSelector(selectPlayerKeybinds(theLocalPlr));
    const keyCombo = useMemo<KeyCode[]>(() => {
        if (keybinds === undefined) return [];

        let keycode: KeyCode | undefined = undefined;
        Sift.Dictionary.entries(keybinds).forEach((entry) => {
            if (keyName === entry[0]) {
                keycode = entry[1];
            }
        });

        if (keycode === undefined) return [];

        return [keycode];
    }, [keyName, keybinds]);

    return useKeyPress(keyCombo);
}

export function useKeybindPressEffect(
    keyName: KeyName,
    callbacks: {
        press?: () => void;
        release?: (duration: number) => void;
        holdPerFrame?: (duration: number, dt: number) => void;
    },
) {
    const isKeyPressed = useKeybindPress(keyName);
    const startTimeMutable = useMutable(-1);

    useEffect(() => {
        if (isKeyPressed) {
            if (callbacks.press !== undefined) {
                callbacks.press();
                startTimeMutable.current = os.clock();
            }

            const connection = RunService.Heartbeat.Connect((dt) => {
                if (callbacks.holdPerFrame !== undefined) {
                    callbacks.holdPerFrame(os.clock() - startTimeMutable.current, dt);
                }
            });

            return () => {
                connection.Disconnect();
            };
        } else {
            if (callbacks.release !== undefined) {
                callbacks.release(os.clock() - startTimeMutable.current);
            }
        }
    }, [isKeyPressed]);
}
