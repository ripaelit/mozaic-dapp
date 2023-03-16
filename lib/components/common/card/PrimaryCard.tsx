import React from 'react';

export default function PrimaryCard({
  title = {
    text: 'Card Title',
    visible: true,
    indicatorVisible: true,
    color: '#ffffff',
  },
  style,
  width = '100%',
  description,
  children,
  tab,
}: {
  title?: {
    text?: string;
    visible?: boolean;
    indicatorVisible?: boolean;
    color?: string;
  };
  style?: string;
  width?: string;
  description?: string;
  children?: JSX.Element;
  tab?: JSX.Element;
}) {
  return (
    <>
      <div className='product-info-card-container'>
        {title.visible && (
          <div className='card-title-wrapper'>
            <div className='title-text-wrapper'>
              {title.indicatorVisible && <div className='solid-indicator'></div>}
              <h2>{title.text}</h2>
            </div>
            {tab && tab}
          </div>
        )}
        {!description ? children : <p className='card-description'>{description}</p>}
      </div>
      <style jsx>{`
        .product-info-card-container {
          display: flex;
          flex-direction: column;
          gap: 32px;
          background-color: var(--cardBgPrimary);
          border-radius: 10px;
          padding: 24px;
          width: ${width};
          ${style ? style : ''}
        }
        .card-title-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .title-text-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .solid-indicator {
          height: 32px;
          width: 16px;
          border-radius: 4px;
          background-color: ${title.color};
        }
        .card-description {
          color: var(--textSecondary);
        }
        @media screen and (max-width: 425px) {
          .product-info-card-container {
            padding: 32px 16px 32px 16px;
          }
        }
      `}</style>
    </>
  );
}
