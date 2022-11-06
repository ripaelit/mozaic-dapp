import React, { Dispatch, SetStateAction } from 'react';
import { TabItem } from '../../../types/common';
import { activeChecker } from '../../../utils/common';

export default function Tab({
  data,
  currentTab,
  setCurrentTab,
}: {
  data: TabItem[];
  currentTab: TabItem;
  setCurrentTab: Dispatch<SetStateAction<TabItem>>;
}) {
  return (
    <>
      <div className='tab-container'>
        {data.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeChecker(tab.name, currentTab.name)}`}
            onClick={() => {
              setCurrentTab(tab);
            }}>
            <p>{tab.name}</p>
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
        }
        .tab-item {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 6px;
        }
        .tab-item.active {
          background-color: var(--tabActive);
          box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.25), inset 0px -1px 1px rgba(0, 0, 0, 0.04),
            inset 0px 2px 0px rgba(255, 255, 255, 0.06);
        }
      `}</style>
    </>
  );
}
