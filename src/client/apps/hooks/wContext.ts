import { useContext } from "@rbxts/roact-hooked";
import { WContext } from "../contexts/world";

export function useW() {
    return useContext(WContext).w;
}

export function useLocalPlrE() {
    return useContext(WContext).localPlrE;
}
