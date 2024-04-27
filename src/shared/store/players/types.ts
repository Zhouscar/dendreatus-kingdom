import { PlayerInventorySlot } from "shared/features/inventory/types";
import { Item } from "shared/features/items/types";
import { KeyCode } from "type";

export interface PlayerData {
    keybinds: PlayerKeybinds;
    inventory: PlayerInventory;
}

export interface PlayerKeybinds {
    readonly moveForward: KeyCode;
    readonly moveBackward: KeyCode;
    readonly moveLeft: KeyCode;
    readonly moveRight: KeyCode;
    readonly jump: KeyCode;
    readonly sprintDash: KeyCode;
    readonly sneak: KeyCode;

    readonly toggleInventory: KeyCode;

    readonly interact: KeyCode;

    readonly hotbar1: KeyCode;
    readonly hotbar2: KeyCode;
    readonly hotbar3: KeyCode;
    readonly hotbar4: KeyCode;
    readonly hotbar5: KeyCode;
    readonly hotbar6: KeyCode;
    readonly hotbar7: KeyCode;
    readonly hotbar8: KeyCode;
    readonly hotbar9: KeyCode;
    readonly hotbar10: KeyCode;
}

export interface PlayerInventory {
    readonly items: Map<string, Item>;
    readonly slots: PlayerInventorySlot[];
}
