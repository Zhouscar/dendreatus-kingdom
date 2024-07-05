import { useContext } from "@rbxts/roact-hooked";
import { WContext } from "../contexts/world";

export default function useW() {
    return useContext(WContext).w;
}

export function useS() {
    return useContext(WContext).s;
}

export function useRemoteToken() {
    return useContext(WContext).remoteToken;
}
