// Это пример кода для Discord бота, который можно запустить на сервере
// Для использования нужно создать бота в Discord Developer Portal

const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

const WEBHOOK_ID = '1447669331390627881'; // Ваш webhook ID

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const customId = interaction.customId;
    
    if (customId.startsWith('accept_') || customId.startsWith('reject_')) {
        const appId = customId.split('_')[1];
        const action = customId.startsWith('accept_') ? 'accepted' : 'rejected';
        
        // Обновляем статус в базе данных или localStorage
        // Здесь можно добавить логику для обновления статуса
        
        // Отправляем ответ
        await interaction.reply({
            content: `✅ Заявка #${appId} ${action === 'accepted' ? 'одобрена' : 'отклонена'}`,
            ephemeral: true
        });
        
        // Редактируем оригинальное сообщение
        const embed = interaction.message.embeds[0];
        embed.color = action === 'accepted' ? 0x2ecc71 : 0xff4a6a;
        embed.fields.push({
            name: '📋 Статус обновлен',
            value: action === 'accepted' ? 'ОДОБРЕНО ✅' : 'ОТКЛОНЕНО ❌',
            inline: false
        });
        
        await interaction.message.edit({
            embeds: [embed],
            components: [] // Убираем кнопки после обработки
        });
    }
});

client.login('YOUR_BOT_TOKEN'); // Токен вашего бота