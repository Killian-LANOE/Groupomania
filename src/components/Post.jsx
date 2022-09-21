import {useState} from 'react';
import styled from 'styled-components';

// Elements Styles
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

const StyledImg = styled.img`
    width: 150px;
    heigth: 150px;
    margin-bottom: 10px;
`;

const PostContentButton = styled.button`
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
`;

const ButtonPostUtils = styled.button`
    padding: 5px;
    margin: 5px;
`;

const PostContainer = styled.div`
    text-align: center;
    border: solid 2px white;
`;

//

const token = localStorage.getItem('token');

// Create a Post from the description & image provided

//

function Posts() {
    const [posts, setPosts] = useState();

    //Create a post
    async function CreatePost(e) {
        e.preventDefault();
        const image = e.target['image'].files[0];
        const description = e.target['description'].value;

        const data = new FormData();
        data.append('imageUrl', image);
        data.append('description', description);

        fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        })
            .then((res) => {
                if (res.ok) {
                    alert('Post Crée');
                }
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    //Get Posts from fetch api if user have a token
    async function getInfo() {
        const res = await fetch('http://localhost:8000/api/posts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setPosts(data.posts);
    }

    async function deleteInfo(id) {
        await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <form onSubmit={CreatePost}>
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
            <div>
                <ButtonPostUtils onClick={getInfo}>Get</ButtonPostUtils>
            </div>
            {posts && (
                <div>
                    {posts.map((post) => {
                        return (
                            <PostContainer key={post._id}>
                                <p>{post.description}</p>
                                <StyledImg
                                    src={post.imageUrl}
                                    alt="image_post_user"
                                ></StyledImg>
                                <br />
                                <button
                                    onClick={() => {
                                        deleteInfo(`${post._id}`);
                                    }}
                                >
                                    Delete
                                </button>
                            </PostContainer>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Posts;
