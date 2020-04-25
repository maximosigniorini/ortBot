const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const client = new Discord.Client();
let isReady = true;
let sonidos = ["Chano","aparezco","buenisimo","fino","niki","a4","aplaudo","cortito","hola","privado","acho","basta","cpiko","jaram","skate","achotapita","boa","dios","love","traicionera","ahre","bob","filisteo","marina"]

client.once('ready', () => {
  console.log("Ready!");
})


//Funcionamiento central del bot
client.on('message', async message => {

  if(message.content.includes(prefix)){
    const voiceChannel = await message.member.voice.channel;
    let miMensaje = message.content
    miMensaje = miMensaje.slice(2)

    if(miMensaje == "help"){
      message.channel.send("Capo aca te van todos los soniditos: " + sonidos)
    }

    // if (miMensaje.length > 1) {
    //   leerComando(comando, args, mensaje).then( (res) => {
    //   }).catch( (err) => {
    //     message.reply(err.message);
    //   });

    for(let i = 0;i < sonidos.length;i++){

      if(miMensaje == sonidos[i]){
        isReady = false;
        voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./Audio/' + sonidos[i] + '.ogg');
          dispatcher.on("end", end => {
            voiceChannel.leave();
          })
        }).catch(err => console.log(err));

        isReady = true;
      }
    }
  }
})

client.login(token);
