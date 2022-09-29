import styled from 'styled-components';
import Header from '../components/Header';
import DeletePost from '../components/Home/DeletePost';
import ModifyPost from '../components/Home/ModifyPost';
import Avis from '../components/Home/Avis';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import colors from '../utils/colors';

const StyledImg = styled.div`
    height: 200px;
    width: 300px;
    background-repeat: no-repeat;
    background-size: cover;
    @media (min-width: 769px) {
        width: 400px;
        height: 300px;
    } ;
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
    border: 2px solid white;
    margin-bottom: 15px;
    width: 300px;
    @media (min-width: 769px) {
        width: 400px;
        height: 300px;
    } ;
`;

const NoteContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostDescription = styled.p`
    border: 2px solid white;
    padding: 15px;
    width: 270px;
    margin: 0;
    text-align: center;
    @media (min-width: 769px) {
        width: 370px;
    }
`;

const MainContainer = styled.div`
    display: flex;
    background: ${colors.secondary};
    justify-content: center;
`;

const MidleContainer = styled.div`
    width: 100%;
    background: ${colors.tertiary};
    @media (min-width: 426px) {
        width: 70%;
    }
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
        <MainContainer>
            <MidleContainer>
                <Header />
                <PostContainer>
                    {post && user && (
                        <>
                            <PostElement>
                                <StyledImg
                                    style={{
                                        backgroundImage: `url(${post.imageUrl})`,
                                    }}
                                ></StyledImg>
                                <PostDescription>
                                    {post.description}
                                </PostDescription>
                            </PostElement>
                            <NoteContainer>
                                <Avis />
                                <LikeContainer>
                                    <LikeNumber>{post.likes} J'aime</LikeNumber>
                                    <LikeNumber>
                                        {post.dislikes} Je n'aime pas
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
            </MidleContainer>
        </MainContainer>
    );
}

export default Post;
