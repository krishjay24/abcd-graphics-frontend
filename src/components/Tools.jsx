const Tools = ({ imageData }) => {
  if (!imageData || !Array.isArray(imageData)) {
    console.error('Tools component received invalid imageData:', imageData);
    return null; // Prevents crashes if data is missing
  }

  return (
    <div className='tools_container'>
      {imageData.map((tool, index) => (
        <div
          key={index}
          className='tools_icon'
          data-tooltip={tool.alt || 'Tool'}
        >
          <img src={tool.src} alt={tool.alt || 'Tool'} />
        </div>
      ))}
    </div>
  );
};

export default Tools;
