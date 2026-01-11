import { useEffect, useState } from 'react';

export default function ProgressLoader({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 15; // Slower, smoother progress
        });
      }, 300);

      return () => {
        clearInterval(interval);
        if (!loading) {
          setProgress(100);
        }
      };
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className='progress-loader'>
      <div
        className='progress'
        style={{
          width: `${progress}%`,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}
