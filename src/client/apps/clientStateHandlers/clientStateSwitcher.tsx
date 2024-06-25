import Roact from "@rbxts/roact";
import useKeybindPress from "../hooks/useKeybindPress";
import { useEffect } from "@rbxts/roact-hooked";
import { useClientState } from "../hooks/ecsSelectors";
import { useLocalPlrE } from "../hooks/wContext";
import useComponent from "../hooks/useComponent";
import { Damage } from "shared/components/health";

export default function ClientStateSwitcher(props: {}) {
    const isInventoryKeyPressed = useKeybindPress("toggleInventory");
    const [clientState, setClientState] = useClientState();

    const localPlrE = useLocalPlrE();
    const damage = useComponent(localPlrE, Damage);

    useEffect(() => {
        if (!damage || clientState !== "inventory") return;
        setClientState("game");
    }, [damage]);

    useEffect(() => {
        if (!isInventoryKeyPressed) return;
        if (clientState === "inventory") {
            setClientState("game");
        } else if (clientState === "game") {
            setClientState("inventory");
        }
    }, [isInventoryKeyPressed]);
    return <></>;
}
