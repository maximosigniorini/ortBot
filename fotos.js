var jimp = require('jimp');
let font1 = await jimp.loadFont("./fonts/impact_96.fnt")
let font2 = await jimp.loadFont("./fonts/impact_64.fnt")

module.exports = {
  data: function (data) {

    let dict = {}

    for(let i = 0;i < data.length;i++){
      let comando = data[i][0]
      comando = comando.replace(/[^a-zA-Z0-9  ]/g, "").toLowerCase(); //remove symbols
      let newData = []
      let dataFilt = data[i].filter(word => word != 0);
      dataFilt.shift()
      newData = dataFilt
      dict[comando] = newData
    }
    return dict;
  },

  fotos: function(comando,data,miMensaje2){

    let mainMessage = comando.content.replace("!join",'')
    mainMessage = mainMessage.substring(1)
    let caracteres = mainMessage.split("")
    mainMessage = mainMessage.split(" ")


    let upperText = ""
		for(let i = 0;i < Math.round((mainMessage.length)/2);i++){
			upperText += " " + mainMessage[i];

		}

		let lowerText = ""
		if(!mainMessage.length < 1){
		for(let j = Math.round((mainMessage.length)/2);j < (mainMessage.length);j++){
			lowerText += " " + mainMessage[j];
		}
}

if(miMensaje2 in data){
  let totalResponses = data[miMensaje2].length
  let responseIndex = Math.floor(Math.random() * (totalResponses)) % (totalResponses)
  let name = "./img/" + data[miMensaje2][responseIndex] + ".jpg"

  let welcome = await jimp.read(name) //We load the image from that link
}


if(caracteres.length > 20 && caracteres.length < 60){
  welcome.print(font2, 0, welcome.bitmap.height * 0.07, {
    text: upperText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);

  welcome.print(font2, 0, welcome.bitmap.height * 0.9, {
    text: lowerText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);
}

if(caracteres.length < 20){
  welcome.print(font1, 0, welcome.bitmap.height * 0.07, {
    text: upperText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);

  welcome.print(font1, 0, welcome.bitmap.height * 0.9, {
    text: lowerText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);
}

  if(caracteres.length < 60){
    welcome.write('Welcome.png')
    message.channel.send(``, { files: ["Welcome.png"] }) //We sent the file to the channel
  }
  }

};
