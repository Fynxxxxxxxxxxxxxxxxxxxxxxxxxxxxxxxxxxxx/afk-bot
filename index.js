const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Tạo web server để giữ uptime trên Render
app.get('/', (req, res) => res.send('Bot AFK Minefort 24/7 dang chạy!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: '://minefort.com', // Vào sảnh chờ chính của hệ thống Minefort trước
    port: 25565,                           
    username: 'Minefort_AFK_Bot'
  });

  // Khi bot vừa đặt chân vào sảnh chờ (Lobby) thành công
  bot.on('spawn', () => {
    console.log('địt mẹ tuấn lồn');
    
    // Đợi đúng 3 giây cho server ổn định rồi tự động gõ lệnh nhảy vào server sinh tồn của bạn
    setTimeout(() => {
      bot.chat('/join cacanhtaichoismp'); 
      console.log('địt mẹ tuấn lồn');
    }, 3000);

    // Cứ mỗi 4 giây bot tự nhảy 1 lần để chống bị hệ thống kick AFK
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 4000);
  });

  // Xử lý khi bot bị mất kết nối (tự động vào lại sau 10 giây)
  bot.on('end', () => {
    console.log('Bot mat ket noi, dang tu dong vao lai sau 10 giay...');
    setTimeout(createBot, 10000); 
  });
  
  // Hiển thị lỗi nếu có trục trặc hệ thống
  bot.on('error', (err) => {
    console.log('Loi Bot:', err.message);
  });
}

createBot();
