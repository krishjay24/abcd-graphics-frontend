import { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function WebProjects({ elementsRef }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchAllProjects() {
      const response = await fetch(`${backendURL}/api/apps?db=apps`);
      const appsData = await response.json();
      if (appsData.status == "success") {
        setData(appsData.results);
      }
    }

    fetchAllProjects();
  }, []);
  return (
    <div
      id="apps"
      data-name="WEB / MOBILE APPS"
      ref={(el) => (elementsRef.current[4] = el)}
      className="projects-showcase">
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <div className="project-image-container">
                <img
                  className="project-image"
                  src={`${backendURL}/${item.image}`}
                />
                <div className="project-navigation">
                  <a href="/">
                    <div>
                      <img src="/nav-arrow.svg" />
                    </div>
                  </a>
                </div>
              </div>
              <div className="project-details">
                <a href="/"> VISIT</a>
                <p className="project-title">{item.title}</p>
                <p className="project-brief">{item.content}</p>
                <p className="project-category">{item.category}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
