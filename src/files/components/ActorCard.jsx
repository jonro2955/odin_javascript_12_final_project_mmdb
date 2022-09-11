import { Link } from "react-router-dom";
import React from "react";
import avatar from "../images/avatar.png";

export default function ActorCard({ actor }) {
  return (
    <div className="actorCard">
      <Link
        to={`/actor/${actor.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="cardLink"
      >
        <img
          className="actorImg"
          alt={actor.name}
          src={
            actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : avatar
          }
          onError={(e) => {
            e.target.src = avatar;
          }}
          width="100"
          height="150"
          loading="lazy"
        />
        <div className="actorCardDetail">
          <div>{actor.name}</div>
        </div>
      </Link>
    </div>
  );
}
