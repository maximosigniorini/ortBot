const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const client = new Discord.Client();
let isReady = true;
let sonidos = ["Chano","aparezco","buenisimo","fino","niki","a4","aplaudo","cortito","hola","privado","acho","basta","cpiko","jaram","skate","achotapita","boa","dios","love","traicionera","ahre","bob","filisteo","marina"]
let misSonidos = [];

client.once('ready', () => {
  console.log("ORT Bot");
  console.log("By Maximo Signiorini aka Collatio");
})


//Funcionamiento central del bot
client.on('message', async message => {

  if(message.content.includes(prefix)){
    let miMensaje = message.content
    miMensaje = miMensaje.slice(3)

    if(miMensaje.length > 1){
      leerComando(miMensaje, message).then( (res) => {
      }).catch( (err) => {
        console.log(err.message)
      //  message.reply(err.message);
      });
    }
  }
})

client.login(token);

async function leerComando(miMensaje, message){

  const voiceChannel = await message.member.voice.channel;

  if(miMensaje == "help"){
    message.reply("Capo aca te van todos los soniditos: " + sonidos)
  }

  if(!voiceChannel){
    message.reply("Entra al canal potze")
  }

  for(let i = 0;i < sonidos.length;i++){

    if(miMensaje == sonidos[i]){
      isReady = false;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.play('./Audio/' + sonidos[i] + '.ogg');
        dispatcher.on('finish', end => {
          voiceChannel.leave();
        })
      }).catch(err => console.log(err));

      isReady = true;
    } else {
      message.reply("Ese sonidero no existe todavia kinga, mandaselo a Maxi")
      return;
    }
  }
}
