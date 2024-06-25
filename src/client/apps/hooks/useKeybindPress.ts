import { useKeyPress } from "@rbxts/pretty-roact-hooks";
import { useMemo } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-reflex";
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
