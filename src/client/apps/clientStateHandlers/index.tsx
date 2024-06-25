import Roact from "@rbxts/roact";
import InventoryHandler from "./inventory";
import SpawningHandler from "./spawning";
import TitleHandler from "./title";
import DeathCameraHandler from "./death/camera";
import DeathHandler from "./death";

export default function ClientStateHandler(props: {}) {
    return (
        <screengui ResetOnSpawn={false} Key={"ClientStateHandler"}>
            <InventoryHandler />
            <SpawningHandler />
            <TitleHandler />
            <DeathHandler />
        </screengui>
    );
}
