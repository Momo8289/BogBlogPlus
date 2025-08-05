import {useState} from "react";
import {likePost, unlikePost} from "../utils/api.js";

export default function LikeButton({liked, postId, likes}) {
    const [postLiked, setPostLiked] = useState(liked)
    const [likeCount, setLikeCount] = useState(likes)
    const [disable, setDisable] = useState(false)
    const likePostHandler = async () => {
        const token = localStorage.getItem("token")
        setDisable(true)
        if (!postLiked) {
            try {
                await likePost(token, postId)
                setPostLiked(true)
                setLikeCount(likeCount + 1)
            } catch (err) {
                console.error(err)
            }
        } else {
            try {
                await unlikePost(token, postId)
                setPostLiked(false)
                setLikeCount(likeCount - 1)
            } catch (err) {
                console.error(err)
            }
        }
        setDisable(false)
    }

    return (
        <button disabled={disable} onClick={likePostHandler}>{postLiked ? "Unlike" : "Like"} post ({likeCount})</button>
    )
}