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
      let responseIndex = Math.floor(Math.random() * (totalResponses)) % (totalResponses)
      let name = "./img/" + data[miMensaje][responseIndex] + ".jpg"

      switch (miMensaje){
        case 'Jufi':
          comando.channel.send({files: [name]});
        break;

        case 'Hess':
          comando.channel.send({files: [name]});
        break;

        case 'Ivi':
          comando.channel.send({files: [name]});
        break;

        case 'Ducho':
          comando.channel.send({files: [name]});
        break;

        case 'Rochu':
          comando.channel.send({files: [name]});
        break;

        case 'Deluki':
          comando.channel.send({files: [name]});
        break;

        case 'Dante':
          comando.channel.send({files: [name]});
        break;

        case 'Eze':
          comando.channel.send({files: [name]});
        break;
      }
    }
  }

};
