import { useChange } from "@rbxts/matter-hooks";
import gameTime from "./gameTime";

export function useJustPassed(time: number, discriminator?: unknown) {
    return useChange([gameTime() >= time], discriminator) && gameTime() >= time;
}
