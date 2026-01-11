import { useState, useEffect } from "react";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Reaction = ({
  children,
  title,
  view,
  comment,
  like,
  table,
  id,
  disableAnimation,
  onLikeClick,
  isLiked: initialIsLiked = false,
}) => {
  // const [views] = useState(view);
  const [views, setViews] = useState(view);
  const [likes, setLikes] = useState(like);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    if (!disableAnimation) {
      setShouldAnimate(title.length > 34);
    }
  }, [title, disableAnimation]);

  // useEffect(() => {
  //   const handleProjectLikeUpdate = (event) => {
  //     const { projectId, isLiked: newIsLiked, likeCount } = event.detail;
  //     if (projectId === id) {
  //       setIsLiked(newIsLiked);
  //       setLikes(likeCount);
  //     }
  //   };

  //   window.addEventListener("projectLikeUpdate", handleProjectLikeUpdate);
  //   return () => {
  //     window.removeEventListener("projectLikeUpdate", handleProjectLikeUpdate);
  //   };
  // }, [id]);

useEffect(() => {
  const handleProjectStatUpdate = (event) => {
    const { projectId, viewCount, likeCount, isLiked: newIsLiked } = event.detail;
    if (projectId === id) {
      setViews(viewCount);
      setLikes(likeCount);
      setIsLiked(newIsLiked);
    }
  };

  window.addEventListener("projectStatUpdate", handleProjectStatUpdate);
  return () => window.removeEventListener("projectStatUpdate", handleProjectStatUpdate);
}, [id]);



  // const handleLikeClick = () => {
  //   if (onLikeClick) {
  //     onLikeClick();
  //   }
  // };

  return (
    <div
      className="item"
      onMouseEnter={() => {
        if (!disableAnimation) {
          setShouldAnimate(title.length > 29);
        }
      }}
    >
      <div>{children}</div>
      <div className="item_container">
        <div className={`item-title ${shouldAnimate ? "animate" : ""}`}>
          <p>{title}</p>
        </div>
        <div className="item-icons">
          <div>
            <img src="images/eye-white-icon.svg" className="item-icon" />
            <p>
              {views} {views === 1 ? "View" : "Views"}
            </p>
          </div>

          {/* <div onClick={handleLikeClick} style={{ cursor: "pointer" }}> */}
          <div style={{ cursor: "pointer" }}>
            <img
              src="images/heart-white-icon.svg"
              className={`item-icon ${isLiked ? "liked" : ""}`}
            />
            <p>
              {likes} {likes === 1 ? "Like" : "Likes"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reaction;
