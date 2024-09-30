import React from 'react';

// interface NewestProps {
//   // You can define any props needed here
// }

const Newest: React.FC = ({
  
}) => {
  return (
    <iframe 
      allow="autoplay *; encrypted-media *;" 
      height="150" 
      className="w-full max-w-[660px] overflow-hidden bg-transparent border-none" 
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/cn/album/the-moment-i-knew-taylors-version/1590368448?i=1590368746" 
    />
  );
};

export default Newest;