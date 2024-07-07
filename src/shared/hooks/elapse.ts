import { useChange } from "@rbxts/matter-hooks";

export function useJustPassed(time: number, discriminator?: unknown) {
    return useChange([tick() >= time], discriminator) && tick() >= time;
}
