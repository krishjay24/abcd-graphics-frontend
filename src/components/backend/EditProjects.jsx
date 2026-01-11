import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function EditProjects() {
  const [formData, setFormData] = useState({
    image: null,
    pdfFile: null,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { id, category } = useParams();

  const handleChange = (event) => {
    setSuccess(false);
    const { name, value, type, files } = event.target;

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
    formDataToSend.append("table", category);
    formDataToSend.append("id", id);
    console.log(formData);

    try {
      const response = await fetch(`${backendURL}/api/edit/projects`, {
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

  useEffect(() => {
    async function fetchAllApps() {
      const response = await fetch(
        `${backendURL}/api/edit/projects?db=${category}&&id=${id}`
      );
      if (response.ok) {
        const appsData = await response.json();
        if (appsData && appsData.results.length > 0) {
          console.log(appsData);
          if (appsData.status == "success") {
            setFormData({
              image: appsData.results[0].image,
              pdfFile: appsData.results[0].pdf,
            });
          }
        }
      }
    }

    fetchAllApps();
  }, [category, id]);

  return (
    <div className="edit">
      {success && <p>Project Stored in Database</p>}
      <h2>Your Current Files:</h2>
      <p>Image File:</p>

      <img src={`${backendURL}/${formData.image}`} />

      <p>PDF File:</p>
      {formData.pdfFile && formData.pdfFile.length > 0 ? (
        <a href={`${backendURL}/${formData.pdfFile}`}>
          Click Here to view pdf file
        </a>
      ) : (
        <p>No PDF File Found</p>
      )}
      <p
        onClick={() => {
          setFormData({
            ...formData,
            pdfFile: null,
          });
        }}>
        Delete PDF
      </p>

      <form onSubmit={handleSubmit}>
        <label style={{ marginTop: "20px" }}>Upload Image Here</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />{" "}
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
    </div>
  );
}
