local Players = game:GetService("Players")

local playerModule = require(Players.LocalPlayer.PlayerScripts:WaitForChild("PlayerModule"))
local playerControls = playerModule:GetControls()

local function disableDefaultControls()
    playerControls:Disable();
end

return disableDefaultControls