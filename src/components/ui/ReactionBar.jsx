import React, { useState } from 'react';
import styles from './ReactionBar.module.css';

const ReactionBar = ({
  reactions,
  defaultReaction,
  onReactionSelect,
  variant = 'ghost',
  size = 'lg',
  showLabel = true,
  emojiSize = 24,
  className = '',
}) => {
  const [selectedReaction, setSelectedReaction] = useState(defaultReaction);
  const [showReactions, setShowReactions] = useState(false);

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    onReactionSelect?.(reaction);
    setShowReactions(false);
  };

  return (
    <div className={`${styles.reactionBarContainer} ${className}`}>
      <div
        className={styles.selectedReaction}
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        <span style={{ fontSize: `${emojiSize}px` }}>
          {selectedReaction.emoji}
        </span>
        {showLabel && (
          <span className={styles.reactionLabel}>{selectedReaction.label}</span>
        )}
      </div>
      {showReactions && (
        <div
          className={styles.reactionsList}
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          {reactions.map((reaction) => (
            <button
              key={reaction.id}
              className={styles.reactionButton}
              onClick={() => handleReactionSelect(reaction)}
              style={{ fontSize: `${emojiSize}px` }}
            >
              <span>{reaction.emoji}</span>
              {showLabel && (
                <span className={styles.reactionLabel}>{reaction.label}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionBar;
