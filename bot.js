const {Client, MessageAttachment} = require('discord.js');
const {prefix, token, giphyToken} = require('./config.json');
const client = new Client();
const fs = require('fs');
let misFotos = require('./fotos')
let GphApiClient = require('giphy-js-sdk-core')
let sonidos = ["Chano", "aparezco", "buenisimo", "fino", "niki", "a4", "aplaudo", "cortito", "hola", "privado", "acho", "basta", "cpiko", "jaram", "skate", "achotapita", "boa", "dios", "love", "traicionera", "ahre", "bob", "filisteo", "marina", "paco","casa","efe","bolas","risa","bolas2","perdonas"];
let imagenes = ["lobby"];
let misSonidos = [];
let isPlaying = false;
let comando = []
let divididosLasPelotas = []
let miDiccionario = {}


giphy = GphApiClient(giphyToken)

const data = [['Duchear',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Chupala',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['lovu',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Max',0,2,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,31,0,0,0,0,0,0,0,0,0,0,0,0,0,45,46,0,48,0,0,51,0,53,54,55,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Abi',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Dante',1,0,3,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,46,47,0,49,0,0,0,53,0,55,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Ducho',0,0,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,0,23,0,0,26,0,0,0,0,0,0,0,0,0,36,0,38,0,0,0,0,0,0,0,0,47,0,0,0,0,0,53,0,55,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Eze',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,22,0,24,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,47,0,0,0,0,0,53,0,55,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Juan',0,0,0,0,5,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,39,0,0,0,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Jufi',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,19,0,0,0,0,0,0,0,27,0,0,0,0,0,0,0,35,0,0,0,0,0,0,0,0,0,0,46,47,0,0,0,0,0,53,0,55,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Madi',0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,44,0,0,0,0,0,0,0,0,53,0,55,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Nico',0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Rochu',0,0,0,0,5,0,0,0,9,0,0,0,0,0,0,0,0,0,19,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Ivi',0,0,0,0,5,0,0,0,0,0,0,0,13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,47,0,0,0,0,0,53,0,0,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Joaco',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Hess',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],['Deluki',1,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,28,0,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,45,0,47,0,0,0,0,0,53,0,0,56,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

miDiccionario = misFotos.data(data);


client.once('ready', () => {
  console.log("ORT Bot");
});



//Funcionamiento central del bot
client.on('message', async message => {
  if (message.content.includes(prefix)) {

    let miMensaje = message.content;
    miMensaje = miMensaje.slice(3);

    misFotos.fotos(miMensaje,message,miDiccionario)

    if (miMensaje.length > 1) {
      leerComando(miMensaje, message).then((res) => {}).catch((err) => {
        //message.reply(err.message);
      });
    }
  }else if(message.content === "?lobby"){
    const attachment = new MessageAttachment("https://i.imgur.com/jKzTlTN.jpg");
    message.channel.send(attachment);
  } else if(message.content.startsWith("?g")){
    let gifMes = message.content;
    gifMes = gifMes.slice(3);
    giphy.search('gifs',{"q": gifMes})
     .then((response) => {
       let totalResponses = response.data.length
       let responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponses
       let responseFinal = response.data[responseIndex]
       message.channel.send(gifMes, {
         files: [responseFinal.images.fixed_height.url]
       });
     }).catch(() => {
       message.channel.send("Mmmm que onda buscando nopor kinga?")
     })
  }
});

client.login(token);

async function leerComando(miMensaje, message) {

  const voiceChannel = await message.member.voice.channel;

  switch (miMensaje) {

    case 'help':
      message.reply("Capo aca te van todos los soniditos: " + sonidos);
      message.reply("Y estas son las imagenes: " + imagenes);
      message.reply("Para mandar imagenes escribí ?imagen");
      message.reply("Para buscar gifs escribir ?g");
      break;

    default:

      if (!voiceChannel) {
        message.reply("Entra al canal potze")
      }

        divididosLasPelotas = dividirComandos(miMensaje)
        if(divididosLasPelotas[1].length > 0 && !(miMensaje in miDiccionario)){
          for(let i = 0;i < divididosLasPelotas[1].length;i++){
            message.reply('el comando' + divididosLasPelotas[1][i] + ' no lo tengo kinga, pediselo al massi');
            //message.reply('el comando ' + divididosLasPelotas[1][i] + ' no lo tengo kinga, pediselo al massi');
          }
        }
        misSonidos = misSonidos.concat(divididosLasPelotas[0])
        reproducir();
        break;
  }

  async function reproducir(){
    if(misSonidos.length > 0 && !isPlaying){
      isPlaying = true;
      voiceChannel.join().then(connection => {
          const dispatcher = connection.play('./Audio/' + misSonidos[0] + '.ogg');
          dispatcher.on('finish', end => {
            isPlaying = false;
            misSonidos.splice(0,1);
            reproducir()
          })
      })
    }
  }

}

function dividirComandos(miMensaje) {
  let divididos = []
  miMensaje = miMensaje.replace(" ","");
  miMensaje = miMensaje.split(",")
  let comando = []

  for (let i = 0; i < miMensaje.length; i++) {
    if (!fs.existsSync('./Audio/' + miMensaje[i].replace(" ","") + '.ogg')) {
      //Los que estan mal
      let lasPelotas = miMensaje[i].replace(" ","");
      divididos.push(lasPelotas)
    }
    if (fs.existsSync('./Audio/' + miMensaje[i].replace(" ","") + '.ogg')) {
      //Los que estan bien
      let kapanga = miMensaje[i].replace(" ","")
      comando.push(kapanga)
    }
  }

let uniqueArray = divididos.filter(function(item, pos, self){
  return self.indexOf(item) == pos;
});


  let miUltimoArray = [comando, uniqueArray]
  return miUltimoArray
}
