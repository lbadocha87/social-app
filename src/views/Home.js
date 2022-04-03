import "./Home.css";

import { useState, useEffect } from "react";

import axios from "axios";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import FollowRecommendations from "../components/FollowRecommendations";

/* Intersection observer version */
/* import GetMorePosts from "../components/GetMorePosts"; */

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    
    axios
      .post(
        "http://akademia108.pl/api/social-app/post/latest"
      )
      .then((req) => {
        let reqData = req.data;
        setPosts(reqData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getNextPosts = () => {


    axios
      .post(
        "https://akademia108.pl/api/social-app/post/older-then",
        {
          date: posts[posts.length - 1].created_at,
        }
      )
      .then((req) => {
        let reqData = req.data;
        setPosts(posts.concat(reqData));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPrevPosts = () => {

    axios
      .post(
        "https://akademia108.pl/api/social-app/post/newer-then",
        {
          date: posts[0].created_at,
        }
      )
      .then((req) => {
        let reqData = req.data;
        setPosts(reqData.concat(posts));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLatestPosts();
  }, [props.user]);

  return (
    <div className="home">
      {props.user && <AddPost user={props.user} getPrevPosts={getPrevPosts} />}  
      {props.user && <FollowRecommendations user={props.user} getLatestPosts={getLatestPosts} posts={posts} />}
      <div className="postList">
        {posts.map((post) => {
          return (
            <Post post={post} key={post.id} user={props.user} getLatestPosts={getLatestPosts} setPosts={setPosts} />
          );
        })}
        <button className="btn loadMore" onClick={getNextPosts}>
          Load more
        </button>
        {/* Intersection observer version */}
        {/* <GetMorePosts posts={posts} setPosts={setPosts} /> */}
      </div>
    </div>
  );
};

export default Home;
