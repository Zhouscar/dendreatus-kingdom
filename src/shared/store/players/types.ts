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
}

export interface PlayerInventory {
    readonly items: { [guid: string]: Item | undefined };
    readonly slots: PlayerInventorySlot[];
}
