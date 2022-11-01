import React from 'react';

export default function Separator({ type = 'horizontal', thickness = '1px' }) {
  return (
    <>
      <div className={`separator ${type}`}></div>
      <style jsx>{`
        .separator {
          background-color: var(--outlinePrimary);
        }
        .horizontal {
          width: 100%;
          height: ${thickness};
        }

        .vertical {
          width: ${thickness};
          height: 100%;
        }
      `}</style>
    </>
  );
}
