# 👾 Project Hornet Discord Bot
- This was a simple project using JavaScript to send Garry's Mod server information to players on Discord
- This project used the [Discord.js](https://discord.js.org/) library
- This project was created to practice with JS and Discord.js 
## 💻 Server Query via Bot Status
- At regular intervals, the Discord bot will query the game server to obtain the number of players connected, if it is online 
- If the game server was offline, the bot status would turn to the red, do not disturb mode and display "Playing on offline mode"
- If the game server was online, the bot status would turn to the green, online mode and display "Playing with X players"
- If the game server was online, but the server was full, it would display the same text as online, but the bot status would change to the yellow, idle mode
## 💻 Server Query via Bot Command
- Members on the same server as the Discord bot could excute the status command to receive more information about the game server, which inludes:
  - Display name
  - Player count
  - Map name
  - Connection link
- The embedded message replied would turn yellow if the server was full, or red and display server offline if it was offline 
