import { Telegraf } from "telegraf";
import dotenv from "dotenv";

dotenv.config()

const bot = new Telegraf(process.env.TOKEN_BOT_TELEGRAM)
bot.start((ctx) => {
    console.log(ctx)
 ctx.reply("Welcome to the test bot")
})

bot.help((ctx) => {
 ctx.reply("You are in a test bot")
})
bot.command('random', (ctx) => {
    console.log(ctx.message.chat.id)
    ctx.reply(Math.floor(Math.random() * 101 ))
})

bot.launch() 