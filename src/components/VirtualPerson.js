// import React from 'react';
// import './VirtualPerson.css';

// const VirtualPerson = ({ type }) => {
//   const avatarSrc =
//     type === 'user'
//       ? '/images/user-avatar.png' // Thay bằng đường dẫn ảnh người dùng
//       : '/images/bot-avatar.png'; // Thay bằng đường dẫn ảnh bot

//   return (
//     <div className="virtual-person-container">
//       <img src={avatarSrc} alt={`${type} avatar`} className="avatar" />
//     </div>
//   );
// };

// export default VirtualPerson;

import React from 'react';
import './VirtualPerson.css';
// Import các ảnh từ thư mục assets
import userAvatar from '../assets/bot.jpg';
import botAvatar from '../assets/user.png';

const VirtualPerson = ({ type }) => {
  // Dùng ảnh đã import dựa trên loại (user hoặc bot)
  const avatarSrc = type === 'user' ? userAvatar : botAvatar;
  
  return (
    <div className="virtual-person-container">
      <img src={avatarSrc} alt={`${type} avatar`} className="avatar" />
    </div>
  );
};

export default VirtualPerson;

