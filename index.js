var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var token = "EAAKnjNqiiSYBACGAD8pOalOOM8QSosY4xI2yBVT0lUkHRZBHcLbiMLUB6kUiCx5uyBMHmV6NAUKfhkw0T00JpDbg9FVZBiV6VTDhDJdxwkSCZCZBDKtfL3cXzP3XsCsqyhk2AA5kNtj64iZCJugg5k9hQ4zr6TL3qZB97vEszLYgZDZD";
var verify_token = "512248325967as";


//Root EndPoint
app.get('/', function (req, res) {
  res.send('Facebook Messenger Bot root endpoint!');
});

//Setup Webhook
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
 res.send('Error, wrong validation token');
});

//App listen
app.listen(port, function () {
  console.log('Facebook Messenger Bot on port: ' + port);
});

app.post('/webhook/', function (req, res) {

  var messaging_events = req.body.entry[0].messaging;

  for (var i = 0; i < messaging_events.length; i++) {

    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;

    if (event.postback) {
      text = JSON.stringify(event.postback);
      if (text == '{"payload":"adrian"}') {
          sendTextMessage(sender, "Puedes contactar a Adrián Gómez al 7260-0261 o en su email g.adrian@elaniin.com");
      }
      if (text == '{"payload":"fabiola"}') {
          sendTextMessage(sender, "Puedes contactar a Fabiola Leon al 7217-7470 o en su email fabiola.leon@elaniin.com");
      }
      if (text == '{"payload":"eduardo"}') {
          sendTextMessage(sender, "Puedes contactar a Eduardo Linares al 7682-8668 o en su email eduardo.linares@elaniin.com");
      }
      if (text == '{"payload":"xochilt"}') {
          sendTextMessage(sender, "Puedes contactar a Xochilt Guardado en x.guardado@elaniin.com");
      }
      if (text == '{"payload":"carranza"}') {
          sendTextMessage(sender, "Puedes contactar a Carlos Carranza en carlos.carranza@elaniin.com");
      }
      if (text == '{"payload":"edhbusqueda"}') {
          sendTextMessage(sender, 'Con gusto puedo ayudarte a encontrar más noticias, escribe "noticias" seguido del tema de tu interes.');
      }
    }

    if (event.message && event.message.text) {
      var text = event.message.text;
      text = text.toLowerCase();
      if (text.indexOf("chiste") > -1) {
          sendTextMessage(sender, "¿Tienes wi-fi? Sí ¿Y cuál es la clave? Tener dinero y pagarlo.");
      }
      else if (text.indexOf("cv") > -1 || text.indexOf("curriculum") > -1 || text.indexOf("curriculum.") > -1 || text.indexOf("cv.") > -1) {
          sendTextMessage(sender, "Nos encanta conocer gente nueva, puedes enviar tu CV a jobs@elaniin.com");
      }
      else if (text.indexOf("contacto") > -1 || text.indexOf("contactar") > -1) {
         sendTextMessage(sender, "Puedes escribirnos a hello@elaniin.com o llamarnos desde El Salvador al 2297-9723 o desde USA al (813)922-3440");    
      }
      else if (text.indexOf("gracias") > -1 || text.indexOf("thank") > -1) {
          sendTextMessage(sender, "Gracias a ti!");
      }
      else if (text.indexOf("equipo") > -1 ||  text.indexOf("team") > -1) {
          sendTextMessage(sender, "Te presentamos parte del equipo de Elaniin Digital:");
          sendTeamMessage(sender);
      }
      else if (text.indexOf("cotiza") > -1) {
          sendTextMessage(sender, "Para cotizar cualquier de nuestros servicios puedes ingresar al siguiente link: https://elaniin.com/cotiza-tu-proyecto/");
      }
      else if (text.indexOf("sms") > -1) {
          sendTextMessage(sender, 'Para enviar un sms debes escribir: "enviarsms + numero + mensaje"');
      }
      else if (text.indexOf("hola") > -1 || text.indexOf("buenas") > -1) {
          sendTextMessage(sender, "Hola Jefe! ¿Comó estas?");
      }
      else if (text.indexOf("congreso") > -1 || text.indexOf("uca") > -1) {
          sendTextMessage(sender, "Hola a todos! Los invito a poner atención a las charla de Adrián uno de mis creadores.");
      }
      else if (text.indexOf("portate") > -1) {
          sendTextMessage(sender, "Claro solo voy a stalkear a las chicas del congreso ;)");
      }
      else if (text.indexOf("creador") > -1 || text.indexOf("creo") > -1 || text.indexOf("creó") > -1) {
          sendTextMessage(sender, "Buena pregunta, fui creado en Elaniin Digital con la tecnologia de Facebook, para saber más puedes leer https://developers.facebook.com/products/messenger/ o contactarnos en hello@elaniin.com");
      }
      else{
          sendTextMessage(sender, "¿Qué te gustaria saber de nosotros? ¿Información de contacto, cotizar un proyecto, conocer a nuestro equipo, enviar tu CV o leer un chiste?");
      }
          

          
      }
    }

    res.sendStatus(200);

});


//send Messages with Facebook Graph Facebook v2.6
function sendOtherMessage(sender, messageData) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }, function (error, response) {

        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

    });

}
function sendTextMessage(sender, text) {

    var messageData = {
        text: text
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }, function (error, response) {

        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

    });

}

function sendTeamMessage(sender) {
  messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Adrián Gómez",
          "subtitle": "General Director",
          "image_url": "http://toolboxsv.com/dev/bot-elaniin/imgs/adrian.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://m.me/adriangomezme",
            "title": "Chatear"
          }, {
            "type": "postback",
            "title": "Contacto",
            "payload": "adrian",
          }],
        },{
          "title": "Eduardo Linares",
          "subtitle": "Head of Technology",
          "image_url": "http://toolboxsv.com/dev/bot-elaniin/imgs/eduardo.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://m.me/eduardotbb",
            "title": "Chatear"
          }, {
            "type": "postback",
            "title": "Contacto",
            "payload": "eduardo",
          }],
        },{
          "title": "Fabiola Leon",
          "subtitle": "Head of Strategy",
          "image_url": "http://toolboxsv.com/dev/bot-elaniin/imgs/fabiola.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://m.me/fabiola.leon.73113",
            "title": "Chatear"
          }, {
            "type": "postback",
            "title": "Contacto",
            "payload": "fabiola",
          }],
        },{
          "title": "Carlos Carranza",
          "subtitle": "Marketing Analyst",
          "image_url": "http://toolboxsv.com/dev/bot-elaniin/imgs/carranza.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://m.me/carlos.carranzah",
            "title": "Chatear"
          }, {
            "type": "postback",
            "title": "Contacto",
            "payload": "carranza",
          }],
        },{
          "title": "Xochilt Guardado",
          "subtitle": "Head of Strategy",
          "image_url": "http://toolboxsv.com/dev/bot-elaniin/imgs/xochilt.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://m.me/xochiltN",
            "title": "Chatear"
          }, {
            "type": "postback",
            "title": "Contacto",
            "payload": "xochilt",
          }],
        }]
      }
    }
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}