import React from 'react';

export default function PageTitle({
  title = 'Page Title',
  description = 'Automatic and intelligent multi-chain yield farming.',
  href = '#',
}: {
  title?: string;
  description?: string;
  href?: string;
}) {
  return (
    <>
      <div className='page-title-container'>
        <h1>{title}</h1>
        <p className='description'>
          {description}
          <a className='learn-more' href={href}>
            Learn more <img src='/assets/icons/ico.next.svg' />
          </a>
        </p>
      </div>
      <style jsx>{`
        .page-title-container {
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
