import { ProducerMiddleware } from "@rbxts/reflex";

export default function getMiddlewares(parent: Instance) {
    const middlewares: ProducerMiddleware[] = [];
    parent
        .GetDescendants()
        .filter((child): child is ModuleScript => child.IsA("ModuleScript"))
        .forEach((module) => {
            if (module.Name.find("~")[0] === 1) {
                warn(`Middleware ${module.Name} has been skipped`);
                return;
            }

            const [ok, middleware] = pcall(require, module);
            assert(ok, `Error loading middleware ${module.Name} from ${parent}`);
            assert(
                typeIs(middleware, "function"),
                `Middleware ${module.Name} must be a ProducerMiddleware`,
            );

            middlewares.push(middleware);
        });
    return middlewares;
}
