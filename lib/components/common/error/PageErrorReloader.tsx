import React from 'react';

export default function PageErrorReloader({ message = 'Something Bad Happened!', icon }: any) {
  return (
    <>
      <div className='page-error-container'>
        {/* error icon */}
        <img
          className='error-display-icon'
          src={icon ? icon : '/assets/icons/ico.warning.svg'}
          alt=''
        />
        <p className='info'>{message}</p>
        <div
          className='reload-btn'
          onClick={() => {
            location.reload();
          }}>
          <img src='/assets/icons/ico.refresh.svg' alt='' />
          <p>Reload</p>
        </div>
      </div>
      <style jsx>{`
        .page-error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          padding-top: 90px;
          padding-bottom: 90px;
        }
        .error-display-icon {
          width: 180px;
          height: 180px;
          object-fit: contain;
        }
        .info {
          color: var(--textSecondary);
        }
        .reload-btn {
          display: flex;
          cursor: pointer;
          padding: 10px 20px;
          border: 1px solid var(--textSecondary);
          border-radius: 10px;
          transition: all 0.2s ease;
          gap: 8px;
        }

        .reload-btn:hover {
          background-color: #ffffff10;
        }
        .reload-btn:active {
          border-color: var(--alert);
        }
      `}</style>
    </>
  );
}
