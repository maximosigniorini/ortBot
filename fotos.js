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
    if(miMensaje in data){
      let totalResponses = data[miMensaje].length
      let responseIndex = Math.floor(Math.random() * (totalResponses - 1)) % (totalResponses - 1)
      let name = "./img/" + data[miMensaje][responseIndex] + ".jpg"
      comando.channel.send("Ola soy " + miMensaje, {files: [name]});
    }
  }

};
