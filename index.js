const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const client = new Discord.Client();
let isReady = true;

client.once('ready', () => {
  console.log("Ready!");
})


//Funcionamiento central del bot
client.on('message', async message => {
const voiceChannel = await message.member.voice.channel;

  switch(message.content){

    case '! traicionera':

      isReady = false;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.play('./Audio/traicionera.ogg');
        dispatcher.on("end", end => {
          voiceChannel.leave();
        })
        }).catch(err => console.log(err));

        isReady = true;

      break;

    case '! acho':

      isReady = false;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.play('./Audio/acho.ogg');
        dispatcher.on("end", end => {
        voiceChannel.leave();
      })
        }).catch(err => console.log(err));
        isReady = true;

      break;
  }

  // if (isReady && message.content.startsWith(`${prefix} traicionera`)){
  //   isReady = false;
  //
  //   const voiceChannel = await message.member.voice.channel;
  //   voiceChannel.join().then(connection => {
  //     const dispatcher = connection.play('./Audio/traicionera.ogg');
  //     dispatcher.on("end", end => {
  //     voiceChannel.leave();
  //   })
  //     }).catch(err => console.log(err));
  //     isReady = true;
  // }
})

client.login(token);
