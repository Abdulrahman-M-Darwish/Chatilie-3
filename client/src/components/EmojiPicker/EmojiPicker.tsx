'use client';
import React from 'react';
import { Dropdown } from 'react-daisyui';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';
import { useAppSelector } from '@/store';

type Props = {
  onEmojiSelect: (data: { name: string; native: string }) => void;
};

export const EmojiPicker = (props: Props) => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  return (
    <Dropdown.Menu className='relative z-50 p-0'>
      <Picker
        data={emojiData}
        theme={isDark ? 'dark' : 'light'}
        exceptEmojis={['rainbow-flag', 'transgender_flag']}
        perLine={7}
        emojiButtonColors={[
          'rgba(155,223,88,.7)',
          'rgba(149,211,254,.7)',
          'rgba(247,233,34,.7)',
          'rgba(238,166,252,.7)',
          'rgba(255,213,143,.7)',
          'rgba(211,209,255,.7)',
        ]}
        {...props}
      />
    </Dropdown.Menu>
  );
};
