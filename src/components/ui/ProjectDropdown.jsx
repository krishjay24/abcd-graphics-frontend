// import React from 'react';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/ProjectDropdown.module.css';
import PropTypes from 'prop-types';

const ProjectDropdown = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: 'Web/Mobile Apps', id: 'apps' },
    { label: 'Websites', id: 'websites' },
    { label: 'Branding', id: 'branding' },
    { label: 'Presentations', id: 'presentations' },
    { label: 'Social', id: 'social' },
    { label: 'Carousels', id: 'carousels' },
    { label: 'Collaterals', id: 'collaterals' },
    { label: 'Documents', id: 'documents' },
    { label: 'Packaging', id: 'packaging' },
    { label: 'Infographics', id: 'infographics' },
  ];

  const selectedOption = options.find((opt) => opt.id === currentSection);

    const handleSelect = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const id = e.target.value;
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Find the current section's label
  const getCurrentLabel = () => {
    const currentOption = options.find(
      (option) => option.id === currentSection
    );
    return currentOption ? currentOption.label : 'Select Project';
  };

    // Optional: Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    // <div className={styles.dropdown}>
    //   <select
    //     className={styles.select}
    //     onChange={handleChange}
    //     value={currentSection || ''}
    //     aria-label='Select a project category'
    //     role='combobox'
    //   >
    //     {options.map((option) => (
    //       <option key={option.id} value={option.id} className={styles.option}>
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>
    // </div>
     <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={styles.select}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {selectedOption ? selectedOption.label : 'Select Project'}
      </div>

      {isOpen && (
        <ul className={styles.optionList}>
          {options.map((option) => (
            <li
              key={option.id}
              className={styles.option}
              onClick={() => handleSelect(option.id)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ProjectDropdown.propTypes = {
  currentSection: PropTypes.string,
};

export default ProjectDropdown;
