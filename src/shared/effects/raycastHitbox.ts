import { Make } from "@rbxts/altmake";
import { AnyEntity, World, useDeltaTime } from "@rbxts/matter";
import { Debris, Workspace } from "@rbxts/services";
import { findInstanceE } from "shared/calculations/findEntity";
import { Renderable } from "shared/components";

const VISUALIZE = true;

const storage: Map<BasePart, Caster> = new Map();

const NONE = "";
type NONE = typeof NONE;

export type RaycastHixboxCallback = (entities: Set<AnyEntity>, parts: Set<BasePart>) => void;
export type CustomRayCastParams = {
    hostE?: AnyEntity;
};

const ATTACHMENT_NAME = "CASTER_ATTACHMENT";

export const raycastVisualizePartsContainer = Make("Folder", {
    Name: "RaycastVisualizeParts",
    Parent: Workspace,
});

export function cut(part: BasePart) {
    const caster = storage.get(part);
    if (caster) {
        caster.cut();
    }
}

export function cast(
    w: World,
    part: BasePart,
    autoCut: number | false,
    customParams: CustomRayCastParams,
    callback: RaycastHixboxCallback,
) {
    let caster = storage.get(part);
    if (!caster) {
        caster = new Caster(part);
        storage.set(part, caster);
    }

    return caster.cast(w, autoCut, customParams, callback);
}

function raycastVisualize(from: Vector3, to: Vector3) {
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
    part: BasePart;
    attachmentPreviousPositions: Map<Attachment, Vector3 | NONE>;
    lastUpdateTime = -1;

    cut() {
        this.attachmentPreviousPositions.forEach((_, attachment) => {
            this.attachmentPreviousPositions.set(attachment, NONE);
        });
        this.lastUpdateTime = os.clock();
    }

    step() {
        this.attachmentPreviousPositions.forEach((_, attachment) => {
            this.attachmentPreviousPositions.set(attachment, attachment.WorldPosition);
        });
        this.lastUpdateTime = os.clock();
    }

    cast(
        w: World,
        autoCut: number | false,
        customParams: CustomRayCastParams,
        callback: RaycastHixboxCallback,
    ) {
        const parts: Set<BasePart> = new Set();
        const entities: Set<AnyEntity> = new Set();

        if (autoCut !== false && os.clock() - this.lastUpdateTime - useDeltaTime() >= autoCut) {
            this.cut();
        }

        const params = new RaycastParams();
        params.FilterType = Enum.RaycastFilterType.Exclude;
        params.AddToFilter(raycastVisualizePartsContainer);

        if (customParams.hostE !== undefined) {
            const hostModel = w.get(customParams.hostE, Renderable)?.model;
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

            if (VISUALIZE) {
                raycastVisualize(from, to);
            }
        });

        this.step();

        callback(entities, parts);
    }

    constructor(part: BasePart) {
        this.part = part;
        this.attachmentPreviousPositions = new Map();

        part.GetChildren()
            .filter(
                (child): child is Attachment =>
                    child.IsA("Attachment") && child.Name === ATTACHMENT_NAME,
            )
            .forEach((attachment) => {
                this.attachmentPreviousPositions.set(attachment, NONE);
            });
    }
}
