import { Make, Modify } from "@rbxts/altmake";
import { Players, Workspace } from "@rbxts/services";
import { SoundContext } from "type";

const NUM_CACHED_PARTS = 500;
const CACHE_CF = new CFrame(0, 10000, 0);
const SOUND_RANGE = 500;

const cachedPartsParent = Make("Folder", {
    Parent: Workspace,
    Name: "CachedSoundParts",
});

const usingPartsParent = Make("Folder", {
    Parent: Workspace,
    Name: "UsingSoundParts",
});

for (let i = 0; i < NUM_CACHED_PARTS; i++) {
    const part = Make("Part", {
        Name: `SoundPart_${i}`,
        Transparency: 1,
        CanCollide: false,
        Anchored: true,
        Locked: true,
        CFrame: CACHE_CF,
        Parent: cachedPartsParent,
    });

    const sound = Make("Sound", {
        Parent: part,
        Looped: false,
    });

    sound.Ended.Connect(() => {
        Modify(part, {
            Parent: cachedPartsParent,
            CFrame: CACHE_CF,
        });
    });
}

export function makeSound(cf: CFrame, context: SoundContext) {
    const playerCFrame = Players.LocalPlayer.Character?.GetPivot();
    if (!playerCFrame || playerCFrame.Position.sub(cf.Position).Magnitude > SOUND_RANGE) return;

    const cachedParts = cachedPartsParent.GetChildren();
    if (cachedParts.isEmpty()) {
        warn("Out of sound parts");
        return;
    }

    const part = cachedParts[0] as Part;
    Modify(part, { Parent: usingPartsParent, CFrame: cf });

    const sound = part.FindFirstChildWhichIsA("Sound")!;
    Modify(sound, {
        SoundId: context.soundId,
        Volume: context.volume,
        PlaybackSpeed: context.speed,
    });

    sound.Play();
}
