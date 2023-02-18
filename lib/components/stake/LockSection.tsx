import ReactSlider from 'react-slider';
import InputCheckBtn from '../common/button/InputCheckBtn';
import PrimaryBtn from '../common/button/PrimaryBtn';
import PrimaryCard from '../common/card/PrimaryCard';
import InputWithLabel from '../common/input/InputWithLabel';
import Tab from '../common/tab/Tab';
import InputLabel from '../common/input/InputLabel';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import InputBox from '../common/input/InputBox';

export default function LockSection({
  amount,
  setMaxBalance,
  stakeAsset,
  onInput,
  time,
  onSliderChange,
  range,
  selectedRange,
  setSelectedRange,
  onLock,
  unlockTime,
}: any) {
  const [unlockDate, setUnlockDate] = useState<any>(null);

  useEffect(() => {
    if (unlockTime) {
      setUnlockDate(format(unlockTime, 'dd MMM, yyyy - hh:mma'));
    }
  }, [unlockTime]);

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
            <InputLabel label={'Choose Lock Time'} />

            {/* Time selection tab */}
            <Tab
              currentTab={selectedRange}
              tabs={range}
              setCurrentTab={setSelectedRange}
              style={`height: 72px; width: 100%`}
              itemStyle={`width: auto;`}
            />
            <ReactSlider
              min={1}
              max={36}
              className='horizontal-slider'
              thumbClassName='lock-slider-thumb'
              trackClassName='lock-slider-track'
              value={time}
              onChange={onSliderChange}
              renderThumb={(props, state) => (
                <div {...props} className='handle'>
                  <div className='inner'>{state.valueNow}</div>
                </div>
              )}
            />
          </div>
          <div className='bottom'>
            <p className='info'>
              Your starting voting power will be {!amount ? 0 : amount} veMOZ over {time}{' '}
              {time > 1 ? 'months' : 'month'}!
            </p>
            <InputBox readOnly={true} inputType='text' inputValue={unlockDate} />
            <PrimaryBtn text='Create lock' onClick={onLock} />
          </div>
        </div>
      </PrimaryCard>
      <style jsx global>{`
        .horizontal-slider {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;
        }
        .lock-slider-track-0 {
          height: 4px;
          background-color: var(--primary);
        }
        .lock-slider-track-1 {
          height: 4px;
          background-color: var(--outlinePrimary);
        }
        .handle:focus-visible {
          outline: var(--primary);
        }
        .handle {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          width: 24px;
          border-radius: 12px;
          background-color: var(--primary);
          user-select: none;
          cursor: pointer;
        }
        .inner {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 75%;
          height: 75%;
          border-radius: 50%;
          color: var(--primaryDark);
          font-size: 0.675rem;
          font-weight: bold;
          background-color: var(--textPrimary);
          box-shadow: 0 3px 4px rgba(0, 0, 0, 0.34);
        }
      `}</style>
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
