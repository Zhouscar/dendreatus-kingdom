import { World, useDeltaTime } from "@rbxts/matter";
import { State } from "shared/state";

const ALPHA = 5;

function cameraShakeDecay(w: World, s: State) {
    s.cameraShake = math.max(0, s.cameraShake - useDeltaTime() * ALPHA);
}

export = cameraShakeDecay;
