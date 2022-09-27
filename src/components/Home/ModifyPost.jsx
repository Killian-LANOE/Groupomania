import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

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
`;

const token = localStorage.getItem('token');

function ModifyPost() {
    const [post, setPost] = useState({description: ''});
    const {postId} = useParams();
    useEffect(() => {
        fetch(`http://localhost:8000/api/posts/${postId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setPost(data);
            });
    }, []);
    function handleModify(e) {
        e.preventDefault();
        const image = e.target['image'].files[0];
        const description = e.target['description'].value;

        const data = new FormData();
        data.append('imageUrl', image);
        data.append('description', description);

        fetch(`http://localhost:8000/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: data,
        })
            .then((res) => {
                if (res.ok) {
                    alert('Post Modifiée !');
                    window.location = '/home';
                }
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
    return (
        <>
            <form onSubmit={handleModify}>
                <StyledLabel>
                    <DescriptionInput
                        type="text"
                        placeholder="Entrez votre modification !"
                        id="description"
                        name="description"
                        value={post.description}
                        onChange={(event) => {
                            setPost({...post, description: event.target.value});
                        }}
                    ></DescriptionInput>
                    <FileInput type="file" id="image"></FileInput>
                    <PostContentButton>Modify Content</PostContentButton>
                </StyledLabel>
            </form>
        </>
    );
}

export default ModifyPost;
