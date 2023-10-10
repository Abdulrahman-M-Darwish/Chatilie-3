'use client';
import { Post } from '@/components';
import { useAppSelector } from '@/store';
import { useQuery, gql } from '@apollo/client';
import { Post as IPost, Profile as IProfile, User } from 'types';
import { GET_POSTS, GET_POSTS_AND_PROFILE } from './operations';

const Profile: React.FC = (props: any) => {
  const { profile: myProfile, user } = useAppSelector((state) => ({
    user: state.user as User,
    profile: state.profile as IProfile,
  }));
  const isMe = props.params.profileId === user.name;
  const { data } = useQuery(isMe ? GET_POSTS : GET_POSTS_AND_PROFILE, {
    variables: { postsOwnerId: props.params.profileId.slice(3) },
  });
  const profile = (data?.profile || myProfile) as IProfile;
  if (data)
    return (
      <div className='flex my-8 gap-4'>
        <div className='max-w-[400px] h-fit space-y-4 flex-1'>
          <div className='bg-base-300 py-4 rounded-box divide-y-2'>
            <div className='px-4'>
              <h2 className='text-2xl font-bold mb-2'>Intro -_-</h2>
              <pre className='Caption whitespace-pre-wrap py-2 px-2 break-words'>
                {profile.bio || (
                  <span className='font-bold text-error'>NO INTRO {'>_<'}</span>
                )}
              </pre>
            </div>
            <div className='px-4'>
              <h2 className='text-2xl font-bold my-2'>Hobbies {':">'}</h2>
              <ul className='flex flex-wrap gap-2'>
                {profile.hobbies.map((hobby, i) => (
                  <li
                    key={i}
                    className='btn btn-sm rounded-full capitalize even:bg-warning-content even:text-warning odd:bg-primary-content odd:text-primary-focus'
                  >
                    {hobby}
                  </li>
                ))}
              </ul>
              {profile.hobbies.length == 0 && (
                <pre className='font-bold text-error px-2'>
                  NO HOBBIES {'>_<'}
                </pre>
              )}
            </div>
          </div>
          <div className='bg-base-200 p-4 rounded-box'>
            <h2 className='text-2xl font-bold mb-4'>Photos _-_</h2>
            <div className='grid grid-cols-3 gap-2'>
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
            </div>
          </div>
          <div className='bg-base-200 p-4 rounded-box'>
            <h2 className='text-2xl font-bold mb-4'>Friends {'>_<'}</h2>
            <div className='grid grid-cols-3 gap-2'>
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
              <img
                src='https://api.dicebear.com/6.x/pixel-art/svg?accessoriesProbability=50&beardProbability=50&glassesProbability=50&hatProbability=50&seed=Abdulrahman-M-Darwish'
                alt='ok'
                className='bg-base-100 rounded-box'
              />
            </div>
          </div>
        </div>
        <ul className='Posts flex flex-col gap-4 max-w-xl w-full mx-auto'>
          {data.posts.map((post: IPost) => (
            <Post {...post} key={post.id} />
          ))}
        </ul>
      </div>
    );
};

export default Profile;
