import { AnyEntity } from "@rbxts/matter";
import { useSelector } from "@rbxts/roact-reflex";
import { selectLocalPlrE } from "client/store/ecs";

export default function useLocalPlrE() {
    const localPlrE = useSelector(selectLocalPlrE());
    return localPlrE !== undefined ? localPlrE : (-1 as AnyEntity);
}
