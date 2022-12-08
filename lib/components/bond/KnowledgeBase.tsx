import React from 'react';

const knowledgeBaseDate = [
  {
    id: 0,
    title: 'Exchange Your LP',
    icon: ['/assets/icons/assets/ico.moz.svg', '/assets/icons/assets/ico.avax.svg'],
    description: 'Exchange available LP tokens for governance token at below market rate Bonds.',
  },
  {
    id: 1,
    title: 'Linear Vesting',
    icon: ['/assets/icons/ico.clock.svg'],
    description:
      'Once you receive a  Bond, you are able to vest at any time within the vesting period.',
  },
  {
    id: 2,
    title: 'Below Market Rate ROI',
    icon: ['/assets/icons/assets/ico.moz.svg'],
    iconInfoText: '1.2%',
    description:
      'To receive a below market rate swap, find your desired Bond with a positive discount rate.',
  },
];

export default function KnowledgeBase() {
  return (
    <>
      <div className='knowledgebase-container'>
        {knowledgeBaseDate.map((data) => (
          <div className='knowledgebase-card-wrapper' key={data.id}>
            <div className='icon-wrapper'>
              <div className='icons'>
                {data.icon.map((icon, index) => (
                  <img key={index} src={icon} alt='' />
                ))}
              </div>
              {data.iconInfoText && <h2>{data.iconInfoText}</h2>}
            </div>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .knowledgebase-container {
          width: 100%;
          display: flex;
          gap: 20px;
        }
        .knowledgebase-card-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          justify-content: flex-start;
          background-color: var(--cardBgPrimary);
          padding: 32px;
          border-radius: 10px;
          text-align: center;
        }
        p {
          color: var(--textLabel);
        }
        img {
          width: 60px;
          height: 60px;
          margin: 0 -16px;
          border: 5px solid var(--cardBgPrimary);
          border-radius: 50%;
        }
        .icon-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .icons {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
