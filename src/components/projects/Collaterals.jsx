import { useEffect, useState } from 'react';
import ProjectView from '../layout/ProjectView';
import Reaction from '../features/Reaction';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Collaterals({ elementsRef }) {
  const [data, setData] = useState([]);
  const [popup, togglePopup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchAllProjects() {
      const response = await fetch(`${backendURL}/api/projects?db=collaterals`);
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

  const handleClick = (index) => {
    setCurrentIndex(index);
    togglePopup(true);
  };

  return (
    <>
      <div
        id='collaterals'
        data-name='COLLATERALS'
        ref={(el) => (elementsRef.current[10] = el)}
        className='print-projects-showcase'
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
                table='collaterals'
                id={item.id}
                disableAnimation={true}
              >
                <img
                  key={index}
                  src={`${backendURL}/${item.image}`}
                  onClick={() => {
                    if (item.pdf && item.pdf.length > 0) {
                      handleClick(index);
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
              backgroundColor: '#ffffff',
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
