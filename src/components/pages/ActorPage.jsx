
  import { useParams, Link } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import avatar from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_12_final/odin_javascript_12_mmdb/src/images/user.png';

  export default function ActorPage() {
  let actorId = useParams().actorId;
    const [actor, setActor] = useState();
    useEffect(() => {
      (async () => {
        const actorPacket = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US`
        );
        const actorJson = await actorPacket.json();
        setActor(actorJson);
        // console.log(actorJson);
      })();
    }, [actorId]);

    useEffect(() => {
      console.log(actor);
    }, [actor]);

    return (
      actor && (
        <div id='ActorPage'>
          <h3>Actor: {actor.name}</h3>
        </div>
      )
    );
  }

