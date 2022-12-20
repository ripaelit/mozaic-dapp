import ReactSlider from 'react-slider';
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
              inputType={'week'}
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
            <ReactSlider
              min={1}
              max={156}
              className='horizontal-slider'
              thumbClassName='lock-slider-thumb'
              trackClassName='lock-slider-track'
              value={time}
              onChange={setTime}
              renderThumb={(props, state) => (
                <div {...props} className='handle'>
                  <div className='inner'>{state.valueNow}</div>
                </div>
              )}
            />
            <p className='info'>
              Your starting voting power will be {!amount ? 0 : amount} veMOZ over {time}{' '}
              {time > 1 ? 'weeks' : 'week'}!
            </p>
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
