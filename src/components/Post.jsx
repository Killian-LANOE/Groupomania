import {useState} from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledInput = styled.input`
    padding: 15px;
`;

const DisplayImage = styled.div`
    width: 375px;
    height: 211px;
    border: 1px solid white;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

/*function PostCreate() {
    let uploaded_image = '';
    function handleImage(event) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            uploaded_image = reader.result;
            document.querySelector(
                '#display_image'
            ).style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <div>
            <StyledLabel>
                <input placeholder="Racontez votre histoire !"></input>
                <StyledInput
                    onChange={handleImage}
                    type="file"
                    id="image_input"
                    accept="image/png, image/jpg"
                ></StyledInput>
                <DisplayImage id="display_image"></DisplayImage>
            </StyledLabel>
        </div>
    );
}

export default PostCreate;*/

function CreatePost(e) {
    e.preventDefault();
    fetch('http://localhost:8000/api/posts', {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            description: e.target['description'].value,
            imageUrl: e.target['file'].value,
        }),
    });
}

function Posts() {
    const [post, setPost] = useState();
    async function getInfo() {
        const res = await fetch('http://localhost:8000/api/posts');
        const data = await res.json();
        console.log(data.message);
        setPost(data);
    }

    return (
        <div>
            <form onSubmit={CreatePost}>
                <StyledLabel>
                    <StyledInput
                        type="text"
                        name="description"
                        id="description"
                    ></StyledInput>
                </StyledLabel>
                <StyledLabel>
                    <StyledInput
                        type="file"
                        name="file"
                        id="file"
                    ></StyledInput>
                </StyledLabel>
                <button>Create Post</button>
            </form>

            <button onClick={getInfo}>Get</button>
            {post && (
                <>
                    <p>{post.message}</p>
                    <p>{post.text}</p>
                </>
            )}
        </div>
    );
}

export default Posts;
