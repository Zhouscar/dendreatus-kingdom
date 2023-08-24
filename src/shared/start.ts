import { AnyEntity, Debugger, Loop, System, World } from "@rbxts/matter";
import { Host } from "types";
import { State } from "./state";
import { Players, RunService, UserInputService } from "@rbxts/services";
import Plasma from "@rbxts/plasma";
import { Renderable } from "./components";

function authorize(_player: Player) {
    return RunService.IsStudio();
}

export function start(host: Host, systemContainers: Instance[], pluginContainers: Instance[]) {
    const state = new State();
    state.host = host;

    const w = new World();
    const debug = new Debugger(Plasma);
    debug.authorize = authorize;
    debug.findInstanceFromEntity = (e: AnyEntity): Instance | undefined => {
        if (!w.contains(e)) return;
        const model = w.get(e, Renderable);
        return model?.model;
    };

    const loop = new Loop(w, state, debug.getWidgets());

    function loadSystems(container: Instance): void {
        const systems: System<unknown[]>[] = [];
        container
            .GetDescendants()
            .filter((module): module is ModuleScript => classIs(module, "ModuleScript"))
            .forEach((module) => {
                if (module.Name.find(">")[0] === 1) return;

                if (module.Name.find("~")[0] === 1) {
                    warn(`System ${module.Name} has been skipped`);
                    return;
                }
                const [ok, system] = pcall(require, module);
                assert(ok, `Error loading system ${module.Name} from ${host}`);
                systems.push(system as System<unknown[]>);
            });
        loop.scheduleSystems(systems);
    }

    systemContainers.forEach(loadSystems);

    debug.autoInitialize(loop);

    loop.begin(
        host === "CLIENT"
            ? {
                  default: RunService.Heartbeat,
                  onRender: RunService.RenderStepped,
                  onPhysics: RunService.Stepped,
                  onTick: RunService.Heartbeat,
              }
            : {
                  default: RunService.Heartbeat,
                  onPhysics: RunService.Stepped,
                  onTick: RunService.Heartbeat,
              },
    );

    if (host === "CLIENT") {
        UserInputService.InputBegan.Connect((input) => {
            if (input.KeyCode === Enum.KeyCode.F4 && authorize(Players.LocalPlayer)) {
                debug.toggle();
                state.debugEnabled = debug.enabled;
            }
        });
    }

    function loadPlugins(container: Instance): void {
        type Plugin = (w: World, state: State) => void;
        container
            .GetDescendants()
            .filter((module): module is ModuleScript => module.IsA("ModuleScript"))
            .forEach((module) => {
                if (module.Name.find(">")[0] === 1) return;

                if (module.Name.find("~")[0] === 1) {
                    warn(`System ${module.Name} has been skipped`);
                    return;
                }
                const [ok, plugin] = pcall(require, module);
                assert(ok, `Error loading plugin ${module.Name} from ${host}`);
                (plugin as Plugin)(w, state);
            });
    }

    pluginContainers.forEach(loadPlugins);
}
