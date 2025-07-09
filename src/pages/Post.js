import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3001/comments/${commentId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(comments.filter((val) => val.id !== commentId));
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      const newTitle = prompt("Enter the new title");
      axios
        .put(
          `http://localhost:3001/posts/title`,
          {
            newTitle: newTitle,
            id: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then(() => {
          setPostObject({ ...postObject, title: newTitle });
        });
    } else {
      const newPostText = prompt("Enter the new text");
      axios
        .put(
          `http://localhost:3001/posts/postText`,
          {
            postText: newPostText,
            id: id,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then(() => {
          setPostObject({ ...postObject, postText: newPostText });
        });
    }
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {" "}
            {postObject.username}
            {authState.username === postObject.username && (
              <button onClick={() => deletePost(postObject.id)}>
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            className="addComment"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button className="addCommentButton" onClick={addComment}>
            Add Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => (
            <div key={key} className="comment">
              {comment.commentBody}
              <label>Username: {comment.username}</label>
              {authState.username === comment.username && (
                <button onClick={() => deleteComment(comment.id)}>X</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
