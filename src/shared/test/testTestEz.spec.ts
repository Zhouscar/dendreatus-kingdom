/// <reference types="@rbxts/testez/globals" />

export = (): void => {
    it("should make sure testez is working properly", () => {
        // Equality
        expect(1).to.equal(1);
        expect(1).never.to.equal(2);

        // Approximate equality
        expect(5).to.be.near(5 + 1e-8);
        expect(5).to.be.near(5 - 1e-8);
        expect(math.pi).never.to.be.near(3);

        // Optional limit parameter
        expect(math.pi).to.be.near(3, 0.2);

        // Nil checking
        expect(1).to.be.ok();
        expect(false).to.be.ok();
        expect(undefined).never.to.be.ok();

        // Function throwing
        expect(() => {
            error("nope");
        }).to.throw();

        expect(() => {
            error("nope");
        }).to.throw("nope");

        expect(() => {
            error("foo");
        }).never.to.throw("bar");
    });
};
