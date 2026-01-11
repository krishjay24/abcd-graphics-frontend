import { useState } from 'react';
import { saveAs } from 'file-saver';
import Button2 from '../ui/Button2';
import PdfViewer from './PdfViewer';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const DEFAULT_TITLE = 'Project Details';

export default function PagepopUp({
  togglePopup,
  data,
  currentIndex,

  setCurrentIndex,
  pdfFile,
  title: initialTitle,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(
    initialTitle || data?.[currentIndex]?.title || DEFAULT_TITLE
  );
  const [error, setError] = useState(null);

  const downloadFile = () => {
    const fileUrl = data
      ? `https://proxy.abcd.graphics/.intro-container.graphics/${
          data[currentIndex].pdf || data[currentIndex].image
        }`
      : `https://proxy.abcd.graphics/.intro-container.graphics/${pdfFile}`;
    const fileName = data
      ? data[currentIndex].pdf || data[currentIndex].image
      : pdfFile;

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, fileName);
        console.log(blob);
      })
      .catch((error) => {
        console.error('Error downloading the File:', error);
        setError('Failed to download file');
      });
  };

  const handlePrevious = () => {
    if (data && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setPageNumber(1);
      setNumPages(0);
      setError(null);
      setCurrentTitle(
        data[currentIndex - 1]?.title || initialTitle || DEFAULT_TITLE
      );
    }
  };

  const handleNext = () => {
    if (data && currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setPageNumber(1);
      setNumPages(0);
      setError(null);
      setCurrentTitle(
        data[currentIndex + 1]?.title || initialTitle || DEFAULT_TITLE
      );
    }
  };

  const currentFilePath = data
    ? `https://proxy.abcd.graphics/backend.abcd.graphics/${data[currentIndex].pdf}`
    : `https://proxy.abcd.graphics/backend.abcd.graphics/${pdfFile}`;

  const fileType = data ? (data[currentIndex].pdf ? 'pdf' : 'image') : 'pdf';

  const renderContent = () => {
    if (fileType === 'pdf') {
      return (
        <PdfViewer
          pdfFile={data ? data[currentIndex].pdf : pdfFile}
          initialTitle={initialTitle}
          onTitleChange={setCurrentTitle}
          onPageChange={setPageNumber}
          onNumPagesChange={setNumPages}
        />
      );
    } else if (fileType === 'image') {
      return (
        <img
          src={`${backendURL}/${data[currentIndex].image}`}
          alt='Popup Image'
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          onError={() => setError('Failed to load image')}
        />
      );
    }
  };

  if (error) {
    return (
      <div className='page-popup'>
        <div className='error-container'>
          <p>Error: {error}</p>
          <Button2
            onClick={() => togglePopup(false)}
            className='resume-download'
          >
            Close
          </Button2>
        </div>
      </div>
    );
  }

  return (
    <div className='page-popup'>
      {data && (
        <div className='next-page-button'>
          <p>
            {currentIndex > 0
              ? data[currentIndex - 1]?.title || DEFAULT_TITLE
              : ''}
          </p>
          <Button2
            onClick={handlePrevious}
            className='resume-download'
            style={{ opacity: currentIndex > 0 ? 1 : 0.5 }}
          >
            Previous Project
          </Button2>
        </div>
      )}
      <div className='title-holder'>
        <div className='page-popup-container'>
          {fileType === 'pdf' && numPages > 0 && (
            <div className='page-count-holder'>
              <div className='page-count'>
                {pageNumber} / {numPages}
              </div>
            </div>
          )}
          <div
            className='pages'
            style={{
              height: 'calc(100vh - 200px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p>{currentTitle}</p>
            <div className='mobile-pdf-nav'>
              {fileType === 'pdf' && numPages > 0 && (
                <div className='page-count'>
                  {pageNumber} / {numPages}
                </div>
              )}
              <div className='popup-close' onClick={() => togglePopup(false)}>
                <img src='images/cross.svg' alt='Close' />
              </div>
              <div onClick={downloadFile} className='popup-download'>
                <img src='images/progress.svg' alt='Download' />
              </div>
            </div>
            {renderContent()}
          </div>
          <div className='popup-nav'>
            <div className='popup-close' onClick={() => togglePopup(false)}>
              <img src='images/cross.svg' alt='Close' />
            </div>
            <div onClick={downloadFile} className='popup-download'>
              <img src='images/progress.svg' alt='Download' />
            </div>
          </div>
        </div>
      </div>

      {data && (
        <div className='next-page-button'>
          <p>
            {currentIndex < data.length - 1
              ? data[currentIndex + 1]?.title || DEFAULT_TITLE
              : ''}
          </p>
          <Button2
            onClick={handleNext}
            className='resume-download'
            style={{ opacity: currentIndex < data.length - 1 ? 1 : 0.5 }}
          >
            Next Project
          </Button2>
        </div>
      )}
    </div>
  );
}
