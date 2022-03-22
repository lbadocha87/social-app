import "./Post.css";
import axios from "axios";
import { useState } from "react";

const Post = (props) => {
  const [likesCount, setLikesCount] = useState(props.post.likes.length);
  const [doesUserLiked, setDoesUserLiked] = useState(
    props.post.likes.filter((like) => like.username === props.user?.username)
      .length !== 0
  );

  const likePost = (id, isLiked) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (props.user ? props.user.jwt_token : ""),
    };

    axios
      .post(
        "http://akademia108.pl/api/social-app/post/" +
          (isLiked ? "dislike" : "like"),
        {
          post_id: id,
        },
        { headers: headers }
      )
      .then((req) => {
        setLikesCount(likesCount + (isLiked ? -1 : 1));
        setDoesUserLiked(!isLiked);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const unfollow = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (props.user ? props.user.jwt_token : ""),
    };

    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/disfollow",
        { leader_id: id },
        { headers: headers }
      )
      .then((req) => {
        props.getLatestPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const deletePost = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (props.user ? props.user.jwt_token : ""),
    };

    axios
      .post(
        "https://akademia108.pl/api/social-app/post/delete",
        { post_id: id },
        { headers: headers }
      )
      .then((req) => {
        props.setPosts(posts=>{
          return posts.filter(post=>post.id !== req.data.post_id)
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="post">
      <div className="avatar">
        <img src={props.post.user.avatar_url} alt={props.post.user.username} />
      </div>
      <div className="postData">
        <div className="postMeta">
          <div className="author">{props.post.user.username}</div>
          <div className="date">{props.post.created_at.substring(0, 10)}</div>
        </div>
        <div className="postContent">{props.post.content}</div>
        <div className="likes">
        {props.post.user.username === props.user.username && (
            <button
              className="btn"
              onClick={() => deletePost(props.post.id)}
            >
              Delete post
            </button>
          )}
          {props.user && props.post.user.username !== props.user.username && (
            <button
              className="btn"
              onClick={() => unfollow(props.post.user.id)}
            >
              Unfollow
            </button>
          )}
          {props.user && (
            <button
              className="btn"
              onClick={() => likePost(props.post.id, doesUserLiked)}
            >
              {doesUserLiked ? "Dislike" : "Like"}
            </button>
          )}
          {likesCount}
        </div>
      </div>
    </div>
  );
};

export default Post;
