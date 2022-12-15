import React, { useState } from 'react';
import { ModalBtnType } from '../../../../types/common';
import InputBox from '../../input/InputBox';
import InputWithLabel from '../../input/InputWithLabel';
import Modal from '../Modal';

export default function FeedbackModal({
  title = 'title',
  setShowModal,
}: {
  title: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sender, setSender] = useState<string>('');

  const submitFeedback = () => {
    const feedback = {
      id: Math.random().toString(),
      time: new Date().getTime(),
      sender: sender,
      feedbackType: title,
      subject: subject,
      message: message,
    };
    console.log(feedback);
  };

  return (
    <>
      <Modal
        title={title}
        setModalVisibility={setShowModal}
        modalBtn={{
          text: 'Submit',
          type: ModalBtnType.default,
          onClick: () => {
            submitFeedback();
          },
        }}>
        <div className='feedback-modal-container'>
          <InputBox
            onChange={setSubject}
            inputType='text'
            inputValue={subject}
            placeholder={'Subject'}
          />
          <InputBox
            onChange={setMessage}
            inputType='text'
            textarea
            inputValue={message}
            placeholder={'Write something...'}
          />
        </div>
      </Modal>
      <style jsx>{`
        .feedback-modal-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
      `}</style>
    </>
  );
}
