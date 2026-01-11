import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styles from '../../styles/CommentSection.module.css';

const CommentSection = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [pickerSize, setPickerSize] = useState({ width: 280, height: 350 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });

  const [comments, setComments] = useState([
    // {
    //   id: 1,
    //   user: 'John Doe',
    //   timestamp: 'Thursday, March 14th at 3:30pm',
    //   content:
    //     'This is a fantastic feature! The implementation is smooth and the user experience is great. Looking forward to using this more in my projects.',
    //   likes: 14,
    //   isLiked: false,
    //   formatting: { bold: false, italic: false },
    // },
  ]);
  const [commentText, setCommentText] = useState('');
  const [textFormat, setTextFormat] = useState({ bold: false, italic: false });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        return comment;
      })
    );
  };

  const formatText = (type) => {
    setTextFormat((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: 'Current User', // In a real app, this would come from auth
      timestamp: new Date().toLocaleString(),
      content: commentText,
      likes: 0,
      isLiked: false,
      formatting: { ...textFormat }, // Store the current text formatting
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText('');
    // Don't reset textFormat so it persists for the next comment
  };

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const textarea = textareaRef.current;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = commentText.slice(0, cursorPosition);
    const textAfterCursor = commentText.slice(cursorPosition);

    setCommentText(textBeforeCursor + emoji + textAfterCursor);

    // Set cursor position after emoji
    setTimeout(() => {
      const newCursorPosition = cursorPosition + emoji.length;
      textarea.focus();
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline
      handleSubmitComment();
    }
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    initialSize.current = {
      width: pickerSize.width,
      height: pickerSize.height,
    };
  };

  const handleResizeMove = (e) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStartPos.current.x;
    const deltaY = e.clientY - resizeStartPos.current.y;

    setPickerSize({
      width: Math.max(280, initialSize.current.width + deltaX),
      height: Math.max(350, initialSize.current.height + deltaY),
    });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing]);

  return (
    <div className={styles.overlay}>
      <div className={styles.commentPanel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Comments ({comments.length})</h2>
          <div className={styles.closeButton} onClick={onClose}>
            <img src='/images/cross.svg' alt='Close' />
          </div>
        </div>
        <div className={styles.commentsdivison}>
          <div className={styles.viewer_comments}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comments}>
                <div className={styles.commentReact}>
                  <div
                    className={styles.like_section}
                    onClick={() => handleLike(comment.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src='/icons/heart.svg'
                      alt='Like'
                      style={{
                        filter: comment.isLiked
                          ? 'brightness(0) saturate(100%) invert(32%) sepia(100%) saturate(7498%) hue-rotate(353deg) brightness(96%) contrast(101%)'
                          : 'none',
                      }}
                    />
                  </div>
                  <hr />
                  <span>{comment.likes}</span>
                </div>
                <div className={styles.commentContainer}>
                  <div className={styles.user}>
                    <div className={styles.userPic}>
                      <img src='/icons/comments_profile.svg' alt='User' />
                    </div>
                    <div className={styles.userInfo}>
                      <span>{comment.user}</span>
                      <p>{comment.timestamp}</p>
                    </div>
                  </div>
                  <p
                    className={styles.commentContent}
                    style={{
                      fontWeight: comment.formatting.bold ? 'bold' : 'normal',
                      fontStyle: comment.formatting.italic
                        ? 'italic'
                        : 'normal',
                    }}
                  >
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.textBox}>
            <div className={styles.boxContainer}>
              <textarea
                ref={textareaRef}
                placeholder='Write your comment...'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  fontWeight: textFormat.bold ? 'bold' : 'normal',
                  fontStyle: textFormat.italic ? 'italic' : 'normal',
                }}
              />
              <div>
                <div className={styles.formatting}>
                  <div className={styles.bold_italic_emojiSection}>
                    <div
                      onClick={() => formatText('bold')}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: textFormat.bold
                          ? '#f1f1f1'
                          : 'transparent',
                      }}
                    >
                      <img src='/icons/bold.svg' alt='Bold' />
                    </div>
                    <div
                      onClick={() => formatText('italic')}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: textFormat.italic
                          ? '#f1f1f1'
                          : 'transparent',
                      }}
                    >
                      <img src='/icons/Italic.svg' alt='Italic' />
                    </div>
                    <div
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src='/icons/emoji.svg' alt='Smiley' />
                    </div>
                  </div>
                  {showEmojiPicker && (
                    <div
                      className={styles.emojiPickerWrapper}
                      ref={emojiPickerRef}
                    >
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        searchDisabled
                        width='280px'
                        height='180px'
                        previewConfig={{ showPreview: false }}
                        skinTonesDisabled
                        categories={[
                          'smileys_people',
                          'animals_nature',
                          'food_drink',
                          'travel_places',
                          'activities',
                          'objects',
                          'symbols',
                          'flags',
                        ]}
                        lazyLoadEmojis={true}
                        emojiStyle='native'
                        autoFocusSearch={false}
                        categoryNavStyle='none'
                      />
                      <div onMouseDown={handleResizeStart} />
                    </div>
                  )}

                  <div
                    className={styles.send}
                    title='Send'
                    onClick={handleSubmitComment}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src='/icons/send.svg' alt='Send' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
