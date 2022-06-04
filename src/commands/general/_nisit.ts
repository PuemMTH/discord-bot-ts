import { CommandInteraction, CommandInteractionOption, Message, MessageActionRow, MessageAttachment, MessageButton, MessageEmbed, Options } from "discord.js";
import bot from "../../classes/bot";
import { drawImage, Text } from "../../classes/image";
import axios from "axios";

export default {
    name: "nisit",
    category: "general",
    description: "Get the ping of the bot",
    options: [
        {
            name: "kuid",
            type: "STRING",
            description: "The student's kuid",
            required: true,
        }
    ],
    run: async (client: bot, message: Message | CommandInteraction, args: Array<CommandInteractionOption>) => {
        let ListText: Text[] = [];
        let kuid: string = args[0]?.value?.toString() ?? "";
        console.log('Image saved')
        await axios.get(`http://puem.codes/studen/ids/${kuid}`)
        .then(async (res) => {
            console.log('Axios Fetch Success')
            await ListText.push(
                {
                    text: `รหัสนิสิต: \t${res.data[0].text}`,
                    color: '#000',
                },
                {
                    text: `ชื่อ-สกุล: \t${res.data[1].text}`,
                    color: '#000',
                },
                {
                    text: `คณะ: \t\t${res.data[2].text}`,
                    color: '#000',
                },
                {
                    text: `สาขา: \t${res.data[3].text}`,
                    color: '#000',
                },
                {
                    text: `สถานะ: \t${res.data[4].text}`,
                    color: '#000',
                },
                {
                    text: `วิทยาเขต: \t${res.data[5].text}`,
                    color: '#000',
                }
            )
            const BufferImage = new drawImage(1920, 1080).saveImage(`./image/logs/${kuid}.png`, '100px 2005_iannnnnGMO', ListText);
            const imageSand = new MessageAttachment(await BufferImage);
            const ActionRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Detail')
                        .setURL(`http://nisit-ku.ku.ac.th/WebForm_Index_Report.aspx?stdid=${kuid}&h=0`)
                        .setStyle('LINK'),
                        // .setCustomId('primary')
                        // .setDisabled(true),
                );
            await message.reply(
                {
                    files: [imageSand],
                    components: [ActionRow],
                    ephemeral: true
                }
            );
        })
        .catch(async (err) => {
            console.log(err)
            await message.reply(
                {
                    content: 'มีบางอย่างเกิดข้อผิดพลาด', 
                    ephemeral: true,
                }
            )
        });

    }
}