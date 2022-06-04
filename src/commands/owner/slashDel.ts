// Importing the libraries
import { CommandInteraction, CommandInteractionOption, MessageEmbed } from "discord.js";
import bot from "../../classes/bot";

// Exporting the command
export default {
    // The name of the command
    name: "del",

    // The category of the command
    category: "owner",

    // The desription of the command
    description: "delete a slash command",

    // The main method
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
        if (!client.owners.includes(interaction.user.id)) return interaction.reply({ embeds: [{ color: "RED", title: "This is an owner only command" }] });
        const embed = new MessageEmbed().setColor("RED").setTitle("Only owners can use this command");
        if (!client.owners.includes(interaction.user.id)) return interaction.reply({ embeds: [embed] });
        client.application?.commands.set([]);
        interaction.reply({ content: `My new activiy is :\`delete susassfu\`` });
    }
} 