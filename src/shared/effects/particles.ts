import { Make, Modify } from "@rbxts/altmake";
import { Players, Workspace } from "@rbxts/services";

const NUM_CACHED_EMITTERS = 1000;
const EMITTER_RANGE = 500;

const CACHE_CF = new CFrame(0, 10000, 0);

const cachedEmitterPartContainer = Make("Folder", {
    Parent: Workspace,
    Name: "CachedEmitterParts",
});

const usingEmitterPartContainer = Make("Folder", {
    Parent: Workspace,
    Name: "UsingEmitterParts",
});

for (let i = 0; i < NUM_CACHED_EMITTERS; i++) {
    const part = Make("Part", {
        Name: `EmitterPart_${i}`,
        Transparency: 1,
        CanCollide: false,
        Anchored: true,
        Locked: true,
        CFrame: CACHE_CF,
        Parent: cachedEmitterPartContainer,
        Children: [Make("ParticleEmitter")],
    });
}

export function emitParticle(
    cf: CFrame,
    duration: number,
    props: Partial<WritableInstanceProperties<ParticleEmitter>>,
) {
    const playerCFrame = Players.LocalPlayer.Character?.GetPivot();
    if (!playerCFrame || playerCFrame.Position.sub(cf.Position).Magnitude > EMITTER_RANGE) return;

    const cachedParts = cachedEmitterPartContainer.GetChildren();
    if (cachedParts.isEmpty()) {
        warn("Out of emitter parts");
        return;
    }

    const part = cachedParts[0] as Part;
    Modify(part, { Parent: usingEmitterPartContainer, CFrame: cf });

    const emitter = part.FindFirstChildWhichIsA("ParticleEmitter")!;
    Modify(emitter, props);

    task.delay(duration, () => {
        Modify(part, {
            Parent: cachedEmitterPartContainer,
            CFrame: CACHE_CF,
        });
    });
}
