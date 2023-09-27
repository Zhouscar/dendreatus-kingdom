import { PlayerData, PlayerKeybinds } from "./types";

export const defaultPlayerKeybinds: PlayerKeybinds = {
    moveForward: "W",
    moveBackward: "S",
    moveLeft: "A",
    moveRight: "D",
    jump: "Space",
    sprintDash: "LeftShift",
    sneak: "C",
};

export const defaultPlayerData: PlayerData = {
    keybinds: defaultPlayerKeybinds,
};
