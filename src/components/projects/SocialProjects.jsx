import { useEffect, useState } from 'react';
import ProjectView from '../layout/ProjectView';
import Reaction from '../features/Reaction';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function SocialProjects({ elementsRef }) {
  const [data, setData] = useState([]);
  const [popup, togglePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    const item = data[index];
    if (item) {
      setCurrentIndex(index);
      togglePopup(true);
    }
  };

  useEffect(() => {
    async function fetchAllProjects() {
      const response = await fetch(`${backendURL}/api/projects?db=social`);
      const appsData = await response.json();
      if (appsData.status === 'success') {
        // Transform the data to include file type information
        const transformedData = appsData.results.map((item) => ({
          ...item,
          fileType: item.pdf ? 'pdf' : 'image',
          file: item.pdf || item.image,
        }));
        setData(transformedData);
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
        id='social'
        data-name='SOCIAL'
        ref={(el) => (elementsRef.current[8] = el)}
        className='social-projects-showcase'
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            return (
              <Reaction
                key={index}
                title={item.title}
                like={item.likes}
                view={item.views}
                table='social'
                id={item.id}
              >
                <div className='project-item'>
                  <img
                    key={index}
                    src={`${backendURL}/${item.image}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleClick(index)}
                    alt={item.title}
                  />
                </div>
              </Reaction>
            );
          })}
      </div>
      {popup && data.length > 0 && (
        <div
          className='popup-overlay'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className='popup-content'
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f7f7f7',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <ProjectView
              onClose={() => togglePopup(false)}
              data={data}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              pdfFile={data[currentIndex]?.pdf}
            />
          </div>
        </div>
      )}
    </>
  );
}
