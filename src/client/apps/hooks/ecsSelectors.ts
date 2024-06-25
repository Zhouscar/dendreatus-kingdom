import { AnyEntity } from "@rbxts/matter";
import { useSelector } from "@rbxts/roact-reflex";
import { selectClientState, selectInteractEs } from "client/store/ecs";
import { WContext } from "../contexts/world";
import { useContext } from "@rbxts/roact-hooked";

export function useInteractEs() {
    return useSelector(selectInteractEs());
}

export function useClientState() {
    return $tuple(useSelector(selectClientState()), useContext(WContext).setClientState);
}
