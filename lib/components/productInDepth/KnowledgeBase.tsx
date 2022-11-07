import React from 'react';
import { knowledgeBaseData } from '../../data/static/productInDepth';
import PrimaryCard from '../common/card/PrimaryCard';

export default function KnowledgeBase() {
  return (
    <>
      <div className='knowledgebase-cards-container'>
        {knowledgeBaseData.map((item) => (
          <PrimaryCard
            key={item.id}
            title={{
              text: item.title,
              visible: true,
              indicatorVisible: true,
              color: 'var(--primary)',
            }}
            style={`
            width: 100%;
            flex:1;
            min-height: inherit;
            `}
            description={item.description}
          />
        ))}
      </div>
      <style jsx>{`
        .knowledgebase-cards-container {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        @media (max-width: 680px) {
          .knowledgebase-cards-container {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
