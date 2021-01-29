
const Discord = require('discord.js');
const db = require("quick.db");

const {prefix, token} = require('./config.json');
const client = new Discord.Client();

var warnings = new db.table('warnings');

client.once('ready', () => {

    console.log('ModBot is online');
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

      member.kick().then((member) => {
        msg.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
      }).catch(() => {
        msg.channel.send("Access Denied");
      });
    }
})


client.on('message', msg => {

  if(msg.content.toLowerCase().includes("shit") || msg.content.toLowerCase().includes("fuck")){
    var id = msg.author.id;
    const User = client.users.cache.get(id);
    console.log(id + "-------getting the bad word from this user");
    console.log(warnings.get(id));
    
    if(warnings.get(id) === null || warnings.get(id) === 0){

      warnings.set(id.toString(), 1);
      msg.channel.send( User.username + " you now have 1 warning");
      console.log(warnings.get(id));
    }
    else if(warnings.get(id) != null || warnings.get(id) != 0){
      warnings.add(id, 1);
      msg.channel.send( User.username + " you now have " + warnings.get(id) + " warning(s)");
      if(warnings.get(id) == 2){
        msg.channel.send( User.username + " one more warning and you will be kicked!");
      }
      console.log(id + " has " + warnings.get(id) + " warnings");
    }
    if(Number(warnings.get(id.toString())) == 3){
      console.log("triggered");
      msg.guild.members.cache.get(id).kick();
      msg.channel.send(":wave: " + User.username + " has been successfully kicked :point_right: ");
      warnings.set(id, 0);
    }
    
  }

})

client.login(token);
