import { useContext } from "@rbxts/roact-hooked";
import { WContext } from "../contexts/world";

export default function useW() {
    return useContext(WContext).w;
}

export function useSetClientState() {
    return useContext(WContext).setClientState;
}
