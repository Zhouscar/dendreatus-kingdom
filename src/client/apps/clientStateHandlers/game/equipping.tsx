import { useState } from "@rbxts/plasma/src/Runtime";
import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-reflex";
import { Players } from "@rbxts/services";
import { useEnabledMutable } from "client/apps/hooks/enability";
import useComponent from "client/apps/hooks/useComponent";
import { useKeybindPressEffect } from "client/apps/hooks/useKeybindPress";
import { useLocalPlrE, useW } from "client/apps/hooks/wContext";
import { theLocalPlr } from "client/localPlr";
import { Human } from "shared/components";
import { Dead } from "shared/components/health";
import { Equipping } from "shared/components/items";
import { selectPlayerInventory } from "shared/store/players/inventory";

function useHotBarKeybinds(
    indexEquipped: number | undefined,
    setIndexEquipped: (index: number | undefined) => void,
) {
    const enabledMutable = useEnabledMutable();

    useKeybindPressEffect("hotbar1", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 0 ? 0 : undefined);
        },
    });
    useKeybindPressEffect("hotbar2", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 1 ? 1 : undefined);
        },
    });
    useKeybindPressEffect("hotbar3", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 2 ? 2 : undefined);
        },
    });
    useKeybindPressEffect("hotbar4", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 3 ? 3 : undefined);
        },
    });
    useKeybindPressEffect("hotbar5", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 4 ? 4 : undefined);
        },
    });
    useKeybindPressEffect("hotbar6", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 5 ? 5 : undefined);
        },
    });
    useKeybindPressEffect("hotbar7", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 6 ? 6 : undefined);
        },
    });
    useKeybindPressEffect("hotbar8", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 7 ? 7 : undefined);
        },
    });
    useKeybindPressEffect("hotbar9", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 8 ? 8 : undefined);
        },
    });
    useKeybindPressEffect("hotbar10", {
        press: () => {
            if (!enabledMutable.current) return;
            setIndexEquipped(indexEquipped !== 9 ? 9 : undefined);
        },
    });
}

export default function EquippingHandler(props: {}) {
    const [indexEquipped, setIndexEquipped] = useState<number | undefined>(undefined);

    const inventory = useSelector(selectPlayerInventory(theLocalPlr));

    const w = useW();
    const localPlrE = useLocalPlrE();
    const equipping = useComponent(localPlrE, Equipping);
    const human = useComponent(localPlrE, Human);
    const dead = useComponent(localPlrE, Dead);

    useHotBarKeybinds(indexEquipped, setIndexEquipped);

    useEffect(() => {
        if (localPlrE === undefined || human === undefined || dead === undefined) return;

        w.remove(localPlrE, Equipping);
    }, [localPlrE, human, dead]);

    useEffect(() => {
        if (localPlrE === undefined || human === undefined) return;

        const guid = equipping?.itemGuid;

        if (guid === undefined) {
            human.humanoid.UnequipTools();
            return;
        }

        const tool = Players.LocalPlayer.Backpack.FindFirstChild(guid);
        if (tool === undefined || !tool.IsA("Tool")) return;

        human.humanoid.EquipTool(tool);
    }, [w, localPlrE, equipping]);

    useEffect(() => {
        if (localPlrE === undefined) return;

        if (
            indexEquipped === undefined ||
            inventory === undefined ||
            inventory.slots[indexEquipped].itemGuid === undefined
        ) {
            w.remove(localPlrE, Equipping);
        } else {
            const guid = inventory.slots[indexEquipped].itemGuid!;

            w.insert(localPlrE, Equipping({ itemGuid: guid }));
        }
    }, [w, localPlrE, indexEquipped, inventory]);

    return <></>;
}
