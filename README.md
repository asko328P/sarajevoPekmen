# sarajevoPekmen

A small game inspired by the cult classic Pacman, set in Sarajevo. The player is able to use the real road network to
traverse the world, while the game fetches new roads on the fly. It uses actual map data provided and mantained by the OpenStreetMap community.

## Demo

https://github.com/user-attachments/assets/3a72e653-0c17-4799-b08b-6799608a3114

### Technologies Used

    react-native
    Expo
    react-native-skia
    react-native-game-engine
    Overpass Turbo 
    OpenStreetMap

### Installation

    Clone the repo
    install node modules using npm install
    run the project with npx expo run:ios

### Notes

At the moment the game is using the public Overpass turbo api. Be mindful that this game is sending out a query every
couple dozen seconds, this is somewhat spamming their servers.
A custom instance specially designed for this game is already planned with the goal of speeding up the response times as
well as not abusing free services.
