import React from 'react';

export default function IconLoader({ d = '32px' }) {
  return (
    <>
      <div className='icon-loader-container'></div>
      <style jsx>{`
        .icon-loader-container {
          width: ${d};
          height: ${d};
          border-radius: ${d};
          opacity: 0.6;
          background: linear-gradient(
            -45deg,
            #ffffff10,
            var(--textSecondary),
            #ffffff20,
            var(--textPrimary)
          );
          background-size: 600% 600%;
          animation: gradient 5s ease infinite;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
