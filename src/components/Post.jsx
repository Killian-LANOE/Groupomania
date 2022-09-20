import {useState} from 'react';
import styled from 'styled-components';

// Elements Styles
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

const StyledImg = styled.img`
    width: 300px;
    heigth: auto;
`;

//

const token = localStorage.getItem('token');

// Create a Post from the description & image provided
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
//

//Get Posts from fetch api if user have a token
function Posts() {
    const [post, setPost] = useState();
    async function getInfo() {
        const res = await fetch('http://localhost:8000/api/posts/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log(data);
        setPost(data);
    }
    //

    // Display Image in a div after choosing it
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
    //

    return (
        <div>
            <form onSubmit={CreatePost}>
                <StyledLabel>
                    <input
                        type="text"
                        placeholder="Racontez votre histoire !"
                        id="description"
                        name="description"
                    ></input>
                    <StyledInput
                        onChange={handleImage}
                        type="file"
                        id="image"
                    ></StyledInput>
                    <DisplayImage id="display_image"></DisplayImage>
                </StyledLabel>
                <button>Post Content</button>
            </form>
            <button onClick={getInfo}>Get</button>
            {post && (
                <div>
                    <p>{post.description}</p>
                    <StyledImg
                        src={post.imageUrl}
                        alt="image_post_user"
                    ></StyledImg>
                </div>
            )}
        </div>
    );
}

export default Posts;
