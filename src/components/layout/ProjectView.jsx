import React, { useState, useEffect } from "react";
import styles from "../../styles/ProjectView.module.css";
import PdfViewer from "../common/PdfViewer";
import CommentSection from "../ui/CommentSection";
import { saveAs } from "file-saver";

const DEFAULT_TITLE = "Project Details";

const ProjectView = ({
  initialTitle,
  data,
  currentIndex,
  setCurrentIndex,
  pdfFile,
  onClose,
  onSwitchView,
}) => {
  const [currentTitle, setCurrentTitle] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState(null);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [viewCount, setViewCount] = useState(data?.[currentIndex]?.views || 0);
  const [likeCount, setLikeCount] = useState(data?.[currentIndex]?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(
    data?.[currentIndex]?.comments || 0
  );

  const handleCommentClick = () => {
    setIsCommentSectionOpen(true);
  };

  // const handleLikeClick = async () => {
  //   try {
  //     setIsLiked(!isLiked);
  //     setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

  //     // Here you would typically make an API call to update the like count in the backend
  //     const response = await fetch(`${backendURL}/api/like`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         id: data[currentIndex].id,
  //         table: data[currentIndex].table,
  //       }),
  //     });

  //     if (!response.ok) throw new Error('Failed to update like');

  //     // Emit an event to notify other components
  //     const likeEvent = new CustomEvent('projectLikeUpdate', {
  //       detail: {
  //         projectId: data[currentIndex].id,
  //         isLiked: !isLiked,
  //         likeCount: isLiked ? likeCount - 1 : likeCount + 1,
  //       },
  //     });
  //     window.dispatchEvent(likeEvent);
  //   } catch (error) {
  //     // Revert the optimistic update on error
  //     setIsLiked(!isLiked);
  //     setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
  //     console.error('Error updating like:', error);
  //   }
  // };

  // Update view count when component mounts or when currentIndex changes
  // useEffect(() => {
  //   if (data?.[currentIndex]?.id) {
  //     setViewCount((prev) => prev + 1);
  //     // Here you would typically make an API call to update the view count in the backend
  //   }
  // }, [currentIndex, data]);


useEffect(() => {
  if (data?.[currentIndex]?.id) {
    const currentProject = data[currentIndex];
    const incrementedViews = (currentProject.views || 0) + 1;

    setViewCount(incrementedViews);

    const event = new CustomEvent("projectStatUpdate", {
      detail: {
        projectId: currentProject.id,
        viewCount: incrementedViews,
        likeCount: currentProject.likes || 0,
        isLiked,
      },
    });
    window.dispatchEvent(event);

    // Optional: send to backend here
  }
}, [currentIndex]);



  // 👇 This runs only when the current project changes (i.e., modal opened or next/prev clicked)
  useEffect(() => {
    const handleStatUpdate = (event) => {
      const { projectId, viewCount, likeCount, isLiked } = event.detail;
      const currentItem = data?.[currentIndex];

      if (currentItem?.id === projectId) {
        setViewCount(viewCount);
        setLikeCount(likeCount);
        setIsLiked(isLiked);
      }
    };

    window.addEventListener("projectStatUpdate", handleStatUpdate);
    return () =>
      window.removeEventListener("projectStatUpdate", handleStatUpdate);
  }, [data, currentIndex]);

  const handleLikeClick = async () => {
  try {
    const updatedIsLiked = !isLiked;
    const updatedLikeCount = updatedIsLiked ? likeCount + 1 : likeCount - 1;

    // Update local state
    setIsLiked(updatedIsLiked);
    setLikeCount(updatedLikeCount);

    // Send to backend
    const response = await fetch(`${backendURL}/api/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: data[currentIndex].id,
        table: data[currentIndex].table,
      }),
    });

    if (!response.ok) throw new Error('Failed to update like');

    // Dispatch to update Reaction
    const event = new CustomEvent('projectStatUpdate', {
      detail: {
        projectId: data[currentIndex].id,
        viewCount,
        likeCount: updatedLikeCount,
        isLiked: updatedIsLiked,
      },
    });
    window.dispatchEvent(event);
  } catch (error) {
    console.error('Error updating like:', error);
    // Rollback state
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
  }
};


  // Add useEffect to handle scroll locking
  useEffect(() => {
    // Store the original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on cleanup
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup

  // Single source of truth for title updates
  useEffect(() => {
    const newTitle = data?.[currentIndex]?.title;
    if (newTitle) {
      setCurrentTitle(newTitle);
    } else if (initialTitle) {
      setCurrentTitle(initialTitle);
    } else {
      setCurrentTitle(DEFAULT_TITLE);
    }
  }, [data, currentIndex, initialTitle]);

  const fileType = React.useMemo(() => {
    const currentItem = data?.[currentIndex];
    if (!currentItem) return null;

    // Check if the item has a PDF file
    if (currentItem.pdf || pdfFile) {
      return "pdf";
    }
    // If no PDF, assume it's an image
    return "image";
  }, [data, currentIndex, pdfFile]);

  const getFileUrl = () => {
    const currentItem = data?.[currentIndex];

    if (currentItem) {
      const filePath = currentItem.pdf || currentItem.image;
      if (filePath) {
        return `https://proxy.abcd.graphics/backend.abcd.graphics/${filePath}`;
      }
    }

    if (pdfFile) {
      return `https://proxy.abcd.graphics/backend.abcd.graphics/${pdfFile}`;
    }

    return null;
  };

  const renderContent = () => {
    const fileUrl = getFileUrl();
    console.log("Rendering content with URL:", fileUrl);
    console.log("File type:", fileType);

    if (!fileUrl) {
      return <div className={styles.error_message}>No file URL available</div>;
    }

    if (fileType === "pdf") {
      return (
        <PdfViewer
          pdfFile={data?.[currentIndex]?.pdf || pdfFile}
          initialTitle={currentTitle}
          onPageChange={setPageNumber}
          onNumPagesChange={setNumPages}
          onError={(err) => {
            console.error("PDF Viewer error:", err);
            setError(`Failed to load PDF: ${err.message}`);
          }}
        />
      );
    } else if (fileType === "image") {
      return (
        <img
          src={fileUrl}
          alt={data?.[currentIndex]?.title || "Project Image"}
          onError={(e) => {
            console.error("Image load error:", e);
            setError("Failed to load image");
          }}
          style={{ width: "78%", alignSelf: "flex-start" }}
        />
      );
    }

    return null;
  };

  const downloadFile = () => {
    const fileUrl = getFileUrl();
    if (!fileUrl) {
      setError("No file available for download");
      return;
    }

    const fileName = data
      ? (data[currentIndex]?.pdf || data[currentIndex]?.image || "download")
          .split("/")
          .pop()
      : pdfFile?.split("/").pop() || "download";

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        saveAs(blob, fileName);
        setError(null);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
        setError("Failed to download file");
      });
  };

  // Add these new variables to determine button states
  const isFirstProject = currentIndex === 0;
  const isLastProject = data ? currentIndex === data.length - 1 : true;

  // Update the navigation handlers to include disabled state checks
  const handlePrevious = () => {
    if (!isFirstProject && data) {
      setCurrentIndex(currentIndex - 1);
      setPageNumber(1);
      setNumPages(0);
      setError(null);
    }
  };

  const handleNext = () => {
    if (!isLastProject && data) {
      setCurrentIndex(currentIndex + 1);
      setPageNumber(1);
      setNumPages(0);
      setError(null);
    }
  };

  const currentFilePath = data
    ? `https://proxy.abcd.graphics/backend.abcd.graphics/${data[currentIndex].pdf}`
    : `https://proxy.abcd.graphics/backend.abcd.graphics/${pdfFile}`;
  // Just commit
  return (
    <div className={styles.projectViewContainer}>
      <div className={styles.projectTitle}>
        <div className={styles.projectTitleText}>
          <h1>{currentTitle}</h1>
          <div className={styles.project_stats}>
            <div className={styles.stats_item}>
              <div className={styles.stats_icon}>
                <img src="images/eye-black-icon.svg" alt="Views" />
              </div>
              <div className={styles.stats_item_text}>
                <p>
                  {viewCount} {viewCount === 1 ? "View" : "Views"}
                </p>
              </div>
            </div>
            <div className={styles.stats_item}>
              <div
                className={`${styles.stats_icon} ${styles.stats_item_clickable}`}
                onClick={handleLikeClick}
                role="button"
                tabIndex={0}
              >
                <img
                  src="images/heart-black-icon.svg"
                  className={`item-icon ${isLiked ? styles.liked : ""}`}
                  alt="Like"
                />
              </div>
              <div className={styles.stats_item_text}>
                <p>
                  {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                </p>
              </div>
            </div>
            <div
              className={`${styles.stats_item} ${styles.stats_item_clickable}`}
              onClick={handleCommentClick}
              role="button"
              tabIndex={0}
            >
              <div className={styles.stats_icon}>
                <img src="images/chat.svg" alt="Comments" />
              </div>
              <div className={styles.stats_item_text}>
                <p>
                  {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.projectPrev} ${
          isFirstProject ? styles.disabled : ""
        }`}
      >
        <div className={styles.projectPrevText}>
          <div className={styles.projectPrevText_top} onClick={handlePrevious}>
            Previous
          </div>
          <div className={styles.projectText_bottom_text}>
            <h2>
              {data && !isFirstProject
                ? data[currentIndex - 1]?.title || DEFAULT_TITLE
                : ""}
            </h2>
          </div>
          <div className={styles.arrow_container}>
            <div className={styles.arrow_left} onClick={handlePrevious}>
              <img src="icons/arrow.svg" alt="Prev" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.projectFilePages}>
        {fileType === "pdf" && numPages > 0 && (
          <div className={styles.page_count}>
            {pageNumber}/{numPages}
          </div>
        )}
      </div>
      <div className={styles.projectFileContent}>
        {error && (
          <div className={styles.error_message}>
            {error}
            <button
              onClick={() => setError(null)}
              className={styles.retry_button}
            >
              Retry
            </button>
          </div>
        )}
        {!error && (
          <div className={styles.pdfContainer} style={{ height: "100%" }}>
            {renderContent()}
          </div>
        )}
      </div>
      <div className={styles.projectFileActions}>
        <div className={styles.popup_nav}>
          <div className={styles.popup_close} onClick={onClose}>
            <img src="images/cross.svg" alt="Close" />
          </div>
          <div className={styles.popup_close} onClick={downloadFile}>
            <img src="images/progress.svg" alt="Download" />
          </div>
          {onSwitchView && (
            <div className={styles.popup_close} onClick={onSwitchView}>
              <img src="images/switch.svg" alt="Switch View" />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${styles.projectNext} ${
          isLastProject ? styles.disabled : ""
        }`}
      >
        <div className={styles.projectPrevText}>
          <div className={styles.projectPrevText_top} onClick={handleNext}>
            Next
          </div>
          <div className={styles.projectText_bottom_text}>
            <h2>
              {data && !isLastProject
                ? data[currentIndex + 1]?.title || DEFAULT_TITLE
                : ""}
            </h2>
          </div>
          <div className={styles.arrow_container}>
            <div></div>
            <div className={styles.arrow_right} onClick={handleNext}>
              <img src="icons/arrow.svg" alt="Prev" />
            </div>
          </div>
        </div>
      </div>

      <CommentSection
        isOpen={isCommentSectionOpen}
        onClose={() => setIsCommentSectionOpen(false)}
        totalComments={100}
      />
    </div>
  );
};

export default ProjectView;
