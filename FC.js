const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json')
const base = require("./fc/base.json");
const bot = new Discord.Client();
let data
// Data
fs.readFile("./fc/data.json", (err, content) => {
  if(err) {
    console.log("error when reading data.json:\n" + err);
    process.exit(1);
  } else {
      try {
        data = JSON.parse(content);
      } catch (e) {
          console.log("error when parsing data.json:\n" + e);
          process.exit(1);
      }
    }
});
let saveData = () => {
    fs.writeFile("./fc/data.json", JSON.stringify(data), (a) => {(a) ? console.log("error writing save to data.json:\n" + a) : ""})
};
var disconnect = 0;
bot.on('ready', () => {
    disconnect = 0;
  console.log('My body is Reggie');
  //bot.user.setGame('+FC')
  console.log(`Connected as ${bot.user.username}.`);
});
bot.on('disconnect', () => {
  console.log('Disconnected.')
  disconnect = 1;
  setTimeout(() => {
        if (disconnect = 1) {
            process.exit(1);
        }
    }, 25000)
})
bot.on('reconnecting', () => {
  console.log('Reconnecting...')
})
var prefix = "+"
bot.on('message', message => {
	if (message.author === bot.user) return;
	const userID = message.author.id;
	const person = message.mentions.users.first();
	if (person) {
		if (person.id === bot.user.id) return message.channel.send("no u")
	}
	if (!data[userID]) {
    	data[userID] = Object.assign({}, base);
    	saveData();
  	}
	if (!data[userID].FC) {
    	data[userID].FC = "";
    	saveData();
  	}
      if (!data[userID].IGN) {
    	data[userID].IGN = "";
    	saveData();
  	}
      if (!data[userID].SFC) {
    	data[userID].SFC = "";
    	saveData();
  	}
      if (!data[userID].SIGN) {
    	data[userID].SIGN = "";
    	saveData();
  	}
    if (message.content.startsWith(prefix + "fc") || message.content.startsWith(prefix + "FC")) {
        if (message.content.split(" ")[1] == undefined) {
            message.channel.send("Usage:\n+FC (FC) (IGN)\nAdds Your FC and IGN to the bot so others can see it with +FC @YourName")
        }
		else if (message.content.split(" ")[1].length === 18 && !person) {
			const person = message.guild.members.get(message.content.split(" ")[1])
			if (!person || person == undefined) return message.channel.send("this user is not in the database yet.")
            embed = new Discord.RichEmbed().setColor("#CF010E").setTitle( person.username + "\'s fc").setDescription("").addField("FC", data[person.id].FC).addField("IGN",data[person.id].IGN).setImage(person.avatarURL)
            //message.channel.send(person.user.username+"'s FC is: "+data[person.id].FC+" and their IGN is "+data[person.id].IGN)
            message.channel.send({embed})
		}
        else if (!person) {
            data[userID].FC = message.content.split(" ")[1]
            data[userID].IGN = message.content.split(" ")[2]
            saveData();
            message.channel.send("Your FC is now " + message.content.split(" ")[1] +" and your IGN is now " + message.content.split(" ")[2])
        }
        else if (person) {
			if (!person || person === undefined) return message.channel.send("this user is not in the database yet.")
            embed = new Discord.RichEmbed().setColor("#CF010E").setTitle( person.username + "\'s fc").setDescription("").addField("FC", data[person.id].FC).addField("IGN",data[person.id].IGN).setImage(person.avatarURL)
            //message.channel.send(person.user.username+"'s FC is: "+data[person.id].FC+" and their IGN is "+data[person.id].IGN)
            message.channel.send({embed})
        }
    }
    if (message.content.startsWith(prefix + "sfc") || message.content.startsWith(prefix + "SFC")) {
        if (message.content.split(" ")[1] == undefined) {
            message.channel.send("Usage:\n+SFC (SFC) (Switch IGN)\nAdds Your SFC and Switch IGN to the bot so others can see it with +SFC @YourName")
        }
		else if (message.content.split(" ")[1].length === 18 && !person) {
			const person = message.guild.members.get(message.content.split(" ")[1])
			if (!person || person == undefined) return message.channel.send("this user is not in the database yet.")
            embed = new Discord.RichEmbed().setColor("#CF010E").setTitle( person.username + "\'s sfc").setDescription("").addField("SFC", data[person.id].SFC).addField("Switch IGN",data[person.id].SIGN).setImage(person.avatarURL)
            //message.channel.send(person.user.username+"'s FC is: "+data[person.id].FC+" and their IGN is "+data[person.id].IGN)
            message.channel.send({embed})
		}
        else if (!person) {
            data[userID].SFC = message.content.split(" ")[1]
            data[userID].SIGN = message.content.split(" ")[2]
            saveData();
            message.channel.send("Your FC is now " + message.content.split(" ")[1] +" and your IGN is now " + message.content.split(" ")[2])
        }
        else if (person) {
			if (!person || person === undefined) return message.channel.send("this user is not in the database yet.")
            embed = new Discord.RichEmbed().setColor("#CF010E").setTitle( person.username.split("#")[0] + "\'s sfc").setDescription("").addField("SFC", data[person.id].SFC).addField("Switch IGN",data[person.id].SIGN).setImage(person.avatarURL)
            //message.channel.send(person.user.username+"'s FC is: "+data[person.id].FC+" and their IGN is "+data[person.id].IGN)
            message.channel.send({embed})
        }
    }
});

bot.login(config.token); 
