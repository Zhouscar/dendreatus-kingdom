import { AnyEntity, Debugger, Loop, System, World } from "@rbxts/matter";
import { State } from "./state";
import { Players, RunService, UserInputService } from "@rbxts/services";
import Plasma from "@rbxts/plasma";
import { Renderable } from "./components";
import Net from "@rbxts/yetanothernet";
import { _remoteToken, requestRemoteToken, routes } from "./network";
import { HOST } from "./host";

function authorize(_player: Player) {
    return RunService.IsStudio();
}

export function start(systemContainers: Instance[], pluginContainers: Instance[]) {
    const remoteToken: string =
        HOST === "CLIENT" ? requestRemoteToken.InvokeServer() : _remoteToken;
    assert(remoteToken !== "NA", "Remote Token is NA");

    const state = new State();

    const w = new World();
    const debug = new Debugger(Plasma);
    debug.authorize = authorize;
    debug.findInstanceFromEntity = (e: AnyEntity): Instance | undefined => {
        if (!w.contains(e)) return;
        const model = w.get(e, Renderable);
        return model?.pv;
    };

    const loop = new Loop(w, state, remoteToken, debug.getWidgets());

    Net.start(loop, routes);

    function loadSystems(container: Instance): void {
        const systems: System<unknown[]>[] = [];
        container
            .GetDescendants()
            .filter((module): module is ModuleScript => classIs(module, "ModuleScript"))
            .forEach((module) => {
                if (module.Name.find("~")[0] === 1) {
                    warn(`System ${module.Name} has been skipped`);
                    return;
                }
                const [ok, system] = pcall(require, module);
                assert(ok, `Error loading system ${module.Name} from ${HOST}`);
                systems.push(system as System<unknown[]>);
            });
        loop.scheduleSystems(systems);
    }

    systemContainers.forEach(loadSystems);

    debug.autoInitialize(loop);

    loop.begin(
        HOST === "CLIENT"
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

    if (HOST === "CLIENT") {
        UserInputService.InputBegan.Connect((input) => {
            if (input.KeyCode === Enum.KeyCode.F4 && authorize(Players.LocalPlayer)) {
                debug.toggle();
                state.debugEnabled = debug.enabled;
            }
        });
    }

    function loadPlugins(container: Instance): void {
        type Plugin = (w: World, state: State, remoteToken: string) => void;
        container
            .GetDescendants()
            .filter((module): module is ModuleScript => module.IsA("ModuleScript"))
            .forEach((module) => {
                if (module.Name.find("~")[0] === 1) {
                    warn(`System ${module.Name} has been skipped`);
                    return;
                }
                const [ok, plugin] = pcall(require, module);
                assert(ok, `Error loading plugin ${module.Name} from ${HOST}`);
                (plugin as Plugin)(w, state, remoteToken);
            });
    }

    pluginContainers.forEach(loadPlugins);
}
