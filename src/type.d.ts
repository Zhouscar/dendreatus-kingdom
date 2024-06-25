import { ComponentCtor } from "@rbxts/matter/lib/component";
import { SoundName } from "shared/features/ids/sounds";
import { PlayerKeybinds } from "shared/store/players/types";

export type KeyCode = Exclude<keyof typeof Enum.KeyCode, "GetEnumItems">;
export type KeyName = keyof PlayerKeybinds;
export type SoundContext = {
    soundName: SoundName;
    volume?: number;
    speed?: number;
    timePosition?: number;
};

export type ComponentRecord<C extends ComponentCtor> = {
    new: ReturnType<C> | undefined;
    old: ReturnType<C> | undefined;
};
