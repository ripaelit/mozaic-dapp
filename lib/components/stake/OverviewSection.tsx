import PrimaryCard from '../common/card/PrimaryCard';

const OverviewSection = ({ data }: any) => {
  return (
    <>
      <PrimaryCard
        title={{
          visible: true,
          indicatorVisible: true,
          text: 'Overview',
          color: '#CABDFF',
        }}>
        <div className='overview-wrapper'>
          {data.map((item: any) => (
            <div key={item.id} className='overview-item-wrapper'>
              <div className='left'>
                <img src={item.icon} alt='' />
                <p>{`MOZ locked for ${item.duration} year`}</p>
              </div>
              <div className='right'>
                {item.amount}
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </PrimaryCard>
      <style jsx>{`
        .overview-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 24px;
        }
        .overview-item-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .left {
          display: flex;
          align-items: center;
          gap: 16px;
          color: var(--textLabel);
        }
      `}</style>
    </>
  );
};

export default OverviewSection;
