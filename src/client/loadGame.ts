import { Make } from "@rbxts/altmake";
import { ContentProvider, Players, ReplicatedFirst, TweenService } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { ANIM_IDS } from "shared/features/ids/animations";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { ITEM_CONSUMABLE_CONTEXT } from "shared/features/items/consumables";

export default function loadGame() {
    ReplicatedFirst.RemoveDefaultLoadingScreen();

    const contentIds: (string | Instance)[] = [];

    contentIds.push(game);

    Sift.Dictionary.values(ANIM_IDS).forEach((id) => {
        contentIds.push(id);
    });

    Sift.Dictionary.values(SOUND_IDS).forEach((id) => {
        contentIds.push(id);
    });

    ITEM_ATTACKABLE_CONTEXTS.forEach((context) => {
        context.stepAnimationIds.forEach((id) => {
            contentIds.push(id);
        });
    });

    ITEM_CONSUMABLE_CONTEXT.forEach((context) => {
        context.stageAnimationIds.forEach((id) => {
            contentIds.push(id);
        });
    });

    ITEM_CONTEXTS.forEach((context) => {
        contentIds.push(context.image);
    });

    const screen = Make("ScreenGui", {
        Name: "LoadingScreen",
        Parent: Players.LocalPlayer.PlayerGui,
        ResetOnSpawn: false,
    });

    const frame = Make("Frame", {
        Name: "BlackScreen",

        Position: new UDim2(0.5, 0, 0.5, 0),
        AnchorPoint: new Vector2(0.5, 0.5),
        Size: new UDim2(5, 0, 5, 0),

        BackgroundColor3: Color3.fromRGB(0, 0, 0),
        BackgroundTransparency: 0,

        Parent: screen,
    });

    const text = Make("TextLabel", {
        Name: "LoadingNumber",

        Position: new UDim2(0.5, 0, 0.5, 0),
        AnchorPoint: new Vector2(0.5, 0.5),
        Size: new UDim2(1, 0, 1, 0),

        BackgroundTransparency: 1,
        TextStrokeTransparency: 1,

        TextXAlignment: Enum.TextXAlignment.Center,
        TextYAlignment: Enum.TextYAlignment.Center,

        TextColor3: Color3.fromRGB(100, 100, 100),
        TextSize: 20,
        Font: Enum.Font.Code,

        Text: "",
        Parent: frame,
    });

    let i = 0;
    ContentProvider.PreloadAsync([...contentIds], () => {
        text.Text = tostring(++i);
    });

    const tweenInfo = new TweenInfo(1, Enum.EasingStyle.Sine);
    const tweenGoal = { BackgroundTransparency: 1 };
    const tween = TweenService.Create(frame, tweenInfo, tweenGoal);

    task.delay(0.2, () => {
        tween.Play();
    });

    text.TextTransparency = 1;
    tween.Completed.Once(() => {
        screen.Destroy();
    });
}
