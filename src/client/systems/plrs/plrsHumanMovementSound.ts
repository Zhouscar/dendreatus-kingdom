import { Make } from "@rbxts/altmake";
import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Human, Renderable } from "shared/components";
import {
    IsDirectionallyMoving,
    OnLand,
    PotentialDirectionalMovement,
} from "shared/components/movements";
import { SOUND_IDS, SoundName } from "shared/features/ids/sounds";
import { MATERIAL_CATEGORIES, PLACEHOLDER_CATERORY } from "shared/features/materials/constants";
import { ANIM_ALPHAS } from "shared/features/movements/animAlphas";
import { hasComponents } from "shared/hooks/components";

function findSound(pv: PVInstance) {
    if (!pv.IsA("Model") || pv.PrimaryPart === undefined) return undefined;
    return (
        (pv.PrimaryPart.FindFirstChild("MovingSound") as Sound | undefined) ??
        Make("Sound", {
            Parent: pv.PrimaryPart,
            Name: "MovingSound",
            Playing: false,
            Looped: true,
        })
    );
}

function plrHumanMovementSound(w: World) {
    for (const [e, human, renderable, potentialDirectionalMovement] of w.query(
        Human,
        Renderable,
        PotentialDirectionalMovement,
    )) {
        const playSound = hasComponents(w, e, OnLand, IsDirectionallyMoving);
        if (renderable.pv === undefined) return;
        if (playSound) {
            const rawTrackLength = w.get(e, IsDirectionallyMoving)!.animTrackRawLength;
            const walkSpeed = human.humanoid.WalkSpeed;
            const trackLength =
                rawTrackLength / (walkSpeed * ANIM_ALPHAS[potentialDirectionalMovement.type]);

            const sound = findSound(renderable.pv);
            if (sound !== undefined) {
                const floorCategory =
                    MATERIAL_CATEGORIES.get(human.humanoid.FloorMaterial.Name) ??
                    PLACEHOLDER_CATERORY;

                if (useChange([floorCategory], e)) {
                    sound.TimePosition = 0;
                }

                const soundName: SoundName =
                    floorCategory === "grass"
                        ? "footStepGrass"
                        : floorCategory === "mud"
                          ? "footStepMud"
                          : floorCategory === "stone"
                            ? "footStepStone"
                            : floorCategory === "wood"
                              ? "footStepWood"
                              : "footStepStone";

                const soundId = SOUND_IDS[soundName];

                sound.SoundId = soundId;
                sound.Playing = true;

                const stepsInAnim = 2;
                const stepsInSound =
                    soundName === "footStepGrass"
                        ? 8
                        : soundName === "footStepMud"
                          ? 18
                          : soundName === "footStepWood"
                            ? 14
                            : soundName === "footStepStone"
                              ? 12
                              : 0;

                const adjustedSoundLength = (trackLength / stepsInAnim) * stepsInSound;
                sound.PlaybackSpeed = sound.TimeLength / adjustedSoundLength;
            }
        } else {
            const sound = findSound(renderable.pv);
            if (sound !== undefined) {
                sound.TimePosition = 0;
                sound.Playing = false;
            }
        }
    }
}

export = { system: plrHumanMovementSound, event: "onPhysics" };
