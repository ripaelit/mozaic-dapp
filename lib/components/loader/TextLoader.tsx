import React from 'react';

export default function TextLoader({ type = 'p', w = 30 }: any) {
  return (
    <>
      <div className='text-loader-container'></div>
      <style jsx>{`
        .text-loader-container {
          width: ${w}%;
          height: ${type === 'p'
            ? '16px'
            : type === 'h1'
            ? '32px'
            : type === 'h2'
            ? '28px'
            : type === 'label'
            ? '14px'
            : type};
          background-color: var(--textSecondary);
          opacity: 0.4;
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
