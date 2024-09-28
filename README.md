# sarajevoPekmen

A small game inspired by the cult classic Pacman. Set in Sarajevo in front of the
famous [Vijećnica](https://en.wikipedia.org/wiki/Vije%C4%87nica) The player is able to
use the real road network to
traverse the world, while the game fetches new roads on the fly. It uses actual map data provided and maintained by the
OpenStreetMap community.

## Demo

https://github.com/user-attachments/assets/3a72e653-0c17-4799-b08b-6799608a3114

### Technologies Used

    react-native
    Expo
    react-native-skia
    react-native-game-engine
    Overpass Turbo 
    OpenStreetMap

## How it works:

The game is built with a specific design paradigm in mind,
the [Entity Component System](https://en.wikipedia.org/wiki/Entity_component_system) architectural pattern.
As the name suggests, it is composed of multiple parts:

- Entities - player or map entities,
- Components - the specific components which contruct an entity, such as position or speed
- Systems - the logic which will, for example, calculate the next position of the player entity taking the position,
  desired angle or connected nodes into consideration

### What we see:

The game will query the specific road types around the player's coordinates. That data it will then be modified using
the Mercator projection formula. The road geometry will then be assigned coordinates in relation to the player entities
position,
so that it can be painted on screen.
The map entities will be painted on a Skia canvas.

### How it moves:

The movement is handled by two systems, the PlayerControl and the MovePlayer system. The first is tasked with capturing
the human's touch input and setting the desired movement angle.
The MovePlayer system will move the player entity along the roads and when it is approaching a point which has more than
3 connections,
it will pick the road which is closer to the desired movement angle.

### How it fetches data:

When the game loads, the road data will be queried using
the [Overpass Api](https://wiki.openstreetmap.org/wiki/Overpass_API). The query is set up to only look for specific
road types,
because certain roads such as footpaths aren't required.
When the player moves a certain distance away from the original point, it will query the data around the current new
position,
without any pausing or annoying loading times.

### Installation

    Clone the repo
    install node modules using npm install
    run the project with npx expo run:ios

### Notes

At the moment the game is using the public Overpass turbo api. Be mindful that this game is sending out a query every
couple dozen seconds, this is somewhat spamming their servers.
A custom instance specially designed for this game is already planned with the goal of speeding up the response times as
well as not abusing free services.
