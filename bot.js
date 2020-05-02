const {
  Client,
  MessageAttachment
} = require('discord.js');
//const {token,prefix} = require('./config.json');
const client = new Client();
const fs = require('fs');
let misFotos = require('./fotos')
let miData = require('./data')
let sonidos = ["Chano", "aparezco", "buenisimo", "fino", "niki", "a4", "aplaudo", "cortito", "hola", "privado", "acho", "basta", "cpiko", "jaram", "skate", "achotapita", "boa", "dios", "love", "traicionera", "ahre", "bob", "filisteo", "marina", "paco", "casa", "efe", "bolas", "risa", "bolas2", "perdonas", "bueno", "chance", "enserio", "catan"];
let imagenes = ["lobby", "Max", "Abi", "Dante", "Ducho", "Eze", "Juan", "Jufi", "Madi", "Nico", "Rochu", "Ivi", "Joaco", "Hess", "Deluki"];
let misSonidos = [];
let isPlaying = false;
let comando = []
let divididosLasPelotas = []
let miDiccionario = {}

miDiccionario = misFotos.data(miData.data());

client.once('ready', () => {
  console.log("ORT Bot");
});


//Funcionamiento central del bot
client.on('message', async message => {
  if (message.content.includes(process.env.prefix)) {

    let miMensaje = message.content;
    miMensaje = miMensaje.slice(3);

    if (miMensaje.includes("o!")) message.reply("Sos bolude o te dicen Nico Aizinas?");

    if (miMensaje.includes("o!") == false) {
      misFotos.fotos(miMensaje, message, miDiccionario)

      if (miMensaje.length > 1) {
        leerComando(miMensaje, message).then((res) => {}).catch((err) => {});
      }
    } else if (message.content === "lobby") {
      const attachment = new MessageAttachment("https://i.imgur.com/jKzTlTN.jpg");
      message.channel.send(attachment);
    }
  }
});

client.login(process.env.TOKEN);

async function leerComando(miMensaje, message) {

  const voiceChannel = await message.member.voice.channel;

  switch (miMensaje) {

    case 'help':
      message.reply("Capo aca te van todos los soniditos: " + sonidos);
      message.reply("Y las imagenes son: " + imagenes)
      break;

    default:

      if (!voiceChannel) {
        message.reply("Entra al canal potze")
      }

      if (voiceChannel){
        divididosLasPelotas = dividirComandos(miMensaje)
        if (divididosLasPelotas[1].length > 0 && !(miMensaje in miDiccionario)) {
          for (let i = 0; i < divididosLasPelotas[1].length; i++) {
            message.reply('el comando ' + divididosLasPelotas[1][i] + ' no lo tengo kinga, pediselo al massi');
          }
        }
        misSonidos = misSonidos.concat(divididosLasPelotas[0])
        reproducir();
      }
      break;
  }

  async function reproducir() {
    if (misSonidos.length > 0 && !isPlaying) {
      isPlaying = true;
      voiceChannel.join().then(connection => {
        const dispatcher = connection.play('./Audio/' + misSonidos[0] + '.ogg');
        dispatcher.on('finish', end => {
          isPlaying = false;
          misSonidos.splice(0, 1);
          reproducir()
        })
      })
    }

    if (misSonidos.length == 0 && !isPlaying) {
      voiceChannel.leave()
    }
  }

}

function dividirComandos(miMensaje) {
  let divididos = []
  miMensaje = miMensaje.replace(" ", "");
  miMensaje = miMensaje.split(",")
  let comando = []

  for (let i = 0; i < miMensaje.length; i++) {
    if (!fs.existsSync('./Audio/' + miMensaje[i].replace(" ", "") + '.ogg')) {
      //Los que estan mal
      let lasPelotas = miMensaje[i].replace(" ", "");
      divididos.push(lasPelotas)
    }
    if (fs.existsSync('./Audio/' + miMensaje[i].replace(" ", "") + '.ogg')) {
      //Los que estan bien
      let kapanga = miMensaje[i].replace(" ", "")
      comando.push(kapanga)
    }
  }

  let uniqueArray = divididos.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });


  let miUltimoArray = [comando, uniqueArray]
  return miUltimoArray
}
