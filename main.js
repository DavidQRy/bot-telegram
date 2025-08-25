import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import fs from 'fs'
import axios from "axios";

const downloandImage = (url, image_path, ctx) => 
    axios({url, responseType: 'stream'}).then(
        (response) => 
            new Promise((resolve, reject) =>{
                response.data
                .pipe(fs.createWriteStream(image_path))
                .on("finish", () => {
                    ctx.reply('photo save');
                    resolve()
                }).on('error', (e) => {
                    ctx.reply('The photo could not be saved')
                    reject(e)
                })
            })
    )

dotenv.config()

function randomNumber(number) {
 return Math.floor(Math.random() * (number + 1)) 
}

const bot = new Telegraf(process.env.TOKEN_BOT_TELEGRAM)
bot.start((ctx) => {
    console.log(ctx)
 ctx.reply("Welcome to the test bot")
})

bot.help((ctx) => {
 ctx.reply("You are in a test bot")
})
bot.command('random', (ctx) => {
    console.log(ctx)
    ctx.reply(randomNumber(100))
})

bot.command('advancerandom', (ctx) => {
    const message = ctx.update.message.text
    const randoNumber = Number(message.split(' ')[1])
    if(isNaN(randoNumber) || randoNumber <= 0) {
     ctx.reply('Please type /advancerandom by a number greater than 0')
    }else{
     ctx.reply(randomNumber(randoNumber))
    }

})

// bot.on('text', (ctx) =>{
//     ctx.reply(ctx.update.message.text)
// })

bot.on('photo', (ctx) => {
    console.log(ctx)
    const fileId = ctx.update.message.photo[3].file_id
    ctx.telegram.getFileLink(fileId).then((response) => downloandImage(response, `./uploads/${fileId}.jpg`, ctx))
    ctx.reply('this is a photo.')
})

bot.launch() 