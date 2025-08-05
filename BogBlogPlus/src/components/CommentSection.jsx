import { useState, useEffect } from "react";
import {
  postComments,
  createComment,
  updateComment,
  deleteComment,
} from "../utils/api.js";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/16/solid";

const CommentsSection = ({
  postId,
  token,
  currentUserId,
  isExpanded = false,
  initialCommentCount = 0,
}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [showComments, setShowComments] = useState(isExpanded);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const displayCount =
    comments.length > 0 || showComments ? comments.length : initialCommentCount;

  useEffect(() => {
    if (showComments && token) {
      loadComments();
    }
  }, [showComments, postId, token]);

  // Load Comments
  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await postComments(token, postId);
      setComments(result.data || []);
    } catch (error) {
      console.error("Error loading comments:", error);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  // Create Comment
  const handleCreateComment = async (body) => {
    try {
      setError(null);
        setSuccess(null);

      await createComment(token, postId, body);
      await loadComments();

        setSuccess("Comment posted successfully");

        setTimeout(() => {
          setSuccess(null);
        }, 3000);

    } catch (error) {
      console.error("Error creating comment:", error);
      setError("Failed to create comment");
    }
  };

  // Update Comment
  const handleUpdateComment = async (body) => {
    try {
      setError(null);

      await updateComment(token, editingComment.id, body);
      setEditingComment(null);
      await loadComments();
    } catch (error) {
      console.error("Error updating comment:", error);
      setError("Failed to update comment");
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      setError(null);
      setSuccess(null);

      await deleteComment(token, commentId);
      await loadComments();

        setSuccess("Comment deleted successfully");

        setTimeout(() => {
          setSuccess(null);
        }, 3000);

    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment");
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!token) {
    return (
      <div className="comments-section">
        <p>Please log in to view and post comments.</p>
      </div>
    );
  }

  return (
    <div className="comments-section">
      <div className="comments-header">
        <button onClick={toggleComments} className="toggle-comments-btn">
        <ChatBubbleLeftRightIcon className="commentIcon" />  {showComments ? "Hide" : "Show"} Comments ({displayCount})
        </button>
      </div>

      {showComments && (
        <div className="comments-content">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <CommentForm onSubmit={handleCreateComment} />

          {loading ? (
            <div>Loading comments...</div>
          ) : (
            <div className="comments-list">
              {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id}>
                    {editingComment?.id === comment.id ? (
                      <CommentForm
                        initialValue={comment.body}
                        isEditing={true}
                        onSubmit={handleUpdateComment}
                        onCancel={() => setEditingComment(null)}
                      />
                    ) : (
                      <Comment
                        comment={comment}
                        currentUserId={currentUserId}
                        onDelete={handleDeleteComment}
                        onEdit={setEditingComment}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
