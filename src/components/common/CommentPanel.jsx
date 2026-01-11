import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/CommentPanel.module.css';
import EmojiPicker from 'emoji-picker-react';

const CommentPanel = ({
  isOpen,
  onClose,
  totalComments = 0,
  icons = {
    bold: '',
    italic: '',
    underline: '',
    link: '',
    smiley: '',
    send: 'icons/send.svg',
  },
}) => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'This design is absolutely stunning! The attention to detail is remarkable.',
      user: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40',
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      text: 'Love the color palette and typography choices. Very professional!',
      user: {
        name: 'Jane Smith',
        avatar: '/icons/comments_profile.svg',
      },
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    },
  ]);

  const panelRef = useRef(null);
  const textareaRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      user: {
        name: 'Current User',
        avatar: '/icons/comments_profile.svg',
      },
      timestamp: new Date(),
    };

    setComments((prev) => [newComment, ...prev]);
    setComment('');
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'Hour' : 'Hours'} ago`;
    }
    return (
      timestamp.toLocaleDateString() +
      ' - ' +
      timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div className={`${styles.panelOverlay} ${isOpen ? styles.open : ''}`}>
      <div
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
      >
        <div className={styles.commentSection}>
          <div className={styles.header}>
            <h2 className={styles.header_title}>
              Comments ({totalComments || comments.length})
            </h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label='Close comments panel'
            >
              <span aria-hidden='true'>×</span>
            </button>
          </div>

          <div className={styles.commentsList}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.userInfo}>
                    <img
                      src={comment.user.avatar}
                      alt={`${comment.user.name}'s avatar`}
                      className={styles.avatar}
                    />
                    <span className={styles.userName}>{comment.user.name}</span>
                  </div>
                  <span className={styles.timestamp}>
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>
                <div className={styles.commentText}>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.textbox}>
          <div className={styles.box_container}>
            <textarea placeholder='Reply'></textarea>
            <div className={styles.formatting}>
              <div className={styles.button}>
                <img src={icons.bold} alt='Bold' />
              </div>
              <div className={styles.button}>
                <img src={icons.italic} alt='Italic' />
              </div>
              <div className={styles.button}>
                <img src={icons.underline} alt='Underline' />
              </div>
              <div className={styles.button}>
                <img src={icons.link} alt='Link' />
              </div>
              <div className={styles.button}>
                <img src={icons.smiley} alt='Smiley' />
              </div>
              <div className={styles.button}>
                <img src={icons.send} alt='Send' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPanel;
