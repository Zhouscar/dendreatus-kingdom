export class ViewVector {
    readonly look: number;
    readonly right: number;
    readonly up: number;

    constructor(look: number, right: number, up: number) {
        this.look = look;
        this.right = right;
        this.up = up;
    }
}
