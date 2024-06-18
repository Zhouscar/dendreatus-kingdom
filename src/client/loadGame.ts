import { Make } from "@rbxts/altmake";
import {
    ContentProvider,
    Players,
    ReplicatedFirst,
    ReplicatedStorage,
    TweenService,
} from "@rbxts/services";
import { assetIds as ASSET_IDS } from "shared/assetIds";

export default function loadGame() {
    ReplicatedFirst.RemoveDefaultLoadingScreen();

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
    ContentProvider.PreloadAsync([ReplicatedStorage, ...ASSET_IDS], () => {
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
