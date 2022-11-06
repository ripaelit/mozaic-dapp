import Link from 'next/link';
import React from 'react';

export default function PageTitle({
  title = 'Page Title',
  description = 'Automatic and intelligent multi-chain yield farming.',
  icon,
  href = '#',
  button,
}: {
  title?: string;
  icon?: string;
  description?: string;
  href?: string;
  button?: {
    text: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    icon?: string;
    href?: string;
  };
}) {
  return (
    <>
      <div className='page-title-container'>
        <div className='title'>
          {icon && <img className='title-icon' src={icon} alt={title + ' icon'} />}
          <h1>{title}</h1>
        </div>
        {!button ? (
          <p className='description'>
            {description}
            <a className='learn-more' href={href}>
              Learn more <img src='/assets/icons/ico.next.svg' />
            </a>
          </p>
        ) : (
          <>
            <Link href={button.href ? button.href : '#'}>
              <div className='title-btn' onClick={button.onClick ? button.onClick : () => {}}>
                <img src={button.icon} alt='' /> <p>{button.text}</p>
              </div>
            </Link>
          </>
        )}
      </div>
      <style jsx>{`
        .page-title-container {
          width: 100%;
          margin-top: 30px;
          margin-bottom: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .description {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          gap: 10px;
          color: var(--textSecondary);
        }

        .learn-more {
          font-size: 0.875rem;
          color: var(--textPrimary);
          display: flex;
          gap: 4px;
          flex-direction: row;
          align-items: center;
          transition: all 0.2s ease;
        }

        .learn-more:hover {
          text-decoration: underline;
        }

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

        @media screen and (max-width: 800px) {
          .description {
            flex-direction: column;
            align-items: flex-start;
            gap: 0px;
          }
        }
        @media screen and (max-width: 680px) {
          .page-title-container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
