const Comment = ({ comment, currentUserId, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment.id);
    }
  };

  const handleEdit = () => {
    onEdit(comment);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-author">
          {comment.author?.username || "Anonymous"}
        </span>
        <span className="comment-date">
          {comment.timestamp &&
            new Date(comment.timestamp).toLocaleDateString()}
        </span>
      </div>
      <div className="comment-body">{comment.body}</div>

      {/* Show edit and delete buttons only for the comment's author */}
      {currentUserId === comment.user_id && (
        <div className="comment-actions">
          <button onClick={handleEdit} className="edit-btn">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
