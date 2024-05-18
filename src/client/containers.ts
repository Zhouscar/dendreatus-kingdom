import { Make } from "@rbxts/altmake";
import { Players, Workspace } from "@rbxts/services";

export const bloodContainer = Make("Folder", {
    Name: "BloodContainer",
    Parent: Workspace,
});

export const dropItemContainer = Make("Folder", {
    Name: "DropItemContainer",
    Parent: Workspace,
});

export const raycastVisualizePartsContainer = Make("Folder", {
    Name: "RaycastVisualizeParts",
    Parent: Workspace,
});
