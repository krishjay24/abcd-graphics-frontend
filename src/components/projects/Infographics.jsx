import { useEffect, useState } from 'react';
import PagepopUp from '../common/Popup';
import Reaction from '../features/Reaction';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Infographics({ elementsRef }) {
  const [data, setData] = useState([]);
  const [popup, togglePopup] = useState(false);
  const [pdfFile, setPdfFile] = useState('');

  useEffect(() => {
    async function fetchAllProjects() {
      const response = await fetch(
        `${backendURL}/api/projects?db=infographics`
      );
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
        id='infographics'
        data-name='INFOGRAPHICS'
        ref={(el) => (elementsRef.current[13] = el)}
        className='packaging-projects-showcase'
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
                table='infographics'
                id={item.id}
              >
                <img
                  key={index}
                  src={`${backendURL}/${item.image}`}
                  onClick={() => {
                    if (item.pdf && item.pdf.length > 0) {
                      setPdfFile(item.pdf);
                      togglePopup(true);
                    }
                  }}
                />
              </Reaction>
            );
          })}
      </div>
      {popup && pdfFile.length > 0 && (
        <PagepopUp togglePopup={togglePopup} pdfFile={pdfFile} />
      )}
    </>
  );
}
