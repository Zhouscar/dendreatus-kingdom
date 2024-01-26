import { Make } from "@rbxts/altmake";

export const getCustomLinearVelocity = (part: BasePart, name: string): LinearVelocity =>
    (part.FindFirstChild(name) as LinearVelocity | undefined) ||
    Make("LinearVelocity", {
        Name: name,
        Attachment0: getAttachment(part),
        Parent: part,
        MaxForce: math.huge,
        RelativeTo: Enum.ActuatorRelativeTo.Attachment0,
        VelocityConstraintMode: Enum.VelocityConstraintMode.Vector,
    });

export const getAttachment = (part: BasePart): Attachment =>
    part.FindFirstChildWhichIsA("Attachment") || Make("Attachment", { Parent: part });
