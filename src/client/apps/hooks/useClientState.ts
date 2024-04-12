import { useSelector } from "@rbxts/roact-reflex";
import { selectClientState } from "client/store/ecs";

export default function useClientState() {
    return useSelector(selectClientState());
}
