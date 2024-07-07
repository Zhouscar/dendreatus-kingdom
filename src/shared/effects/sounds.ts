import { Make, Modify } from "@rbxts/altmake";
import { GuiService, Players, SoundService, Workspace } from "@rbxts/services";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { SoundContext } from "type";

const NUM_CACHED_WORLD_SOUND_PARTS = 500;
const NUM_CACHED_SOUNDS = 100;
const CACHE_CF = new CFrame(0, 10000, 0);
const SOUND_RANGE = 500;

const cachedSoundContainer = Make("Folder", {
    Parent: SoundService,
    Name: "CachedSounds",
});

const usingSoundContainer = Make("Folder", {
    Parent: SoundService,
    Name: "UsingSounds",
});

const loopedSoundContainer = Make("Folder", {
    Parent: SoundService,
    Name: "LoopedSounds",
});

const cachedWorldSoundPartsContainer = Make("Folder", {
    Parent: Workspace,
    Name: "CachedWorldSoundParts",
});

const usingWorldSoundPartsContainer = Make("Folder", {
    Parent: Workspace,
    Name: "UsingWorldSoundParts",
});

for (let i = 0; i < NUM_CACHED_WORLD_SOUND_PARTS; i++) {
    const part = Make("Part", {
        Name: `SoundPart_${i}`,
        Transparency: 1,
        CanCollide: false,
        Anchored: true,
        Locked: true,
        CFrame: CACHE_CF,
        Parent: cachedWorldSoundPartsContainer,
    });

    const partSound = Make("Sound", {
        Parent: part,
        Looped: false,
    });

    partSound.Ended.Connect(() => {
        Modify(part, {
            Parent: cachedWorldSoundPartsContainer,
            CFrame: CACHE_CF,
        });
    });
}

for (let i = 0; i < NUM_CACHED_SOUNDS; i++) {
    const sound = Make("Sound", {
        Parent: cachedSoundContainer,
        Looped: false,
    });

    sound.Ended.Connect(() => {
        sound.Parent = cachedSoundContainer;
    });
}

export function loopSound(context: SoundContext) {
    let sound = loopedSoundContainer.FindFirstChild(context.soundName) as Sound | undefined;
    if (sound === undefined) {
        sound = Make("Sound", {
            Name: context.soundName,
            Parent: loopedSoundContainer,
            SoundId: SOUND_IDS[context.soundName],

            Looped: true,
            Playing: true,
        });
    }

    Modify(sound, {
        Volume: context.volume,
        PlaybackSpeed: context.speed,
    });
}

export function playSound(context: SoundContext) {
    const cachedSounds = cachedSoundContainer.GetChildren();
    if (cachedSounds.isEmpty()) {
        warn("Out of sounds");
        return;
    }

    const sound = cachedSounds[0] as Sound;
    sound.Parent = usingSoundContainer;

    Modify(sound, {
        SoundId: SOUND_IDS[context.soundName],
        Volume: context.volume,
        PlaybackSpeed: context.speed,
        TimePosition: context.timePosition,
    });

    sound.Play();
}

export function makeSoundInWorld(cf: CFrame, context: SoundContext) {
    const playerCFrame = Players.LocalPlayer.Character?.GetPivot();
    if (!playerCFrame || playerCFrame.Position.sub(cf.Position).Magnitude > SOUND_RANGE) return;

    const cachedParts = cachedWorldSoundPartsContainer.GetChildren();
    if (cachedParts.isEmpty()) {
        warn("Out of sound parts");
        return;
    }

    const part = cachedParts[0] as Part;
    Modify(part, { Parent: usingWorldSoundPartsContainer, CFrame: cf });

    const sound = part.FindFirstChildWhichIsA("Sound")!;
    Modify(sound, {
        SoundId: SOUND_IDS[context.soundName],
        Volume: context.volume,
        PlaybackSpeed: context.speed,
        TimePosition: context.timePosition,
        Looped: false,
    });

    sound.Play();
}
