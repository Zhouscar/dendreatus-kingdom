import { RunService } from "@rbxts/services";

export const STUDIO_SETTINGS = {
    immediateSpawn: false,
    clockFreeze: true,
};

export function isStudioSettingOn(setting: keyof typeof STUDIO_SETTINGS) {
    return RunService.IsStudio() && STUDIO_SETTINGS[setting];
}
