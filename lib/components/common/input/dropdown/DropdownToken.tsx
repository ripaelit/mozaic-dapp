import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

type Token = {
  id: any;
  name: string;
  value: string;
  icon?: string;
};

export default function DropdownToken({
  tokens,
  setSelectedToken,
  selectedToken,
}: {
  tokens: Token[];
  setSelectedToken: React.Dispatch<React.SetStateAction<Token>>;
  selectedToken: Token;
}) {
  const [IsOpenDropdownToken, setIsOpenDropdownToken] = useState(false);
  return (
    <>
      <div className='dropdown-container'>
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsOpenDropdownToken(false);
          }}>
          <div
            className={`dropdown-wrapper ${IsOpenDropdownToken && 'opened'}`}
            onClick={() => {
              setIsOpenDropdownToken(!IsOpenDropdownToken);
            }}>
            <div className='dropdown-selected-item'>
              <img src={selectedToken.icon} alt='' />
              <p>{selectedToken.name}</p>
            </div>
            <img
              className={`dropdown-icon ${IsOpenDropdownToken ? 'flipped' : ''}`}
              src='/assets/icons/ico.dropdown.svg'
              alt=''
            />
          </div>
          {/* on dropdown open */}
          {IsOpenDropdownToken && (
            <div className='dropdown-options-wrapper'>
              {tokens.map((token: Token) => (
                <div
                  key={token.id}
                  className='dropdown-option'
                  onClick={() => {
                    setSelectedToken(token);
                    setIsOpenDropdownToken(!IsOpenDropdownToken);
                    // console.log("debug for token selection:", token)
                  }}>
                  <img src={token.icon} alt='' />
                  <p>{token.name}</p>
                </div>
              ))}
            </div>
          )}
        </OutsideClickHandler>
      </div>
      <style jsx>{`
        .dropdown-container {
          position: relative;
          z-index: 1;
        }

        .dropdown-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-width: 120px;
          max-width: max-content;
          padding: 8px 8px 8px 8px;
          background-color: var(--inputBtnBgPrimary);
          gap: 4px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          user-select: none;
          transition: all 0.2s ease;
        }

        .dropdown-wrapper.opened {
          background-color: var(--outlinePrimary);
        }

        .dropdown-wrapper:hover {
          background-color: var(--outlinePrimary);
        }

        .dropdown-selected-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .dropdown-selected-item > img {
          width: 28px;
          height: 28px;
        }

        .dropdown-icon {
          transition: all 0.2s ease;
        }

        .dropdown-icon.flipped {
          transform: rotate(180deg);
        }

        .dropdown-options-wrapper {
          bottom: calc(100% + 8px);
          right: 0;
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          min-width: 100%;
          font-size: 0.875rem;
          background-color: var(--bg);
          border-radius: 8px;
          box-shadow: var(--shadowPrimary);
        }

        .dropdown-option {
          padding: 4px 8px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dropdown-option:hover {
          background-color: var(--textPrimaryT1);
        }
        .dropdown-option > img {
          width: 28px;
          height: 28px;
        }

        @media screen and (max-width: 450px) {
          .dropdown-wrapper {
            min-width: max-content;
          }

          .dropdown-selected-item > p {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
