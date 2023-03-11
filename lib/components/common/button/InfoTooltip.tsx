import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function InfoTooltip({ text, tooltipFor }: { text: string; tooltipFor: string }) {
  return (
    <>
      <div
        className='tooltip-wrapper'
        data-tooltip-id={'ico-btn-tooltip-' + tooltipFor}
        data-tooltip-content={text}
        data-tooltip-place='top'
        data-tooltip-variant='dark'>
        <Tooltip />
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M9.99984 16.6667C13.6817 16.6667 16.6665 13.682 16.6665 10.0001C16.6665 6.31818 13.6817 3.33341 9.99984 3.33341C6.31794 3.33341 3.33317 6.31818 3.33317 10.0001C3.33317 13.682 6.31794 16.6667 9.99984 16.6667ZM9.99984 18.3334C14.6022 18.3334 18.3332 14.6025 18.3332 10.0001C18.3332 5.39771 14.6022 1.66675 9.99984 1.66675C5.39746 1.66675 1.6665 5.39771 1.6665 10.0001C1.6665 14.6025 5.39746 18.3334 9.99984 18.3334Z'
            fill='#777E90'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M9.99984 5.83325C9.5396 5.83325 9.1665 6.20635 9.1665 6.66659C9.1665 7.12682 9.5396 7.49992 9.99984 7.49992C10.4601 7.49992 10.8332 7.12682 10.8332 6.66659C10.8332 6.20635 10.4601 5.83325 9.99984 5.83325ZM9.99984 9.16659C9.5396 9.16659 9.1665 9.53968 9.1665 9.99992V13.3333C9.1665 13.7935 9.5396 14.1666 9.99984 14.1666C10.4601 14.1666 10.8332 13.7935 10.8332 13.3333V9.99992C10.8332 9.53968 10.4601 9.16659 9.99984 9.16659Z'
            fill='#777E90'
          />
        </svg>
        <Tooltip id={'ico-btn-tooltip-' + tooltipFor} className='tooltip' />
      </div>
      <style jsx>{`
        .tooltip-wrapper {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>

      <style jsx global>{`
        .tooltip {
          background-color: black;
          max-width: 200px;
          color: var(--text) !important;
          border-radius: 4px;
          padding: 8px 12px;
          font-size: 12px;
          line-height: 16px;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
