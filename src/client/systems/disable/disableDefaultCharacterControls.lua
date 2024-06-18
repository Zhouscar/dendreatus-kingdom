local Players = game:GetService("Players")

local playerModule = require(Players.LocalPlayer.PlayerScripts:WaitForChild("PlayerModule"))
local playerControls = playerModule:GetControls()


local once = false

local function disableDefaultControls()
    if once then return end

    playerControls:Disable();
    once = true
end

return disableDefaultControls