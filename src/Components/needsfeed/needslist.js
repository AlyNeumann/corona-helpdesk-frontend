import React, { useState, useEffect, useRef } from "react";
import SingleNeed from "./singleneed";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import PortraitPlaceholder from "../../Assets/images/Portrait_Placeholder.png";
import StarsIcon from "@material-ui/icons/Stars";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import "./needslist.css";
import socketIOClient from "socket.io-client";
import { useSpring, animated } from "react-spring";

const NeedsList = ({ user, userid, ogUser }) => {

  const needs = user.neededList;
  //id of the user in the feed, not the current user!
  const id = user._id;
  const userImg = user.img;
  let userVotes = user.upvotes;
  const [errorMessage, setErrorMessage] = useState();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [votes, setVotes] = useState(userVotes);

  // console.log(`user votes in state ${votes}`)

  //react spring
  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });

  // const upvoteSocket = () => {

//   const socketRef = useRef();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (isUpvoted) {
//       socketRef.current = socketIOClient("http://localhost:5000", {
//         extraHeaders: {
//           Authorization: token,
//         },
//       });
//       console.log("socket.io connected");
//       console.log(votes);
//       //upvote being triggered
//       socketRef.current.emit("upvote", { votes }, ({ error }) => {
//         console.log("socket.io upvote connected");
//         console.log(votes);
//         console.log(error);
//         //TODO: trigger upvote modal thingy like reddit!
//       });
//       socketRef.current.on("upvoteresponse", (message) => {
//         console.log(message);
//         setVotes(message.message);

//         // setMessages(messages => [...messages, message])
//       });

//       return () => {
//         console.log("disconneting now");
//         socketRef.current.disconnect();
//       };
//     } else if (isUpvoted && state) {
//       socketRef.current = socketIOClient("http://localhost:5000", {
//         extraHeaders: {
//           Authorization: token,
//         },
//       });
//       console.log("socket.io connected");
//       console.log(userVotes);
//       //upvote being triggered
//       socketRef.current.emit("downvote", { votes }, ({ error }) => {
//         console.log("socket.io downvote connected");
//         console.log(votes);
//         console.log(error);

//         //TODO: trigger upvote modal thingy like reddit!
//       });
//       socketRef.current.on("downvoteresponse", (message) => {
//         console.log(message);
//         setVotes(message.message);
//         // setMessages(messages => [...messages, message])
//       });

//       return () => {
//         console.log("disconneting now");
//         socketRef.current.disconnect();
//       };
//     }
//   }, [isUpvoted]);

//   // }

//   const upvote = () => {
//     const url = "http://localhost:5000/getUpdateUpvotes";
//     const token = Cookies.get("token");

//     //handle error messages
//     const handleErrors = (response) => {
//       if (response.error) {
//         setErrorMessage(response.error);
//       } else return response;
//     };

//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify({ id, userid }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     })
//       .then((res) => res.json()) //response is
//       .then(handleErrors)
//       .catch((error) => {
//         if (error) {
//           console.log(error);
//         }
//       })
//       .then((response) => {
//         if (!errorMessage) {
//           console.log("reponse from update upvote");
//           console.log(response);
//         }
//       });
//   };

//   const downvote = () => {
//     const url = "http://localhost:5000/getRemoveUpvote";
//     const token = Cookies.get("token");

//     //handle error messages
//     const handleErrors = (response) => {
//       if (response.error) {
//         setErrorMessage(response.error);
//       } else return response;
//     };

//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify({ id, userid }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//     })
//       .then((res) => res.json()) //response is
//       .then(handleErrors)
//       .catch((error) => {
//         if (error) {
//           console.log(error);
//         }
//       })
//       .then((response) => {
//         if (!errorMessage) {
//           console.log("reponse from update downvote");
//           console.log(response);
//         }
//       });
//   };

//   //call upvote
//   const handleUpvote = () => {
//       if(!isUpvoted){
//         console.log("upvote button being clicked");
//         upvote();
//         setIsUpvoted(true);
//         toggle(!state);
//       }else{
//         console.log("upvote button being clicked");
//         downvote();
//         setIsUpvoted(false);
//         toggle(state);
//       }
   
//   };
//   //call downvote
// //   const handleDownvote = () => {
// //     downvote();
// //     setIsUpvoted(false);
// //     toggle(!state);
// //   };

//   //check if posts are liked previously
//   useEffect(() => {
//     if (ogUser.likedPosts) {
//       const posts = ogUser.likedPosts;
//       if (posts.includes(id)) {
//         setIsUpvoted(true);
//         toggle(state);
//       }
//     }
//   }, [ogUser]);

  return (
    <div>
      <div className="needslist-inner">
        <div className="needslist-avatar">
          <Link
            to={{
              // link to profile of user!
              pathname: "/profileview",
              state: {
                user,
              },
            }}
          >
            <button
              className="btn-img"
              // value={user._id}
              // onClick={handleClick}
            >
              {userImg ? (
                <img
                  className="btn-image"
                  src={`data:image/jpeg;base64,${userImg}`}
                />
              ) : (
                <img className="btn-image" src={PortraitPlaceholder} />
              )}
            </button>
          </Link>
          <h5 className="title-name">{user.name}</h5>
          <Tooltip TransitionComponent={Zoom} title="Upvote">
            <animated.div
              style={{
                opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
                transform: x
                  .interpolate({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
                  })
                  .interpolate((x) => `scale(${x})`),
              }}
            >
              {/* {!isUpvoted ? (
                <button className="upvote" onClick={handleUpvote}>
                  <StarsIcon className="iconclass" />
                </button>
              ) : (
                <button className="downvote" onClick={handleDownvote}>
                  <StarsIcon className="iconclass" />
                </button>
              )} */}
              {/* <button
                className={`${isUpvoted ? "downvote" : "upvote"}`}
                onClick={handleUpvote}
              >
                <StarsIcon className="iconclass" />
              </button> */}
            </animated.div>
          </Tooltip>
          {/* {votes ? <div>{votes}</div> : <div>0</div>} */}
        </div>
        <ul className="needsfeedlist-container">
          {needs.map((need) => {
            return <SingleNeed need={need} key={need._id} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default NeedsList;
