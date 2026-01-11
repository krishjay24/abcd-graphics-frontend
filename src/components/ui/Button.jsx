import React from 'react';
import styles from '../../styles/Button.module.css';

const Button = ({ children, onClick, className, icon }) => {
  return (
    <button onClick={onClick} className={`${className || ''} relative`}>
      <div className={styles.btn_container}>
        <span className={styles.btn_text}>{children}</span>
        {icon && (
          <div className={styles.btn_icon_container}>
            <span className={styles.btn_icon}>{icon}</span>
          </div>
        )}
      </div>
      <span className='btn-ani-bg'></span>
    </button>
  );
};

export default Button;
