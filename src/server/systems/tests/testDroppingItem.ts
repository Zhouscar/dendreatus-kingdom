import { useThrottle, World } from "@rbxts/matter";
import { Transform } from "shared/components";
import { DroppingItem, TestItemDropper } from "shared/components/items";
import { UP } from "shared/constants/direction";
import { ItemType } from "shared/features/items/types";

const ITEMS_TO_DROP: ItemType[] = ["crucifix_dagger"];

function testDroppingItem(w: World) {
    if (!useThrottle(5)) return;

    ITEMS_TO_DROP.forEach((itemType) => {
        print(itemType);
    });

    for (const [e, testItemDropper, transform] of w.query(TestItemDropper, Transform)) {
        ITEMS_TO_DROP.forEach((itemType) => {
            w.spawn(
                DroppingItem({
                    position: transform.cf.Position.add(UP.mul(2)),
                    impulse: new Vector3(
                        math.random(-10, 10),
                        math.random(10, 30),
                        math.random(-10, 10),
                    ),
                    item: itemType,
                }),
            );
        });
    }
}

export = testDroppingItem;
