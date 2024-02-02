// TelegramJoinLink.js
import React from 'react';
import { A } from '../A';
import { Lead } from 'app/pages/HomePage/components/Lead';

const TelegramJoinLink = ({  inviteCode }) => {
  const joinLink = `https://t.me/joinchat/${inviteCode}`;

  return (
    <div className='pt-4'>
      <Lead>
        Join the private Telegram group:{' '}
        <A href={joinLink} target="_blank" rel="noopener noreferrer">
          Join Telegram
        </A>
      </Lead>
    </div>
  );
};

export default TelegramJoinLink;
