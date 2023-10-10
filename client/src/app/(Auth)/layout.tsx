'use client';
import { useEffect, useState } from 'react';
import { Phone } from '@/components';

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [match, setMatch] = useState<boolean>(true);
  useEffect(() => {
    setMatch(window.matchMedia('(min-width: 960px)').matches);
    window.addEventListener('resize', () =>
      setMatch(window.matchMedia('(min-width: 960px)').matches),
    );
    return () =>
      window.removeEventListener('resize', () =>
        setMatch(window.matchMedia('(min-width: 960px)').matches),
      );
  }, []);
  return (
    <div className="flex max-md:flex-col sm:min-h-screen" data-theme="winter">
      <div
        className="Hero sm:flex-1 bg-base-200 shadow flex flex-col items-center justify-center max-sm:min-h-screen"
        style={
          match
            ? { WebkitClipPath: 'polygon(0 0%, 100% 0%, 85% 100%, 0% 100%)' }
            : {}
        }
      >
        <Phone />
        <div className="md:mr-8 px-2 max-sm:text-center">
          <h1 className="flex max-sm:justify-center items-center text-4xl">
            Hi There
            <span className="text-5xl animate-bounce" style={{ scale: '-1 1' }}>
              👋
            </span>
          </h1>
          <p className="max-w-sm opacity-75 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit totam
            mollitia hic, et officiis pariatur commodi, nesciunt assumenda illo
            voluptatum aut quas quidem perspiciatis maiores natus nisi laborum
            culpa minima. Et beatae neque repellendus iure? Laudantium dolorum a
            incidunt fugiat?
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
