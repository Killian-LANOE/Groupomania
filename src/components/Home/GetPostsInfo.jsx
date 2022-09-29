import {useState, useEffect} from 'react';
import styled from 'styled-components';

// Elements Styles
const PostLink = styled.a`
    color: white;
    text-decoration: none;
`;

const PostContainer = styled.div`
    text-align: center;
    border: solid 2px white;
    margin: 15px 0px;
    width: 300px;
    @media (min-width: 769px) {
        width: 400px;
        height: 270px;
    }
`;

const StyledImg = styled.div`
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
`;

const PostsStyled = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`;

const PostDescription = styled.p`
    border: 2px solid white;
    margin: 0;
    padding: 15px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 769px) {
        height: 38px;
    }
`;

//

const token = localStorage.getItem('token');

//Get Posts from fetch api if user have a token

function GetPostInfo() {
    const [posts, setPosts] = useState();
    async function getInfo() {
        await fetch('http://localhost:8000/api/posts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.posts);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <>
            {posts && (
                <PostsStyled>
                    {posts.map((post) => {
                        function goToPost(e) {
                            e.preventDefault();
                            window.location = `/home/${post._id}`;
                        }

                        return (
                            <PostLink
                                key={post._id}
                                href="*"
                                onClick={goToPost}
                            >
                                <PostContainer>
                                    <StyledImg
                                        style={{
                                            backgroundImage: `url(${post.imageUrl})`,
                                        }}
                                    ></StyledImg>
                                    <PostDescription>
                                        {post.description}
                                    </PostDescription>
                                </PostContainer>
                            </PostLink>
                        );
                    })}
                </PostsStyled>
            )}
        </>
    );
}

export default GetPostInfo;
