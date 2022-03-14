import './Home.css';

import { useState, useEffect } from "react";

import axios from "axios";

import GetMorePosts from '../components/GetMorePosts';

const Home = (props) => {


    const [posts, setPosts] = useState([])

    const getLatestPosts = () => {
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            'Authorization': 'Bearer ' + (props.user ? props.user.jwt_token : '')
          };
      
          axios
            .post(
              "http://akademia108.pl/api/social-app/post/latest",
              {},
              { headers: headers }
            )
            .then((req) => {
              let reqData = req.data;
                console.log(reqData)
                setPosts(reqData)
            })
            .catch((error) => {
              console.error(error);
            });
    }

    useEffect(()=>{
        getLatestPosts()
    }, [props.user])

    return(
        <div className="home">
            <div className="postList">
                {posts.map(post=>{
                    return (
                        <div key={post.id} className='post'>
                            <div className="avatar">
                                <img src={post.user.avatar_url} alt={post.user.username} />
                            </div>
                            <div className="postData">
                                <div className="postMeta">
                                    <div className="author">
                                        {post.user.username}
                                    </div>
                                    <div className="date">
                                        {post.created_at.substring(0, 10)}
                                    </div>
                                </div>
                                <div className="postContent">
                                    {post.content}
                                </div>
                            </div>
                        </div>  
                    )
                })}
                <GetMorePosts posts={posts} setPosts={setPosts} />
            </div>
        </div>
    )
}

export default Home;