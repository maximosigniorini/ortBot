const {Client, MessageAttachment} = require('discord.js');
const {
  prefix,
  token
} = require('./config.json');
const client = new Client();

const fs = require('fs');
let sonidos = ["Chano", "aparezco", "buenisimo", "fino", "niki", "a4", "aplaudo", "cortito", "hola", "privado", "acho", "basta", "cpiko", "jaram", "skate", "achotapita", "boa", "dios", "love", "traicionera", "ahre", "bob", "filisteo", "marina"]
let misSonidos = [];
let isPlaying = false;

client.once('ready', () => {
  console.log("ORT Bot");
  console.log("By Maximo Signiorini aka Collatio");
});


//Funcionamiento central del bot
client.on('message', async message => {

  if (message.content.includes(prefix)) {

    let miMensaje = message.content;
    miMensaje = miMensaje.slice(3);

    if (miMensaje.length > 1) {
      leerComando(miMensaje, message).then((res) => {}).catch((err) => {
        message.reply(err.message);
      });
    }
  }else if(message.content === "?lobby"){
    const attachment = new MessageAttachment("https://i.imgur.com/jKzTlTN.jpg");
    message.channel.send(attachment);
  }
});

client.login(token);

async function leerComando(miMensaje, message) {

  const voiceChannel = await message.member.voice.channel;

  switch (miMensaje) {

    case 'help':
      message.reply("Capo aca te van todos los soniditos: " + sonidos);
      break;

    default:

      if (!voiceChannel) {
        message.reply("Entra al canal potze")
      }

      if (!fs.existsSync('./Audio/' + miMensaje + '.ogg')) {
        throw new Error('ese sonidero no lo tengo kinga, pediselo a maxi');
      }



       for (let i = 0; i < sonidos.length; i++) {
         if (miMensaje == sonidos[i]) {
           misSonidos.push(sonidos[i]);
           console.log(misSonidos);
           reproducir();
         }
       }

      //     voiceChannel.join().then(connection => {
      //
      //       const dispatcher = connection.play('./Audio/' + misSonidos[0] + '.ogg');
      //
      //       dispatcher.on('start', () => {
      //         isPlaying = true;
      //       })
      //
      //       dispatcher.on('finish', end => {
      //         isPlaying = false;
      //         misSonidos.shift()
      //         console.log(misSonidos)
      //         voiceChannel.leave();
      //       })
      //     }).catch(err => console.log(err));
      //   }
      // }

      break;
  }

  async function reproducir(){
    if(misSonidos.length > 0 && !isPlaying){
      isPlaying = true;
      voiceChannel.join().then(connection => {
        for(let i = 0;i < misSonidos.length;i++){
          const dispatcher = connection.play('./Audio/' + misSonidos[i] + '.ogg');

          dispatcher.on('finish', end => {
            isPlaying = false;
            misSonidos.shift();
            console.log("Lo saque " + misSonidos);
            reproducir()
          })
        }
      })
    }
  }

}
