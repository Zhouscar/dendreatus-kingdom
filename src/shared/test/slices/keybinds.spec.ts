/// <reference types="@rbxts/testez/globals" />

import { keybindsSlice } from "shared/store/players/keybinds";
import { defaultPlayerData } from "shared/store/players/playerDefaults";
import { PlayerKeybinds } from "shared/store/players/types";

export = (): void => {
    const getKeybinds = (): PlayerKeybinds => {
        return keybindsSlice.getState().__test__ as PlayerKeybinds;
    };

    beforeEach(() => {
        keybindsSlice.loadPlayerData("__test__", defaultPlayerData);
    });

    afterEach(() => {
        keybindsSlice.closePlayerData("__test__");
    });

    it("should load default keybinds", () => {
        expect(getKeybinds().moveForward).to.equal("W");
        expect(getKeybinds().moveBackward).to.equal("S");
        expect(getKeybinds().moveLeft).to.equal("A");
        expect(getKeybinds().moveRight).to.equal("D");
        expect(getKeybinds().jump).to.equal("Space");
    });

    // it("should be able to modify keybinds", () => {
    //     keybindsSlice.setKeybind("__test__", "moveForward", Enum.KeyCode.Space);
    //     expect(getKeybinds().moveForward).to.equal(Enum.KeyCode.Space);
    // });

    // it("should be able to reset keybinds", () => {
    //     keybindsSlice.setKeybind("__test__", "moveForward", Enum.KeyCode.Space);
    //     expect(getKeybinds().moveForward).to.equal(Enum.KeyCode.Space);

    //     keybindsSlice.resetKeybinds("__test__");
    //     expect(getKeybinds().moveForward).to.equal(Enum.KeyCode.W);
    // });

    // it("should get the overlapping keybinds", () => {
    //     const expectedBeforeOverlappingKeybinds: ReturnType<
    //         typeof getOverlappingKeybinds
    //     > = new Map();

    //     expect(
    //         Dictionary.equalsDeep(
    //             getOverlappingKeybinds(getKeybinds()),
    //             expectedBeforeOverlappingKeybinds,
    //         ),
    //     ).to.equal(true);

    //     keybindsSlice.setKeybind("__test__", "moveForward", Enum.KeyCode.Space);
    //     keybindsSlice.setKeybind(
    //         "__test__",
    //         "moveBackward",
    //         Enum.KeyCode.Space,
    //     );
    //     keybindsSlice.setKeybind("__test__", "moveLeft", Enum.KeyCode.At);
    //     keybindsSlice.setKeybind("__test__", "moveRight", Enum.KeyCode.At);

    //     const expectedAfterOverlappingKeybinds: typeof expectedBeforeOverlappingKeybinds =
    //         new Map();
    //     expectedAfterOverlappingKeybinds.set(Enum.KeyCode.Space, [
    //         "moveForward",
    //         "moveBackward",
    //     ]);
    //     expectedAfterOverlappingKeybinds.set(Enum.KeyCode.At, [
    //         "moveRight",
    //         "moveLeft",
    //     ]);

    //     expect(
    //         Dictionary.equalsDeep(
    //             getOverlappingKeybinds(getKeybinds()),
    //             expectedAfterOverlappingKeybinds,
    //         ),
    //     ).to.equal(true);
    // });

    // it("should check if action is an overlapping keybind", () => {
    //     expect(isOverlapping(getKeybinds(), "moveForward")).to.equal(false);
    //     expect(isOverlapping(getKeybinds(), "moveBackward")).to.equal(false);

    //     keybindsSlice.setKeybind("__test__", "moveForward", Enum.KeyCode.Space);
    //     keybindsSlice.setKeybind("__test__", "moveBackward", Enum.KeyCode.Space);

    //     expect(isOverlapping(getKeybinds(), "moveForward")).to.equal(true);
    //     expect(isOverlapping(getKeybinds(), "moveBackward")).to.equal(true);
    // });
};
