const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Tạo web server để giữ uptime
app.get('/', (req, res) => res.send('Bot AFK Minefort 24/7 dang chạy!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: '://minefort.com', 
    port: 25565,                           
    username: 'Minefort_AFK_Bot', 
    version: '1.20.1'                      
  });

  bot.on('spawn', () => {
    console.log('==== BOT DA VAO SERVER MINEFORT THANH CONG ====');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 4000);
  });

  bot.on('end', () => {
    console.log('Bot mat ket noi, dang vao lai...');
    setTimeout(createBot, 10000);
  });
  
  bot.on('error', (err) => console.log('Loi:', err.message));
}
createBot();
