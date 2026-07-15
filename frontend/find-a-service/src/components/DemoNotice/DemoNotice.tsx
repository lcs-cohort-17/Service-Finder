import React from 'react';
import styles from './DemoNotice.module.css';

const DemoNotice: React.FC = () => {
  return (
    <div className={styles.demoNotice}>
      <p>Demo account only — stored in this browser, not sent anywhere.</p>
      <p>Please don't use a real password.</p>
    </div>
  );
};

export default DemoNotice;