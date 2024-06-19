import { AnyEntity } from "@rbxts/matter";
import { useSelector } from "@rbxts/roact-reflex";
import { selectClientState, selectInteractEs, selectLocalPlrE } from "client/store/ecs";

export function useLocalPlrE() {
    const localPlrE = useSelector(selectLocalPlrE());
    return localPlrE !== undefined ? localPlrE : (-1 as AnyEntity);
}

export function useInteractEs() {
    return useSelector(selectInteractEs());
}

export function useClientState() {
    return useSelector(selectClientState());
}
