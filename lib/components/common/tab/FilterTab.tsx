import React from 'react';
import { activeChecker } from '../../../utils/common';
import { Filter } from '../../../utils/filter';

export default function FilterTab({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: Filter[];
  currentTab: Filter;
  setCurrentTab: React.Dispatch<React.SetStateAction<Filter>>;
}) {
  return (
    <>
      <div className='filter-tab-container'>
        {tabs.map((item) => (
          <div
            key={item.id}
            className={`tab-wrapper ${activeChecker(item.value, currentTab.value)}`}
            onClick={() => {
              setCurrentTab(item);
            }}>
            {item.name}
          </div>
        ))}
      </div>
      <style jsx>{`
        .filter-tab-container {
          display: flex;
          gap: 8px;
          width: 100%;
          max-width: 400px;
        }
        .tab-wrapper {
          flex: 1;
          color: var(--textSecondary);
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          transition: all 0.2s ease;
          border-radius: 4px;
          cursor: pointer;
        }
        .active {
          color: var(--primary);
          background-color: var(--bg);
        }
      `}</style>
    </>
  );
}
