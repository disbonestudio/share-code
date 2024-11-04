const config = require("./config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    PermissionsBitField,
    ButtonBuilder,
    ButtonStyle,
    userMention,
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ModalSubmitInteraction,
  } = require("discord.js");
  
  const client = new Client({
    intents: 53608447,
  });
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Thailand codes on top", { type: 3 });
  client.user.setStatus("idle");
});

// Handle the share code command


client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === `${config.prefix}sharecode`) {
    const filter = (response) => response.author.id === message.author.id;

    try {
      await message.author.send('Please provide your code:');
      const codeCollected = await message.author.dmChannel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
      const code = codeCollected.first().content;

      await message.author.send('Please provide a name for the code:');
      const codeNameCollected = await message.author.dmChannel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
      const codeName = codeNameCollected.first().content;

      await message.author.send('Please provide a description:');
      const descriptionCollected = await message.author.dmChannel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
      const description = descriptionCollected.first().content;

      await message.author.send('Please provide the version:');
      const versionCollected = await message.author.dmChannel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
      const version = versionCollected.first().content;

      await message.author.send('Please provide the owner:');
      const ownerCollected = await message.author.dmChannel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] });
      const owner = ownerCollected.first().content;

      const embed = new EmbedBuilder()
        .setTitle('Code Submission')
        .setDescription(`\`\`\`${code}\`\`\`\n\n**Code Name:** ${codeName}\n**Description:** ${description}\n**Version:** ${version}\n**Owner:** ${owner}`)
        .setColor(0xFFFFFF)
        .setFooter({ text: `Submitted by: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

      const targetChannel = message.guild.channels.cache.get(config.targetcodechannel);
      if (targetChannel) {
        await targetChannel.send(`<@&1180511808348491827> Update code:`);
        await targetChannel.send({ embeds: [embed] });
        message.reply('Your code has been submitted!');
      } else {
        message.reply('Could not find the target channel.');
      }
    } catch (error) {
      message.reply('You took too long to respond or an error occurred.');
      console.error(error);
    }
  }
});


// Log in the bot
client.login("MTMwMTIxMzk5ODUwMjY0MTY2NA.Gujtdq.C0ybfW39czgSuGVDjPKKgAzPqsUXYJrDr3GZl4"); // Use environment variable for your token
