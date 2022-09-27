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
`;

const StyledImg = styled.img`
    width: 150px;
    heigth: 150px;
    margin-bottom: 10px;
`;

const PostsStyled = styled.div`
    display: flex;
    flex-direction: column-reverse;
`;

//

const token = localStorage.getItem('token');

//Get Posts from fetch api if user have a token

function GetPostInfo() {
    const [posts, setPosts] = useState();
    async function getInfo() {
        const res = await fetch('http://localhost:8000/api/posts', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setPosts(data.posts);
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
                                        src={post.imageUrl}
                                        alt="image_post_user"
                                    ></StyledImg>
                                    <p>{post.description}</p>
                                    <br />
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
