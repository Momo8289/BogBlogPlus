import { useState } from "react";
import ConfirmModal from "./ConfirmModal.jsx";

const Comment = ({ comment, currentUserId, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(comment.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    onEdit(comment);
  };

  return (
    <>
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
            <button onClick={handleDeleteClick} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      />
    </>
  );
};

export default Comment;
