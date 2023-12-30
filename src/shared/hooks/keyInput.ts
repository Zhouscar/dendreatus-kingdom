import { useEvent } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { localPlr } from "client/localPlr";
import { store } from "client/store";
import { defaultPlayerKeybinds, selectPlayerKeybinds } from "shared/store/players/keybinds";

import { PlayerKeybinds } from "shared/store/players/types";
import { KeyCode, KeyName } from "type";

const pressedKeyNames: Set<KeyName> = new Set();

let currentKeybinds: PlayerKeybinds = defaultPlayerKeybinds;

store.subscribe(selectPlayerKeybinds(localPlr), (keybinds) => {
    if (!keybinds) return;
    currentKeybinds = keybinds;
});

function getKeyName(keyCode: KeyCode) {
    return Sift.Dictionary.entries(currentKeybinds).reduce<KeyName | undefined>((accum, v) => {
        if (accum) return accum;
        if (v[1] !== keyCode) return;
        return v[0];
    }, undefined);
}

UserInputService.InputBegan.Connect((input, gPE) => {
    if (gPE) return;
    const keyName = getKeyName(input.KeyCode.Name);
    if (!keyName) return;
    pressedKeyNames.add(keyName);
});

UserInputService.InputChanged.Connect((input, gPE) => {
    const keyName = getKeyName(input.KeyCode.Name);
    if (!keyName) return;
    if (gPE) {
        pressedKeyNames.delete(keyName);
    } else {
        pressedKeyNames.add(keyName);
    }
});

UserInputService.InputEnded.Connect((input, gPE) => {
    if (gPE) return;
    const keyName = getKeyName(input.KeyCode.Name);
    if (!keyName) return;
    pressedKeyNames.delete(keyName);
});

export function getKeysJustPressed(): KeyName[] {
    const keysJustPressed: KeyName[] = [];
    for (const [, input, gPE] of useEvent(UserInputService, "InputBegan")) {
        if (gPE) continue;
        const keyName = getKeyName(input.KeyCode.Name);
        if (!keyName) continue;
        keysJustPressed.push(keyName);
    }
    return keysJustPressed;
}

export function getKeysJustReleased(): KeyName[] {
    const keysJustReleased: KeyName[] = [];
    for (const [, input, gPE] of useEvent(UserInputService, "InputEnded")) {
        if (gPE) continue;
        const keyName = getKeyName(input.KeyCode.Name);
        if (!keyName) continue;
        keysJustReleased.push(keyName);
    }
    return keysJustReleased;
}

export function isKeyDown(name: KeyName): boolean {
    return pressedKeyNames.has(name);
}

export function areKeysDown(...names: KeyName[]): boolean {
    return names.reduce((accum, name) => {
        if (!accum) return false;
        if (!isKeyDown(name)) return false;
        return true;
    }, true);
}
