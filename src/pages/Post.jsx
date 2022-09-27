import styled from 'styled-components';
import Header from '../components/Home/Header';
import DeletePost from '../components/Home/DeletePost';
import ModifyPost from '../components/Home/ModifyPost';
import Avis from '../components/Home/Avis';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const ImgResize = styled.img`
    width: 300px;
    heigth: 300px;
`;

const LikeContainer = styled.div`
    display: flex;
`;

const LikeNumber = styled.p`
    margin-right: 15px;
`;

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
function Post() {
    const {postId} = useParams();
    const [post, setPost] = useState();
    const [user, setUser] = useState();

    async function getPostInfo() {
        const res = await fetch(`http://localhost:8000/api/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setPost(data);
    }
    async function getUserInfo() {
        const res = await fetch(
            `http://localhost:8000/api/auth/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();
        await setUser(data.user);
        console.log(data);
    }

    async function getUsers() {
        const res = await fetch(`http://localhost:8000/api/auth/users/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        console.log(data);
    }
    useEffect(() => {
        getPostInfo().then(() => {});
        getUserInfo().then(() => {});
        getUsers().then(() => {});
    }, []);

    return (
        <>
            <Header />
            <div>
                {post && user && (
                    <>
                        <ImgResize
                            src={post.imageUrl}
                            alt="post_image"
                        ></ImgResize>
                        <p>{post.description}</p>
                        <Avis />
                        <LikeContainer>
                            <LikeNumber>{post.likes}</LikeNumber>
                            <LikeNumber>{post.dislikes}</LikeNumber>
                        </LikeContainer>

                        {(user.isAdmin === true ||
                            user._id === post.userId) && (
                            <>
                                <DeletePost />
                                <ModifyPost />
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Post;
