import { ReplicatedStorage } from "@rbxts/services";
import { Reporters, TestBootstrap } from "@rbxts/testez";

const testFolder = ReplicatedStorage.WaitForChild("shared").WaitForChild("test");

TestBootstrap.run([script.Parent!, testFolder], Reporters.TextReporter);
