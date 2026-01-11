import { useEffect, useState } from 'react';
import ProjectView from '../layout/ProjectView';
import Reaction from '../features/Reaction';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Carousels({ elementsRef }) {
  const [data, setData] = useState([]);
  const [popup, togglePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (file, type, index) => {
    if (file) {
      setCurrentIndex(index);
      togglePopup(true);
    }
  };

  useEffect(() => {
    async function fetchAllProjects() {
      const response = await fetch(`${backendURL}/api/projects?db=carousels`);
      const appsData = await response.json();
      if (appsData.status == 'success') {
        setData(appsData.results);
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
        id='carousels'
        data-name='CAROUSELS'
        ref={(el) => (elementsRef.current[9] = el)}
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
                table='carousels'
                id={item.id}
              >
                <img
                  key={index}
                  src={`${backendURL}/${item.image}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (item.pdf) {
                      handleClick(item.pdf, 'pdf', index);
                    } else {
                      handleClick(item.image, 'image', index);
                    }
                  }}
                />
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
            />
          </div>
        </div>
      )}
    </>
  );
}
