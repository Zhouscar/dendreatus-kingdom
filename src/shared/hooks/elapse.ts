import { useChange } from "@rbxts/matter-hooks";

export function useJustPassed(time: number, discriminator?: unknown) {
    return useChange([os.clock() >= time], discriminator) && os.clock() >= time;
}
