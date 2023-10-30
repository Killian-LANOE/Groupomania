import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

function DeletePost() {
  const [user, setUser] = useState();
  const { postId } = useParams();

  async function getUserInfo() {
    const res = await fetch(
      `https://groupomania-db.onrender.com/api/auth/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    await setUser(data.user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function deleteInfo() {
    await fetch(`https://groupomania-db.onrender.com/api/posts/${postId}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isAdmin: user.isAdmin,
        userId: user._id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("id");
          window.location = "/home";
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <button onClick={deleteInfo}>Delete</button>
    </>
  );
}

export default DeletePost;
