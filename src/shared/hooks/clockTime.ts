import { isStudioSettingOn } from "shared/studioSettings";
import gameTime from "./gameTime";

const DAY_NIGHT_CYCLE_LENGTH_MINUTES = isStudioSettingOn("fastClock") ? 0.2 : 24;

export function getClockTime() {
    if (isStudioSettingOn("clockFreeze")) {
        return 8;
    }
    return (((gameTime() / DAY_NIGHT_CYCLE_LENGTH_MINUTES) * 24) / 60) % 24;
}
