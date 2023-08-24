export function getLinearVelocity(part: BasePart, name: string): LinearVelocity {
    let linearVelocity = part.FindFirstChild(name) as LinearVelocity | undefined;
    if (linearVelocity === undefined) {
        linearVelocity = new Instance("LinearVelocity");
        linearVelocity.Name = name;
        linearVelocity.Attachment0 = getAttachment(part);
        linearVelocity.Parent = part;
    }
    return linearVelocity;
}

export function getAttachment(part: BasePart): Attachment {
    let attachment = part.FindFirstChildWhichIsA("Attachment");
    if (attachment === undefined) {
        attachment = new Instance("Attachment");
        attachment.Parent = part;
    }
    return attachment;
}
