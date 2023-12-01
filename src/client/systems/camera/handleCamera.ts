import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Roact from "@rbxts/roact";
import { Workspace } from "@rbxts/services";
import Sift from "@rbxts/sift";
import CameraHandler from "client/cameraHandler";
import { defaultCameraProps } from "client/cameraHandler/cameraProps";
import { State } from "shared/state";

const e = Roact.createElement;

const tree = Roact.mount(e(CameraHandler, defaultCameraProps), Workspace);

function handleCamera(w: World, s: State) {
    if (!useChange(Sift.Dictionary.values(s.cameraProps))) return;

    Roact.update(tree, e(CameraHandler, s.cameraProps));
}

export = handleCamera;
