import { KeyCode } from "types";

export interface PlayerData {
    keybinds: PlayerKeybinds;
}

export interface PlayerKeybinds {
    readonly moveForward: KeyCode;
    readonly moveBackward: KeyCode;
    readonly moveLeft: KeyCode;
    readonly moveRight: KeyCode;
    readonly jump: KeyCode;
    readonly sprintDash: KeyCode;
}
