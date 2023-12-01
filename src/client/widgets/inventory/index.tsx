import Roact from "@rbxts/roact";
import { ReflexProvider, useSelector } from "@rbxts/roact-reflex";
import EntireScreen from "../components/entireScreen";
import { selectPlayerInventory } from "shared/reflex/selectors";
import { localPlr } from "client/localPlr";
import { store } from "client/store";
import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";
import { useEffect } from "@rbxts/roact-hooked";
import useSuperPosition from "../hooks/useSuperPosition";

function App(props: { enabled: boolean }) {
    const enabled = props.enabled;

    const [enabilityMotor, setEnabilityMotor] = useMotor(0);
    const inventory = useSelector(selectPlayerInventory(localPlr));
    const superPosition = useSuperPosition(enabilityMotor);

    useEffect(() => {
        setEnabilityMotor(new Spring(enabled ? 1 : 0));
    }, [enabled]);

    return <EntireScreen></EntireScreen>; // TODO:
}

function Inventory(props: { enabled: boolean }) {
    return (
        <ReflexProvider producer={store}>
            <App enabled={props.enabled}></App>
        </ReflexProvider>
    );
}

export = Inventory;
