import Link from 'next/link';
import React from 'react';

export default function PageTitle({
  title = 'Page Title',
  description = 'Automatic and intelligent multi-chain yield farming.',
  icon,
  href = '#',
  button,
  rightElement,
}: {
  title?: string;
  icon?: string;
  description?: string;
  href?: string;
  rightElement?: JSX.Element;
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
        {rightElement}
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
