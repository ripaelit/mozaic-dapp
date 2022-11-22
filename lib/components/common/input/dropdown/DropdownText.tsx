import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

type Option = {
  id: any;
  name: string;
  value: string;
};

export default function DropdownText({
  options,
  setSelectedOption,
  selectedOption,
}: {
  options: Option[];
  setSelectedOption: React.Dispatch<React.SetStateAction<Option>>;
  selectedOption: Option;
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <>
      <div className='text-dropdown-container'>
        <OutsideClickHandler
          onOutsideClick={() => {
            setOpenDropdown(false);
          }}>
          <div
            className={`text-dropdown-wrapper ${openDropdown && 'opened'}`}
            onClick={() => {
              setOpenDropdown(!openDropdown);
            }}>
            <p>{selectedOption.name}</p>
            <img
              className={`dropdown-icon ${openDropdown ? 'flipped' : ''}`}
              src='/assets/icons/ico.dropdown.svg'
              alt=''
            />
          </div>
          {openDropdown && (
            <div className='dropdown-options-wrapper'>
              {options.map((option: Option) => (
                <div
                  key={option.id}
                  className='dropdown-option'
                  onClick={() => {
                    setSelectedOption(option);
                    setOpenDropdown(!openDropdown);
                  }}>
                  <p>{option.name}</p>
                </div>
              ))}
            </div>
          )}
        </OutsideClickHandler>
      </div>
      <style jsx>{`
        .text-dropdown-container {
          position: relative;
          z-index: 1;
        }

        .text-dropdown-wrapper {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          width: 150px;
          max-width: max-content;
          border: 1px solid var(--outlinePrimary);
          padding: 8px 8px 8px 16px;
          gap: 8px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.875rem;
          user-select: none;
          transition: all 0.2s ease;
        }

        .text-dropdown-wrapper.opened {
          background-color: var(--outlinePrimary);
        }

        .text-dropdown-wrapper:hover {
          background-color: var(--outlinePrimary);
        }

        .dropdown-icon {
          transition: all 0.2s ease;
        }

        .dropdown-icon.flipped {
          transform: rotate(180deg);
        }

        .dropdown-options-wrapper {
          top: calc(100% + 8px);
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
        }
        .dropdown-option:hover {
          background-color: var(--textPrimaryT1);
        }
      `}</style>
    </>
  );
}
