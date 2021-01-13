
const Discord = require('discord.js');


const {prefix, token} = require('./config.json');
const client = new Discord.Client();



client.once('ready', () => {
    console.log('NaveBot is online');
});


client.on('message', msg => {

  //if the command doesnt start with ! or is from a bot, do nothing
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;


//if the message sent is !ping, reply with pong
  else if(msg.content.toLowerCase() === prefix + 'ping'){
      msg.reply('pong');
    }
  //if the message is !youtube, reply with youtube weeee
  else if (msg.content.toLowerCase() === prefix + 'youtube'){
      msg.reply('youtube weeee');
    }

    else if (msg.content.toLowerCase().startsWith(prefix + 'kick')) {
      if (!msg.mentions.users.size) {
        return msg.reply('you need to tag a user in order to kick them!');
      }

      var member= msg.mentions.members.first();
      console.log(member);
      member.kick().then((member) => {
        msg.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
      }).catch(() => {
        msg.channel.send("Access Denied");
      });
    }



})

client.on('message', msg => {

  if(msg.content.toLowerCase() === 'poo' || msg.content.toLowerCase() === 'fuck'){

    var id = msg.author.id;

    console.log(id);


    msg.guild.members.cache.get(id).kick();

    const User = client.users.cache.get(id);
    msg.channel.send(":wave: " + User.username + " has been successfully kicked :point_right: ");

    //mem.kick().then(() => {

      //msg.channel.send(":wave: " + mem.displayName + " has been successfully kicked :point_right: ");
    //})

  }



})




/*

the old code
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        message.channel.send('pong!');
    }
    if (command == 'youtube'){
        message.channel.send('youtube weeee');
    }
});
*/

client.login(token);
