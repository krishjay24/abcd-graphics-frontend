import { useEffect, useState } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Apps = ({ tableName }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    category: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setSuccess(false);
    const { name, value, type, files } = event.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.content) newErrors.content = "Content is required.";
    if (!formData.link) newErrors.link = "Link is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("link", formData.link);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("table", tableName);

    try {
      const response = await fetch(`${backendURL}/api/apps`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to submit the form");
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
      const response = await fetch(`${backendURL}/api/apps?db=${tableName}`);
      const appsData = await response.json();
      if (appsData.status == "success") {
        setData(appsData.results);
      }
    }

    fetchAllApps();
  }, [success, tableName]);

  return (
    <div>
      {success && <p>Project Stored in Database</p>}
      <h1>Upload Your Project Details Here:</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <div className="error">{errors.title}</div>}
        <input
          name="content"
          placeholder="Project Content"
          value={formData.content}
          onChange={handleChange}
        />
        {errors.content && <div className="error">{errors.content}</div>}
        <input
          name="link"
          placeholder="Project Link"
          value={formData.link}
          onChange={handleChange}
        />
        {errors.link && <div className="error">{errors.link}</div>}
        <label htmlFor="projects">Choose Category</label>
        <select
          name="category"
          id="projects"
          value={formData.category}
          onChange={handleChange}>
          <option value="" hidden>
            Select an option
          </option>
          <option value="d-only">Design Only</option>
          <option value="d-and-d">Design and Development</option>
        </select>
        {errors.category && <div className="error">{errors.category}</div>}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {errors.image && <div className="error">{errors.image}</div>}
        <button type="submit">Submit</button>
      </form>

      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            <div style={{ marginBottom: "20px" }} key={index}>
              <div>{item.title}</div>
              <div>{item.content}</div>
              <div>{item.category}</div>
              <div>{item.link}</div>
              <div>
                <img src={`${backendURL}/${item.image}`} />
              </div>
              <a href={`/apps/${item.id}/${tableName}`}>Edit</a>
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
};

export default Apps;
