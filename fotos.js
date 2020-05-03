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
      console.log(dict)
    }
    return dict;
  },

  fotos: function(miMensaje,comando,data,miMensaje2){

    if(miMensaje in data){
      let totalResponses = data[miMensaje].length
      let responseIndex = Math.floor(Math.random() * (totalResponses)) % (totalResponses)
      let name = "./img/" + data[miMensaje][responseIndex] + ".jpg"
      comando.channel.send({files: [name]});

      // switch (miMensaje2){
      //   case 'jufi':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'hess':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'ivi':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'ducho':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'rochu':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'deluki':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'dante':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'eze':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'max':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'abi':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'juan':
      //     comando.channel.send({files: [name]});
      //   break;
      //
      //   case 'juan':
      //     comando.channel.send({files: [name]});
      //   break;
      // }
    }
  }

};
