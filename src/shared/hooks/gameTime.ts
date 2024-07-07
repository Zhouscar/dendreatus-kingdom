import { Workspace } from "@rbxts/services";

export default function gameTime() {
    return Workspace.GetServerTimeNow();
}
