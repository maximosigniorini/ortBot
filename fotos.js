module.exports = {
  data: function (data) {

    let dict = {}

    for(let i = 0;i < data.length;i++){
      let comando = data[i][0]
      let newData = []
      let dataFilt = data[i].filter(word => word != 0);
      dataFilt.shift()
      newData = dataFilt
      dict[comando] = newData
    }
    return dict;
  },

  fotos: function(miMensaje,comando,data){

    let hess = ["BESHHHOO BESSSHOOO","HADAAA","Ayy hola"]
    let randomHess = hess[Math.floor(Math.random() * hess.length)];
    let ducho = ["Yo de baja muchachis","Las pastillas de lau","Pero claaaaroooo","Y no es poca cosa che"]
    let randomDucho = ducho[Math.floor(Math.random() * ducho.length)];
    let deluki = ["Mi vida es una mierda","Anda a lavarte el orto"]
    let randomDeluki = deluki[Math.floor(Math.random() * deluki.length)];

    if(miMensaje in data){
      let totalResponses = data[miMensaje].length
      let responseIndex = Math.floor(Math.random() * (totalResponses)) % (totalResponses)
      let name = "./img/" + data[miMensaje][responseIndex] + ".jpg"

      switch (miMensaje){
        case 'Jufi':
          comando.channel.send("Alguien Catan?", {files: [name]});
        break;

        case 'Hess':
          comando.channel.send(randomHess, {files: [name]});
        break;

        case 'Ivi':
          comando.channel.send("Chance?", {files: [name]});
        break;

        case 'Ducho':
          comando.channel.send(randomDucho, {files: [name]});
        break;

        case 'Rochu':
          comando.channel.send("Sale krunkersito?", {files: [name]});
        break;

        case 'Deluki':
          comando.channel.send(randomDeluki, {files: [name]});
        break;

        default:
          comando.channel.send("Ola soy " + miMensaje, {files: [name]});
        break;
      }
    }
  }

};
