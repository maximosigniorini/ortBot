const {
  Client,
  MessageAttachment
} = require('discord.js');
const client = new Client();
const RiveScript = require('rivescript')
let bot = new RiveScript();
const fs = require('fs');
let misFotos = require('./fotos')
let miData = require('./data')
let sonidos = ["Chano", "aparezco", "buenisimo", "fino", "niki", "a4", "aplaudo", "cortito", "hola", "privado", "acho", "basta", "cpiko", "jaram", "skate", "achotapita", "boa", "dios", "love", "traicionera", "ahre", "bob", "filisteo", "marina", "paco", "casa", "efe", "bolas", "risa", "bolas2", "perdonas", "bueno", "chance", "enserio", "catan"];
let misSonidos = [];
let isPlaying = false;
let comando = []
let divididosLasPelotas = []
let miDiccionario = {}

bot.loadFile("./brain.rive").then(loading_done).catch(loading_error);
miDiccionario = misFotos.data(miData.data());

client.once('ready', () => {
  console.log("ORT Bot");
});


//Funcionamiento central del bot
client.on('message', async message => {

  const voiceChannel2 = await message.member.voice.channel;

  if (message.content.includes(process.env.prefix) && voiceChannel2) {

    let miMensaje = message.content;
    miMensaje = miMensaje.slice(3);

    if (miMensaje.includes("o!") == false) {

      let username = "local-user";
      let riveReader = miMensaje.replace(process.env.prefix, ''); // remove bot name from string
      riveReader = riveReader.replace(/[^a-zA-Z0-9  ]/g, "").toLowerCase(); //remove symbols
      console.log(typeof riveReader)
      riveReader = riveReader.splice(1)

      if (!(sonidos.includes(miMensaje))) {
        misFotos.fotos(message, miDiccionario, riveReader)
        bot.reply(username, riveReader).then(function(reply) {
          message.reply(reply);
        });
      }

      if (miMensaje.length > 1) {
        leerComando(miMensaje, message).then((res) => {}).catch((err) => {});
      }
    } else if (message.content === "lobby") {
      const attachment = new MessageAttachment("https://i.imgur.com/jKzTlTN.jpg");
      message.channel.send(attachment);
    }
  }

  if (message.content.includes(process.env.prefix) && !voiceChannel2) {
    message.reply("Entra al lobby potze!")
  }

});

client.login(process.env.TOKEN);

async function leerComando(miMensaje, message) {

  const voiceChannel = await message.member.voice.channel;

  divididosLasPelotas = dividirComandos(miMensaje)
  misSonidos = misSonidos.concat(divididosLasPelotas[0])
  reproducir();


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

function loading_done() {
  console.log("Bot has finished loading!");
  // Now the replies must be sorted!
  bot.sortReplies();
}

// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}
