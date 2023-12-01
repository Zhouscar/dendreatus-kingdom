import { AnyEntity } from "@rbxts/matter";
import { CameraProps, defaultCameraProps } from "client/cameraHandler/cameraProps";
import { Host } from "type";

export type ClientState = "game" | "inventory";

export class State {
    debugEnabled: boolean = false;
    host: Host = "UNKNOWN";

    serverToClientEntityIdMap: Map<string, AnyEntity> = new Map();
    clientToServerEntityIdMap: Map<string, AnyEntity> = new Map();

    canOpenInventory: boolean = false;

    clientState: ClientState = "game";

    cameraProps: CameraProps = defaultCameraProps;

    bloodDrips: Set<[BasePart, Instance]> = new Set();
}
