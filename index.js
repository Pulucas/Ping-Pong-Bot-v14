import { Events, Client, GatewayIntentBits, OAuth2Scopes, PermissionFlagsBits } from "discord.js"
import { config } from "dotenv"
config({quiet: true})
const token = process.env.token

const bot_intents = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
const client = new Client({ intents: bot_intents })

client.once(Events.ClientReady, async () => {
  console.log("Ready!")
  console.log("Logged in as:", client.user.username)
  console.log("Invite:", client.generateInvite({ permissions: [PermissionFlagsBits.SendMessages], scopes: [OAuth2Scopes.Bot] }))
  console.log("Servers:", client.guilds.cache.map(server => server.name))
})

client.on(Events.MessageCreate, (message) => {
  if (message.content.toLowerCase() === "ping") {
    message.channel.send("Pong!")
  }
})

client.login(token)