import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import ProgressLoader from './ProgressLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DEFAULT_TITLE = 'Project Details';

export default function PdfViewer({
  pdfFile,
  initialTitle,
  onTitleChange,
  onPageChange,
  onNumPagesChange,
}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitles, setPageTitles] = useState([]);
  const pagesRef = useRef();
  const pdfDocRef = useRef(null);

  const filePath = `https://proxy.abcd.graphics/backend.abcd.graphics/${pdfFile}`;

  useEffect(() => {
    // Reset states when filePath changes
    setIsLoading(true);
    setError(null);
    setPageNumber(1);
    setNumPages(0);
    setPageTitles([]);
  }, [filePath]);

  useEffect(() => {
    const handleScroll = () => {
      if (!pagesRef.current) return;

      const container = pagesRef.current;
      const pages = container.getElementsByClassName('pdf-page');
      if (!pages.length) return;

      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const containerBottom = containerTop + containerHeight;

      let currentPage = 1;
      let maxVisibility = 0;

      Array.from(pages).forEach((page, index) => {
        const pageTop = page.offsetTop - container.offsetTop;
        const pageBottom = pageTop + page.offsetHeight;

        // Calculate how much of the page is visible
        const visibleTop = Math.max(containerTop, pageTop);
        const visibleBottom = Math.min(containerBottom, pageBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const pageVisibility = visibleHeight / page.offsetHeight;

        if (pageVisibility > maxVisibility) {
          maxVisibility = pageVisibility;
          currentPage = index + 1;
        }
      });

      if (currentPage !== pageNumber) {
        setPageNumber(currentPage);
        if (onPageChange) {
          onPageChange(currentPage);
        }
        if (onTitleChange) {
          onTitleChange(
            pageTitles[currentPage - 1] || initialTitle || DEFAULT_TITLE
          );
        }
      }
    };

    const container = pagesRef.current;
    if (container) {
      // Initial check
      setTimeout(handleScroll, 100);

      // Add event listeners
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [pageTitles, initialTitle, onTitleChange, onPageChange, pageNumber]);

  const extractPageTitles = async (pdf) => {
    try {
      const titles = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const firstItems = textContent.items.slice(0, 10);

        const potentialTitle = firstItems.find((item) => {
          const text = item.str.trim();
          return (
            text.length > 3 &&
            !/^\d+$/.test(text) &&
            text !== '' &&
            !/^(font|page|header):/i.test(text) &&
            !/^\d+\s*(of|\/)\s*\d+$/i.test(text) &&
            !/^[^a-zA-Z]*$/.test(text)
          );
        });

        const cleanTitle = potentialTitle
          ? potentialTitle.str
              .trim()
              .replace(/^[^\w\s]+/, '')
              .replace(/\s+/g, ' ')
              .replace(/[^\w\s\-–—&()]/g, '')
              .trim()
          : '';

        titles.push(cleanTitle || initialTitle || DEFAULT_TITLE);
      }
      return titles;
    } catch (err) {
      console.error('Error extracting page titles:', err);
      return Array(pdf.numPages).fill(initialTitle || DEFAULT_TITLE);
    }
  };

  async function onDocumentLoadSuccess(pdf) {
    try {
      pdfDocRef.current = pdf;
      const newNumPages = pdf.numPages;
      setNumPages(newNumPages);
      if (onNumPagesChange) {
        onNumPagesChange(newNumPages);
      }
      const titles = await extractPageTitles(pdf);
      setPageTitles(titles);
      if (onTitleChange) {
        onTitleChange(titles[0] || initialTitle || DEFAULT_TITLE);
      }
      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error loading PDF:', err);
      setError('Failed to load PDF');
      setIsLoading(false);
    }
  }

  function onDocumentLoadError(err) {
    console.error('Error loading PDF:', err);
    setError('Failed to load PDF');
    setIsLoading(false);
  }

  if (error) {
    return <div className='pdf-error'>Error: {error}</div>;
  }

  return (
    <div
      ref={pagesRef}
      style={{
        position: 'relative',
        height: '100%',
        overflow: 'auto',
        scrollBehavior: 'smooth',
        msOverflowStyle: 'none' /* Hide scrollbar for IE and Edge */,
        scrollbarWidth: 'none' /* Hide scrollbar for Firefox */,
        '&::-webkit-scrollbar': {
          display: 'none' /* Hide scrollbar for Chrome, Safari and Opera */,
        },
      }}
    >
      <style>
        {`
          .pdf-scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <ProgressLoader loading={isLoading} />
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={null}
        noData={<div>No PDF file specified</div>}
        error={<div>Failed to load PDF</div>}
        className='pdf-scroll-container'
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className='pdf-page'
            // width={936}
            width={748}
            height={540}
            loading={null}
            error={null}
          />
        ))}
      </Document>
    </div>
  );
}
