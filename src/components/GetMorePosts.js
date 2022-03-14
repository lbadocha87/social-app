import { useEffect, useRef } from "react";

import axios from "axios";


const LoadMore = (props) => {
  const containerRef = useRef(null)

  const getNextPosts = () => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': 'Bearer ' + (props.user ? props.user.jwt_token : '')
      };
  
      axios
        .post(
          "http://akademia108.pl/api/social-app/post/older-then",
          { 
            "date": props.posts[props.posts.length - 1].created_at
          },
          { headers: headers }
        )
        .then((req) => {
          let reqData = req.data;
            console.log('next')
            props.setPosts(props.posts.concat(reqData))
        })
        .catch((error) => {
          console.error(error);
        });
}

  const callbackFunction = (entries) => {
    getNextPosts()
  }

  useEffect(() => {
    
    const observer = new IntersectionObserver(callbackFunction, {
        root: null,
        rootMargin: "0px",
        threshold:1.0
      })
    if (containerRef.current) observer.observe(containerRef.current)
    
    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef])


  return (
    <div ref={containerRef}>
        LoadMore
    </div>
  )
}

export default LoadMore;