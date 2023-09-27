import { Players, Workspace } from "@rbxts/services";
import { SoundContext } from "types";

const NUM_CACHED_PARTS = 500;
const CACHE_CF = new CFrame(0, 10000, 0);
const SOUND_RANGE = 500;

const cachedPartsParent = new Instance("Folder");
cachedPartsParent.Parent = Workspace;
cachedPartsParent.Name = "CachedSoundParts";

const usingPartsParent = new Instance("Folder");
usingPartsParent.Parent = Workspace;
usingPartsParent.Name = "UsingSoundParts";

for (let i = 0; i < NUM_CACHED_PARTS; i++) {
    const part = new Instance("Part");
    part.Name = `SoundPart_${i}`;
    part.Transparency = 1;
    part.CanCollide = false;
    part.Anchored = true;
    part.Locked = true;
    part.CFrame = CACHE_CF;
    part.Parent = cachedPartsParent;

    const sound = new Instance("Sound");
    sound.Parent = part;
    sound.Looped = false;

    sound.Ended.Connect(() => {
        part.Parent = cachedPartsParent;
        part.CFrame = CACHE_CF;
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
    part.Parent = usingPartsParent;
    part.CFrame = cf;

    const sound = part.FindFirstChildWhichIsA("Sound")!;
    sound.SoundId = context.soundId;
    sound.Volume = context.volume;
    sound.PlaybackSpeed = context.speed;

    sound.Play();
}
