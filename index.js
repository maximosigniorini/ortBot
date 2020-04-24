const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const client = new Discord.Client();
let isReady = true;

client.once('ready', () => {
  console.log("Ready!");
})

//Funcionamiento central del bot
client.on('message', async message => {

  if (isReady && message.member.voice.channel){
    isReady = false;

    const voiceChannel = await message.member.voice.channel;
    voiceChannel.join().then(connection => {
      const dispatcher = connection.play('./Audio/test.wav');
      dispatcher.on("end", end => {
      voiceChannel.leave();
    })
      }).catch(err => console.log(err));
      isReady = true;
  }
})

client.login(token);
