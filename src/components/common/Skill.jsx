const Skill = ({ title, rating }) => {
  const getStarColor = (index) => {
    if (index < rating) {
      return 'images/star-yellow.svg';
    }
    return 'images/star-white.svg';
  };

  const stars = Array.from({ length: 4 }, (_, index) => {
    return (
      <img
        key={index}
        src={getStarColor(index)}
        alt={index < rating ? 'star-yellow' : 'star-white'}
        className='stars_rating'
      />
    );
  });

  return (
    <div className='Rating_skills'>
      <p>{title}</p>
      <div className='stars-icons'>{stars}</div>
    </div>
  );
};

export default Skill;
