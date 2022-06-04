// Importing the libraries
import { CommandInteraction, CommandInteractionOption, MessageEmbed } from "discord.js";
import bot from "../../classes/bot";

// Exporting the command
export default {
    // The name of the command
    name: "usersname",

    // The category of the command
    category: "owner",

    // The desription of the command
    description: "Change the usersname of the bot",

    // The options for slash commands
    options: [{
        name: "usersname",
        type: "STRING",
        required: true,
        description: "The new usersname"
    }],

    // The main method
    run: async (client: bot, interaction: CommandInteraction, args: Array<String | CommandInteractionOption>) => {
        if (!client.owners.includes(interaction.user.id)) {
            return interaction.reply({ embeds: [{ color: "RED", title: "This is an owner only command" }] });
        }

        const embed = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("Only owners can use this command")
                            .setDescription("You need to be an owner to use this command");

        if (!client.owners.includes(interaction.user.id)){
            interaction.reply({
                embeds: [embed],
            });
        } 

        client.user?.setUsername(interaction.options.getString("usersname", true) || "No usersname");

        interaction.reply({ content: `My new activiy is :\`${interaction.options.getString("usersname")}\`` });
    }
}