import { useState } from 'react';

const CommentForm = ({ onSubmit, initialValue = '', isEditing = false, onCancel }) => {
    const [body, setBody] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (body.trim()) {
            onSubmit(body);
            if (!isEditing) setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write a comment..."
                required
                rows="3"
            />
            <div className="comment-form-actions">
                <button type="submit">{isEditing ? 'Update' : 'Post'} Comment</button>
                {isEditing && (
                    <button type="button" onClick={onCancel}>Cancel</button>
                )}
            </div>
        </form>
    );
};

export default CommentForm;