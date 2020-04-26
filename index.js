const Discord = require('discord.js');
const {
  prefix,
  token
} = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
let sonidos = ["Chano", "aparezco", "buenisimo", "fino", "niki", "a4", "aplaudo", "cortito", "hola", "privado", "acho", "basta", "cpiko", "jaram", "skate", "achotapita", "boa", "dios", "love", "traicionera", "ahre", "bob", "filisteo", "marina"]
let misSonidos = [];
let isPlaying = false;
let comando = []
let divididosLasPelotas = []

client.once('ready', () => {
  console.log("ORT Bot");
  console.log("By Maximo Signiorini aka Collatio");
})


//Funcionamiento central del bot
client.on('message', async message => {

  if (message.content.includes(prefix)) {
    let miMensaje = message.content
    miMensaje = miMensaje.slice(3)

    if (miMensaje.length > 1) {
      leerComando(miMensaje, message).then((res) => {}).catch((err) => {
        //message.reply(err.message);
      });
    }
  }
})

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



        divididosLasPelotas = dividirComandos(miMensaje)
        console.log("Las pelotas divididas")
        console.log(divididosLasPelotas)
        if(divididosLasPelotas[1].length == 0 ){
          for(let i = 0;i < divididosLasPelotas[1].length;i++){
            message.reply('el comando ' + divididosLasPelotas[1][i] + ' no lo tengo kinga, pediselo al massi');
          }
        }
        console.log("Me llego: " + divididosLasPelotas[0])
        misSonidos = misSonidos.concat(divididosLasPelotas[0])
        reproducir();
        break;
  }

  async function reproducir(){
    console.log(misSonidos.length)
    if(misSonidos.length > 0 && !isPlaying){
      isPlaying = true;
      voiceChannel.join().then(connection => {
          console.log("VOY A REPRODUCIR:" + misSonidos[0])
          const dispatcher = connection.play('./Audio/' + misSonidos[0] + '.ogg');

          dispatcher.on('finish', end => {
            isPlaying = false;
            misSonidos.splice(0,1);
            console.log("Lo saque ")
            console.log(misSonidos)
            reproducir()
          })
      })
    }
    console.log("Termine de reproducir la collatio")
  }

}

function dividirComandos(miMensaje){
  let divididos = []
   miMensaje = miMensaje.replace(" ", '');
   miMensaje = miMensaje.split(",")
   commando = []
   comando = miMensaje

for (let i = 0; i < comando.length; i++) {
  if (!fs.existsSync('./Audio/' + comando[i] + '.ogg')) {
    let lasPelotas = comando[i]
    comando.splice(i,1);
    divididos.push(lasPelotas)
  }
}

   let miUltimoArray = [comando, divididos]
   return miUltimoArray
}
