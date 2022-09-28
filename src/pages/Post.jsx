import styled from 'styled-components';
import Header from '../components/Header';
import DeletePost from '../components/Home/DeletePost';
import ModifyPost from '../components/Home/ModifyPost';
import Avis from '../components/Home/Avis';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const ImgResize = styled.img`
    width: 280px;
    heigth: 280px;
`;

const LikeContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const LikeNumber = styled.p`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;

const PostContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModifyContainer = styled.div`
    margin-top: 50px;
    border: 2px solid white;
    padding: 15px;
`;

const PostElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 2px solid white;
    margin-bottom: 15px;
`;

const NoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    }

    useEffect(() => {
        getPostInfo().then(() => {});
        getUserInfo().then(() => {});
    }, []);

    return (
        <>
            <Header />
            <PostContainer>
                {post && user && (
                    <>
                        <PostElement>
                            <ImgResize
                                src={post.imageUrl}
                                alt="post_image"
                            ></ImgResize>
                            <p>{post.description}</p>
                        </PostElement>
                        <NoteContainer>
                            <Avis />
                            <LikeContainer>
                                <LikeNumber>
                                    {post.likes} <span>J'aime</span>
                                </LikeNumber>
                                <LikeNumber>
                                    {post.dislikes} <span>Je n'aime pas</span>
                                </LikeNumber>
                            </LikeContainer>
                        </NoteContainer>

                        {(user.isAdmin === true ||
                            user._id === post.userId) && (
                            <>
                                <DeletePost />
                                <ModifyContainer>
                                    <ModifyPost />
                                </ModifyContainer>
                            </>
                        )}
                    </>
                )}
            </PostContainer>
        </>
    );
}

export default Post;
