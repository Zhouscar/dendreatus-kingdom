const gameSettings = UserSettings().GetService("UserGameSettings");

export default function useGameSettings() {
    return gameSettings;
}
