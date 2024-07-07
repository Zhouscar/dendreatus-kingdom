import { Make } from "@rbxts/altmake";
import { AnyEntity, World, useDeltaTime } from "@rbxts/matter";
import { Debris, Workspace } from "@rbxts/services";
import { raycastVisualizePartsContainer } from "client/containers";
import { findInstanceE } from "shared/calculations/findEntity";
import { Renderable } from "shared/components";
import gameTime from "shared/hooks/gameTime";
import { isStudioSettingOn } from "shared/studioSettings";

const storage: Map<Instance, Caster> = new Map();

const NONE = "";
type NONE = typeof NONE;

export type RaycastHixboxCallback = (entities: Set<AnyEntity>, parts: Set<BasePart>) => void;
export type CustomRayCastParams = {
    hostE?: AnyEntity;
};

const ATTACHMENT_NAME = "CASTER_ATTACHMENT";

export function cut(part: BasePart) {
    const caster = storage.get(part);
    if (caster) {
        caster.cut();
    }
}

export function cast(
    w: World,
    instance: Instance,
    autoCut: number | false,
    customParams: CustomRayCastParams,
    callback: RaycastHixboxCallback,
) {
    let caster = storage.get(instance);
    if (!caster) {
        caster = new Caster(instance);
        storage.set(instance, caster);
    }

    return caster.cast(w, autoCut, customParams, callback);
}

export function visualize(from: Vector3, to: Vector3) {
    const distance = from.sub(to).Magnitude;
    const p = Make("Part", {
        Anchored: true,
        CanCollide: false,
        Size: new Vector3(0.05, 0.05, distance),
        CFrame: CFrame.lookAt(from, to).mul(new CFrame(0, 0, -distance / 2)),

        Parent: raycastVisualizePartsContainer,

        Material: Enum.Material.Neon,
        Color: Color3.fromRGB(255, 0, 0),
    });

    Debris.AddItem(p, 1);
}

class Caster {
    part: Instance;
    attachmentPreviousPositions: Map<Attachment, Vector3 | NONE>;
    lastUpdateTime = -1;

    cut() {
        this.attachmentPreviousPositions.forEach((_, attachment) => {
            this.attachmentPreviousPositions.set(attachment, NONE);
        });
        this.lastUpdateTime = gameTime();
    }

    step() {
        this.attachmentPreviousPositions.forEach((_, attachment) => {
            this.attachmentPreviousPositions.set(attachment, attachment.WorldPosition);
        });
        this.lastUpdateTime = gameTime();
    }

    cast(
        w: World,
        autoCut: number | false,
        customParams: CustomRayCastParams,
        callback: RaycastHixboxCallback,
    ) {
        const parts: Set<BasePart> = new Set();
        const entities: Set<AnyEntity> = new Set();

        if (autoCut !== false && gameTime() - this.lastUpdateTime - useDeltaTime() >= autoCut) {
            this.cut();
        }

        const params = new RaycastParams();
        params.FilterType = Enum.RaycastFilterType.Exclude;
        params.AddToFilter(raycastVisualizePartsContainer);

        if (customParams.hostE !== undefined) {
            const hostModel = w.get(customParams.hostE, Renderable)?.pv;
            if (hostModel) {
                params.AddToFilter(hostModel);
            }
        }

        this.attachmentPreviousPositions.forEach((prevPosition, attachment) => {
            const from = prevPosition;
            const to = attachment.WorldPosition;

            if (from === NONE) return;

            const result = Workspace.Raycast(from, to.sub(from), params);

            if (result) {
                parts.add(result.Instance);
                const e = findInstanceE(w, result.Instance);
                if (e !== undefined && e !== customParams.hostE) {
                    entities.add(e);
                }
            }

            if (isStudioSettingOn("raycastVisualize")) {
                visualize(from, to);
            }
        });

        this.step();

        callback(entities, parts);
    }

    constructor(instance: Instance) {
        this.part = instance;
        this.attachmentPreviousPositions = new Map();

        instance
            .GetDescendants()
            .filter(
                (child): child is Attachment =>
                    child.IsA("Attachment") && child.Name === ATTACHMENT_NAME,
            )
            .forEach((attachment) => {
                this.attachmentPreviousPositions.set(attachment, NONE);
            });
    }
}
