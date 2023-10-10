'use client';
import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { GiLovers } from 'react-icons/gi';
import { LuThumbsUp } from 'react-icons/lu';
import { useAppSelector } from '@/store';
import Image from 'next/image';
import { User } from 'types';

export const SideNav: React.FC = () => {
  const user = useAppSelector((state) => state.user) as User;
  return (
    <aside className='sticky top-5 h-fit'>
      <form className='flex'>
        <input
          type='text'
          placeholder='Looking for liars?'
          className='input input-bordered w-full rounded-box rounded-r-none focus:outline-none'
        />
        <button className='btn btn-neutral rounded-box rounded-l-none text-xl border-1 border-l-0 border-base-content border-opacity-20'>
          <BiSearchAlt />
        </button>
      </form>
      <div className='User bg-base-200 mt-4 flex flex-col items-center rounded-box overflow-hidden'>
        <div
          className='cover h-52 w-full bg-cover'
          style={{
            backgroundImage:
              "url('https://th.bing.com/th/id/R.f6bf1cde10785b593f0c54f27d64665d?rik=mo6%2fDpQY2rCetQ&riu=http%3a%2f%2fbestcoverpix.com%2fwp-content%2fuploads%2f2014%2f03%2fsmiley-fb-cover.jpg&ehk=qua4STZdkHOg9o4NOTGfQcZpzKSod6%2bwJRcXm5xYMjg%3d&risl=&pid=ImgRaw&r=0')",
          }}
        />
        <div className='avatar -mt-12 rounded-full border-4 border-base-content/80'>
          <button className='btn bg-base-100 btn-circle w-24 h-24 hover:text-primary hover:outline hover:bg-primary-content hover:ring hover:ring-primary hover:ring-offset-[12px] hover:ring-offset-primary-content overflow-hidden'>
            <img src={user.avatar} alt='avatar' />
          </button>
        </div>
        <h2 className='text-lg font-bold mt-4 text-primary-focus'>
          {user!.username}
        </h2>
        <h2 className='text-xs font-bold -mt-1 tracking-tighter opacity-50'>
          @{user!.name}
        </h2>
        <div className='stats bg-base-200 shadow mt-4 border-t border-base-content border-opacity-20 rounded-none'>
          <div className='stat'>
            <div className='relative'>
              <div className='stat-title absolute left-0 top-0 -translate-y-1/2'>
                Friends
              </div>
              <div className='stat-value text-primary flex gap-4'>
                25.6K
                <GiLovers />
              </div>
            </div>
            <div className='stat-desc'>Gained 7000 Friends this Month</div>
          </div>
          <div className='stat'>
            <div className='relative'>
              <div className='stat-title absolute left-0 top-0 -translate-y-1/2'>
                Likes
              </div>
              <div className='stat-value text-secondary flex gap-4'>
                2.6M
                <LuThumbsUp />
              </div>
            </div>
            <div className='stat-desc'>Gained 7000 Likes this Month</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
