import { AnyEntity } from "@rbxts/matter";
import variantModule, { TypeNames, VariantOf, fields } from "@rbxts/variant";
import { Host } from "types";

export const CameraState = variantModule({
    follow: fields<{ target?: BasePart }>(),
    // cutscene
});

export type CameraState<T extends TypeNames<typeof CameraState> = undefined> = VariantOf<
    typeof CameraState,
    T
>;

export class State {
    debugEnabled: boolean = false;
    host: Host = "UNKNOWN";

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    cameraState: CameraState = CameraState.follow({});
    cameraFollowOffset: Vector3 = new Vector3(0, 0, 0);

    cameraShake: number = 0;

    bloodDrips: Set<[BasePart, Instance]> = new Set();
}
