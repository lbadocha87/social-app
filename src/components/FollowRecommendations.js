import "./FollowRecommendations.css";

import { useState, useEffect } from "react";

import axios from "axios";

const FollowRecommendations = (props) => {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (props.user ? props.user.jwt_token : ""),
    };

    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/recommendations",
        {},
        { headers: headers }
      )
      .then((req) => {
        setRecommendations(req.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, [props.posts]);

  const follow = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (props.user ? props.user.jwt_token : ""),
    };

    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/follow",
        { leader_id: id },
        { headers: headers }
      )
      .then((req) => {
        props.getLatestPosts()
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className="followRecommendations">
      {recommendations.map((recommendation) => {
        return (
          <div className="followRecommendation" key={recommendation.id}>
            <img
              src={recommendation.avatar_url}
              alt={recommendation.username}
            />
            <h3>{recommendation.username}</h3>
            <button className="btn" onClick={() => follow(recommendation.id)}>
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowRecommendations;
