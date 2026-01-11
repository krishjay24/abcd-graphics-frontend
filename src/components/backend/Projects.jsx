import { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Projects({ tableName }) {
  const [formData, setFormData] = useState({
    image: null,
    pdfFile: null,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setSuccess(false);
    const { name, value, type, files } = event.target;
    console.log(name);
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("pdfFile", formData.pdfFile);
    formDataToSend.append("table", tableName);

    try {
      const response = await fetch(`${backendURL}/api/projects`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${backendURL}/api/projects/delete?type=${tableName}&&id=${id}`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      if (data.status === "success") {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    async function fetchAllApps() {
      const response = await fetch(
        `${backendURL}/api/projects?db=${tableName}`
      );
      const appsData = await response.json();
      if (appsData.status == "success") {
        setData(appsData.results);
      }
    }

    fetchAllApps();
  }, [tableName, success]);

  return (
    <div>
      {success && <p>Project Stored in Database</p>}
      <h1>Upload Your Project Details Here:</h1>
      <form onSubmit={handleSubmit}>
        <label>Upload Image Here</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {errors.image && <div className="error">{errors.image}</div>}
        <label>Upload PDF File Here</label>
        <input
          type="file"
          name="pdfFile"
          accept="application/pdf"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <img src={`${backendURL}/${item.image}`} />
                {item.pdf && item.pdf.length > 0 && (
                  <a href={`${backendURL}/${item.pdf}`}>Link to PDF</a>
                )}
              </div>
              <a href={`/projects/${item.id}/${tableName}`}>Edit</a>
              <div
                onClick={(e) => {
                  handleDelete(e, item.id);
                }}>
                Delete
              </div>
            </div>
          );
        })}
    </div>
  );
}
