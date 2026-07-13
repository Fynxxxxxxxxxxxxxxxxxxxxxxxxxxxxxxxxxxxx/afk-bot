const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Tạo web server để giữ uptime trên Render
app.get('/', (req, res) => res.send('Bot AFK Minefort 24/7 dang chạy!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'cacanhtaichoismp.minefort.com', 
    port: 25565,                           
    username: 'Minefort_AFK_Bot'
    // Đã bỏ dòng version để bot tự động dò và khớp với phiên bản server của bạn
  });

  bot.on('spawn', () => {
    console.log('==== BOT DA VAO SERVER MINEFORT THANH CONG ====');
    // Cứ mỗi 4 giây bot tự nhảy 1 lần để chống bị kick AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 4000);
  });

  bot.on('end', () => {
    console.log('Bot mat ket noi, dang tu dong vao lai sau 10 giay...');
    setTimeout(createBot, 10000);
  });
  
  bot.on('error', (err) => {
    console.log('Loi Bot:', err.message);
  });
}

createBot();
