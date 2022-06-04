// Importing the libraries
import { CommandInteraction, CommandInteractionOption, Message, MessageEmbed } from "discord.js";
import bot from "../../classes/bot";

// Exporting the command
export default {
    // The name of the command
    name: "random",

    // The category of the command
    category: "general",

    // The desription of the command
    description: "Get the ping of the bot",

    // The options for slash commands
    options: [
        {
            name: "single",
            type: "STRING",
            description: "The new single",
            required: false,
        },
        {
            name: "double",
            type: "STRING",
            description: "The new double",
            required: false,
        }
    ],

    // The main method
    run: async (client: bot, message: Message | CommandInteraction, args: Array<CommandInteractionOption>) => {

        // single or double
        if(args.length === 0) return message.reply({ content: `Please specify a type of dice` });

        function toValue(params: String) {
            let values = params.split(',')
        
            for (let i = 0; i < values.length; i++) {
                let random = Math.floor(Math.random() * values.length)
                let temp = values[i]
                values[i] = values[random]
                values[random] = temp
            }
        
            return values
        }
        
        let embed = await new MessageEmbed()
            .setTitle(`Random Dice`)
            .setColor(0x00AE86)
            
        // let addFields: any = {}
        interface addFields{
            name: string,
            value: string,
            inline?: boolean
        }

        let addFields: addFields[] = []

        async function toEmbed(value: String[], types: boolean): Promise<void> {
            // if types == true, then it is a single
            if(types == true) {
                addFields.push(
                    {
                        name: `ทำคนเดียว`,
                        value: `${value.join(', ')}`
                    }
                )
            } else if(types == false) {
                let before_value: String[] = value;
                let value_length = value.length;
                let after_value: String[] = [];
                for(let i = 0; i < value_length; i++) {
                    if(before_value.length == 0) {
                        break;
                    }
                    let a = before_value.length !== 0 ? before_value.shift() : "ไม่มีคู่";
                    let b = before_value.length !== 0 ? before_value.shift() : "ไม่มีคู่";
                    after_value.push(`${a} คู่กับ ${b}`)
                }
                addFields.push(
                    {
                        name: `เป็นคู่`,
                        value: `${after_value.join(',\n ')}`
                    }
                )
            } else {
                await embed.setDescription(`มีบางอย่างผิดพลาด`)
            }
        }

        try {
            console.log(`Args Length: ${args.length}`)
            for (let i = 0; i < args.length; i++) {
               if(args[i].value && typeof args[i].value === "string") {
                    // if name == single : true
                    // if name == double : false 
                    let types: boolean = args[i].name === "single" ? true : false
                    console.log(types)
                    let value_random: string[] = await toValue(args[i].value!.toString());
                    await toEmbed(value_random, types);
               }
            }
            await embed.addFields(addFields)
            await message.reply({ embeds: [embed] })
        } catch (error) {
            console.log(error);
        }
 
    }
}