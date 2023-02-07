import React from 'react';
import { DefaultBtnType, ModalBtnType } from '../../../types/common';

export default function PrimaryBtn({
  text = 'Button',
  type = 'default',
  icon,
  onClick = () => {
    // console.log('button pressed');
  },
}: DefaultBtnType) {
  return (
    <>
      <div
        className={`primary-btn-container ${type}`}
        onClick={type === ModalBtnType.disabled ? undefined : onClick}>
        <div className='btn-bg'></div>
        {icon && <img src={icon} alt='' />}
        <p>{text}</p>
      </div>
      <style jsx>{`
        .primary-btn-container {
          position: relative;
          width: 100%;
          border-radius: 30px;
          height: 60px;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid;
          user-select: none;
        }

        .default {
          color: var(--bg);
          background-color: var(--textPrimary);
          border-color: var(--textPrimary);
        }

        .default:hover {
          background-color: var(--textPrimaryT1);
          color: var(--textPrimary);
        }

        .default:active {
          background-color: var(--textPrimaryT1);
          color: var(--primary);
          border-color: var(--primary);
        }

        .disabled {
          background-color: var(--textPrimaryT1);
          border-color: var(--textPrimaryT1);
          cursor: default;
          font-weight: 400;
          color: var(--textLabel);
        }

        .warning {
          background-color: transparent;
          border-color: var(--alert);
          font-weight: 400;
          color: var(--alert);
        }
        .warning:hover {
          background-color: var(--textPrimaryT1);
          color: var(--primary);
          border-color: var(--primary);
        }

        .warning:active {
          border-color: var(--textPrimaryT1);
          color: var(--textPrimary);
        }
      `}</style>
    </>
  );
}
