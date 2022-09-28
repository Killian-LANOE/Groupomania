import CreatePost from './CreatePost';
import GetPostInfo from './GetPostsInfo';
import styled from 'styled-components';

const PostsContainer = styled.div`
    height: 100vh;
`;

function Posts() {
    return (
        <PostsContainer>
            <CreatePost />
            <GetPostInfo />
        </PostsContainer>
    );
}

export default Posts;
