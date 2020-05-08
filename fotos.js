var jimp = require('jimp');

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


  fotos: async function(comando,data,miMensaje2){
    let font1 = await jimp.loadFont("./fonts/impact_96.fnt")
    let font2 = await jimp.loadFont("./fonts/impact_72.fnt")
    let welcome

     let mainMessage = comando.content.replace("o!",'')
     mainMessage = mainMessage.substring(1)
     mainMessage = mainMessage.split(" ")
     mainMessage.shift()

     let caracteres = mainMessage.join()
     caracteres = caracteres.replace(",",'')
     caracteres = caracteres.split("")

    let upperText = ""
    if(!mainMessage.length < 1){
		for(let i = 0;i < Math.round((mainMessage.length)/2);i++){
			upperText += " " + mainMessage[i];
		}
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
  welcome = await jimp.read(name)
}

//Si hay mucho texto y la imagen es ancha
if(caracteres.length >= 20 && caracteres.length < 60 && mainMessage.length > 0 && welcome.bitmap.width > 1300){
  welcome.print(font2, 0, welcome.bitmap.height * 0.07, {
    text: upperText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);

  welcome.print(font2, 0, welcome.bitmap.height * 0.8, {
    text: lowerText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);
}


//Si hay mucho texto y la imagen no es ancha
if(caracteres.length >= 20 && caracteres.length < 60 && mainMessage.length > 0 && welcome.bitmap.width < 1300){
  welcome.print(font2, 0, welcome.bitmap.height * 0.07, {
    text: upperText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);

  welcome.print(font2, 0, welcome.bitmap.height * 0.7, {
    text: lowerText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);
}

//Si hay poco texto
if(caracteres.length < 20 && mainMessage.length > 0){
  welcome.print(font2, 0, welcome.bitmap.height * 0.07, {
    text: upperText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);

  welcome.print(font2, 0, welcome.bitmap.height * 0.8, {
    text: lowerText,
    alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: jimp.VERTICAL_ALIGN_CENTER
  }, welcome.bitmap.width, welcome.bitmap.height);
}

    if(caracteres.length < 60){
      welcome.write('Welcome.png')
      comando.channel.send(``, { files: ["Welcome.png"] })
    } else {
      comando.reply("Miralo al tontitx, aprendio a escribir! Pero no escribas tanto!!")
    }
  }

};
