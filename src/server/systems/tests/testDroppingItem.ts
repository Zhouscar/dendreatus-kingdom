import { useThrottle, World } from "@rbxts/matter";
import { Transform } from "shared/components";
import { DroppingItem, TestItemDropper } from "shared/components/items";
import { UP } from "shared/constants/direction";

function testDroppingItem(w: World) {
    if (!useThrottle(2)) return;

    for (const [e, testItemDropper, transform] of w.query(TestItemDropper, Transform)) {
        w.spawn(
            DroppingItem({
                position: transform.cf.Position.add(UP.mul(2)),
                impulse: new Vector3(math.random(-20, 20), 30, math.random(-20, 20)),
                item: "mushroom_soup",
            }),
        );
    }
}

export = testDroppingItem;
