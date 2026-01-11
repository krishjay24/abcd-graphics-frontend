import { saveAs } from 'file-saver';
import Form from '../common/Form';

export default function Contact({ elementsRef }) {
  const downloadPdf = () => {
    const fileUrl = '/resume.txt';
    const fileName = 'resume.txt';

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
      .catch((error) => console.error('Error downloading the File:', error));
  };

  return (
    <div
      data-name='PINKIE PROMISE'
      ref={(el) => (elementsRef.current[15] = el)}
      className='lets-connect-container'
    >
      <div>
        <div className='lets-connect-col-1'>
          <h2 className='lesgetacquaintedText'>LET’S GET ACQUAINTED</h2>
          <p>
            Woah! That was some journey. If you’ve reached here, then there’s no
            turning back. Let’s get some words exchanged over a call maybe.
          </p>
          <p>
            You might have a project idea, a question, a suggestion, or just
            want to say a plain ‘Hi’, fill up the form below and I’ll be faster
            than Flash in reaching back to you.
          </p>
          <p className='last'>I promise. Pinkie promise!</p>
        </div>
        {/* <div className="lets-connect-col-2"></div> */}
        <div className='lets-connect-col-3'>
          <Form />
        </div>
      </div>
    </div>
  );
}
