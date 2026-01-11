import { useState } from "react";
import Apps from "../backend/Apps";
import Projects from "../backend/Projects";

export default function Admin() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "apps":
        return <Apps tableName="apps" />;
      case "websites":
        return <Apps tableName="websites" />;
      case "branding":
        return <Projects tableName="branding" />;
      case "presentations":
        return <Projects tableName="presentations" />;
      case "social":
        return <Projects tableName="social" />;
      case "carousels":
        return <Projects tableName="carousels" />;
      case "collaterals":
        return <Projects tableName="collaterals" />;
      case "documents":
        return <Projects tableName="documents" />;
      case "packaging":
        return <Projects tableName="packaging" />;
      case "infographics":
        return <Projects tableName="infographics" />;
      default:
        return <div>Please select a project type</div>;
    }
  };

  return (
    <div className="admin-projects">
      <label htmlFor="cars">Choose a project:</label>
      <select
        name="projects"
        id="projects"
        value={selectedOption}
        onChange={handleChange}>
        <option hidden>Select an option</option>
        <option value="apps">Web / Mobile Apps</option>
        <option value="websites">Websites</option>
        <option value="branding">Branding</option>
        <option value="presentations">Presentations</option>
        <option value="social">Social</option>
        <option value="carousels">Carousels</option>
        <option value="collaterals">Collaterals</option>
        <option value="documents">Documents</option>
        <option value="packaging">Packaging</option>
        <option value="infographics">Infographics</option>
      </select>

      {renderContent()}
    </div>
  );
}
