import { useContext } from "@rbxts/roact-hooked";
import { EnabilityContext } from "../contexts/enability";

export default function useEnabled() {
    return useContext(EnabilityContext).enabled;
}
