import { EMPTY_SLOTS } from "shared/features/inventory/constants";
import { PlayerData, PlayerInventory, PlayerKeybinds } from "./types";

export const defaultPlayerKeybinds: PlayerKeybinds = {
    moveForward: "W",
    moveBackward: "S",
    moveLeft: "A",
    moveRight: "D",
    jump: "Space",
    sprintDash: "LeftShift",
    sneak: "C",

    toggleInventory: "E",
};

export const defaultPlayerInventory: PlayerInventory = {
    slots: EMPTY_SLOTS,
    items: {},
};

export const defaultPlayerData: PlayerData = {
    keybinds: defaultPlayerKeybinds,
    inventory: defaultPlayerInventory,
};
