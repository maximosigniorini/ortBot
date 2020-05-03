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

    if(miMensaje2 in data){
      let totalResponses = data[miMensaje2].length
      let responseIndex = Math.floor(Math.random() * (totalResponses)) % (totalResponses)
      let name = "./img/" + data[miMensaje2][responseIndex] + ".jpg"
      comando.channel.send({files: [name]});
    } else if(miMensaje2 == "maxi"){
      comando.channel.send({files: [name]});
    }
  }

};
