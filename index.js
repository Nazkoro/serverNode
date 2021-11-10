
const path = require('path');
const express = require('express');
const TelegramApi = require('node-telegram-bot-api');

const app = express();

const token = "2087298950:AAEgyDrC2L3YEl_UP4r6ACe4s9Lh-L3Dr2M";
const chat_id = "-617424904";

const bot = new TelegramApi(token, {polling: true})

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

const jsonParser = express.json();
 
app.post("/user", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
	
	let str =' '

	for(let i =0; i<request.body.length; i++){
		str =  str + ' Продукт: '+ request.body[i].name  + ', цена: '+ request.body[i].price + ', количество: '+request.body[i].count + '.\n'
	}
	console.log('новый заказ');
	console.log(str);
	// console.log('----------------');
	// console.log(request);
	// console.log( request.body[0]);
	console.log( request.body[1]);
	console.log('-----------------');

     bot.sendMessage(chat_id, `Новый заказ\n ${str}`)

    response.json(request.body); // отправляем пришедший ответ обратно
});

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});