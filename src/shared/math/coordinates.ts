export function getDirectionalVector3(
    cf: CFrame,
    direction: "up" | "down" | "forward" | "backward" | "left" | "right",
): Vector3 {
    if (direction === "up") {
        return cf.UpVector;
    } else if (direction === "down") {
        return cf.UpVector.mul(-1);
    } else if (direction === "forward") {
        return cf.LookVector;
    } else if (direction === "backward") {
        return cf.LookVector.mul(-1);
    } else if (direction === "left") {
        return cf.RightVector.mul(-1);
    } else if (direction === "right") {
        return cf.RightVector;
    }
    return Vector3.zero;
}
