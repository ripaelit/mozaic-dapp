import React, { Dispatch, SetStateAction } from 'react';
import { TabItem } from '../../../types/common';
import { activeChecker } from '../../../utils/common';

export default function Tab({
  tabs,
  currentTab,
  setCurrentTab,
  style,
  itemStyle,
}: {
  tabs: TabItem[];
  currentTab: TabItem;
  setCurrentTab: Dispatch<SetStateAction<TabItem>>;
  style?: string;
  itemStyle?: string;
}) {
  return (
    <>
      <div className='tab-container'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeChecker(tab.name, currentTab.name)}`}
            onClick={() => {
              setCurrentTab(tab);
            }}>
            <p className='desktop'>{tab.name}</p>
            <p className='mobile'>{tab.shortName && tab.shortName}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .tab-container {
          display: flex;
          height: 48px;
          padding: 4px;
          background-color: var(--bg);
          align-items: center;
          justify-content: center;
          padding: 8px;
          font-size: 0.875rem;
          border-radius: 12px;
          transition: all 0.2s ease;
          user-select: none;
          ${style ? style : ''}
        }
        .tab-item {
          width: 100px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 6px;
          ${itemStyle ? itemStyle : ''}
        }
        .tab-item.active {
          background-color: var(--tabActive);
          box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px rgba(0, 0, 0, 0.04),
            inset 0px 2px 0px rgba(255, 255, 255, 0.06);
          font-weight: bold;
        }

        .mobile {
          display: none;
        }

        @media screen and (max-width: 1000px) {
          .mobile {
            ${currentTab.shortName ? 'display: inline-block;' : ''}
          }
          .desktop {
            ${currentTab.shortName ? 'display: none;' : ''}
          }
        }

        @media screen and (max-width: 625px) {
          .tab-container {
            width: 100%;
          }
        }
        @media screen and (max-width: 425px) {
          .tab-item {
            width: auto;
            padding: 0 10px 0 10px;
          }
        }
      `}</style>
    </>
  );
}
