import PrimaryCard from '../common/card/PrimaryCard';
import Separator from '../common/Separator';

const DetailsSection = ({ data }: any) => {
  return (
    <>
      <PrimaryCard
        title={{
          visible: true,
          indicatorVisible: true,
          text: 'Details',
          color: '#B5E4CA',
        }}>
        <div className='details-wrapper'>
          <div className='details-item'>
            <p className='details'>veMOZ Balance</p>
            <p className='value'>{data.veMozBalance.toLocaleString('en-US')}</p>
          </div>
          <Separator />
          <div className='details-item'>
            <p className='details'>Total MOZ locked</p>
            <p className='value'>{data.lockedMoz.toLocaleString('en-US')}</p>
          </div>
          <Separator />
          <div className='details-item'>
            <p className='details'>Total veMOZ</p>
            <p className='value'>{data.totalVeMoz.toLocaleString('en-US')}</p>
          </div>
          <Separator />
          <div className='details-item'>
            <p className='details'>Average lock time</p>
            <p className='value'>{data.averageLockTime} Years</p>
          </div>
          <Separator />
          <div className='details-item'>
            <p className='details'>TVL</p>
            <p className='value'>${data.tvl.toLocaleString('en-US')}</p>
          </div>
        </div>
      </PrimaryCard>
      <style jsx>{`
        .details-wrapper {
          display: flex;
          width: 100%;
          gap: 16px;
          flex-direction: column;
        }
        .details-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .details {
          color: var(--textLabel);
        }
        .value {
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default DetailsSection;
