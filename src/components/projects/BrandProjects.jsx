import { useEffect, useState } from 'react';
import ProjectView from '../layout/ProjectView';
import Reaction from '../features/Reaction';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function BrandProjects({ elementsRef }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, togglePopup] = useState(false);
  const [pdfFile, setPdfFile] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        setIsLoading(true);
        const response = await fetch(`${backendURL}/api/projects?db=branding`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const appsData = await response.json();
        if (appsData.status === 'success' && Array.isArray(appsData.results)) {
          console.log('Fetched data:', appsData.results);
          setData(appsData.results);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (popup) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [popup]);

  return (
    <>
      <div
        id='branding'
        data-name='BRANDING'
        ref={(el) => (elementsRef.current[6] = el)}
        className='brand-projects-showcase'
      >
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!isLoading && !error && data && data.length > 0
          ? data.map((item, index) => (
              <Reaction
                key={index}
                title={item.title}
                like={item.likes}
                view={item.views}
                table='branding'
                id={item.id}
              >
                <img
                  src={`${backendURL}/${item.image}`}
                  onClick={() => {
                    if (item.pdf && item.pdf.length > 0) {
                      setPdfFile(item.pdf);
                      setCurrentIndex(index);
                      togglePopup(true);
                    }
                  }}
                  alt={item.title}
                />
              </Reaction>
            ))
          : null}
      </div>
      {popup && pdfFile.length > 0 && (
        <div
          className='project-view-container'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f7f7f7',
            zIndex: 99999,
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
        >
          <ProjectView
            onClose={() => togglePopup(false)}
            data={data}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      )}
    </>
  );
}
