import Link from 'next/link';
import React from 'react';

export default function TitleBtn({ button }: any) {
  return (
    <>
      <Link href={button.href ? button.href : '#'}>
        <div className='title-btn' onClick={button.onClick ? button.onClick : () => {}}>
          <img src={button.icon} alt='' /> <p>{button.text}</p>
        </div>
      </Link>
      <style jsx>{`
        .title-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.875rem;
          padding: 16px;
          border: 1px solid var(--outlinePrimary);
          gap: 10px;
          border-radius: 10px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .title-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .title-btn:active {
          border-color: var(--textSecondary);
          color: var(--textSecondary);
        }
      `}</style>
    </>
  );
}
