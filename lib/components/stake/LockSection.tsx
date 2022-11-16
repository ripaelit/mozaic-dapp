import InputCheckBtn from '../common/button/InputCheckBtn';
import PrimaryBtn from '../common/button/PrimaryBtn';
import PrimaryCard from '../common/card/PrimaryCard';
import InputWithLabel from '../common/input/InputWithLabel';
import Slider from '../common/Slider';
import Tab from '../common/tab/Tab';

export default function LockSection({
  amount,
  setMaxBalance,
  stakeAsset,
  onInput,
  time,
  setTime,
  range,
  selectedRange,
  setSelectedRange,
  onLock,
}: any) {
  return (
    <>
      <PrimaryCard
        style={`height: 100%;`}
        title={{
          visible: true,
          indicatorVisible: true,
          text: 'Lock',
          color: '#FFBC99',
        }}>
        <div className='lock-wrapper'>
          <div className='top'>
            <InputWithLabel
              placeholder={`Enter amount`}
              label={`Enter amount`}
              rightElement={
                <>
                  <InputCheckBtn
                    type='max'
                    onMax={setMaxBalance}
                    currentAsset={stakeAsset}
                    currentAmount={amount}
                  />
                </>
              }
              inputValue={amount}
              onChange={onInput}
            />
            <InputWithLabel
              datePicker={true}
              label='Choose lock time'
              inputValue={time}
              onChange={(e: any) => {
                setTime(e.target.value);
              }}
            />
            <Tab
              currentTab={selectedRange}
              tabs={range}
              setCurrentTab={setSelectedRange}
              style={`height: 72px; width: 100%`}
              itemStyle={`width: auto;`}
            />
          </div>
          <div className='bottom'>
            <Slider max={156} min={0} current={selectedRange.value} />
            <p className='info'>Your starting voting power will be 0.00 veMOZ!</p>
            <PrimaryBtn text='Create lock' onClick={onLock} />
          </div>
        </div>
      </PrimaryCard>
      <style jsx>{`
        .lock-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          gap: 48px;
          justify-content: space-between;
        }
        .top,
        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .info {
          color: var(--textSecondary);
        }
      `}</style>
    </>
  );
}
