import { ComponentCtor } from "@rbxts/matter/lib/component";
import { SoundName } from "shared/features/ids/sounds";
import { PlayerKeybinds } from "shared/store/players/types";

export type Material = Exclude<keyof typeof Enum.Material, "GetEnumItems">;
export type KeyCode = Exclude<keyof typeof Enum.KeyCode, "GetEnumItems">;
export type KeyName = keyof PlayerKeybinds;
export type SoundContext = {
    volume?: number;
    soundName: SoundName;
    speed?: number;
    timePosition?: number;
};

export type ComponentRecord<C extends ComponentCtor> = {
    new: ReturnType<C> | undefined;
    old: ReturnType<C> | undefined;
};
