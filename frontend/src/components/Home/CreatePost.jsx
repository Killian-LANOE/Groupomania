import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionInput = styled.input`
  padding: 15px;
  width: 200px;
  margin-bottom: 15px;
`;
const FileInput = styled.input`
  width: 230px;
  margin-bottom: 15px;
`;

const PostContentButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const token = localStorage.getItem("token");

function CreatePost() {
  //Create a post
  async function handleCreate(e) {
    e.preventDefault();
    const image = e.target["image"].files[0];
    const description = e.target["description"].value;

    const data = new FormData();
    data.append("imageUrl", image);
    data.append("description", description);

    fetch("https://groupomania-db.onrender.com/api/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.ok) {
          alert("Post Crée");
          window.location.reload();
        }
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleCreate}>
      <StyledLabel>
        <DescriptionInput
          type="text"
          placeholder="Racontez votre histoire !"
          id="description"
          name="description"
        ></DescriptionInput>
        <FileInput type="file" id="image"></FileInput>
        <PostContentButton>Post Content</PostContentButton>
      </StyledLabel>
    </form>
  );
}

export default CreatePost;
