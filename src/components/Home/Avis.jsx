import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons';

const LikeButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const AvisButton = styled.button`
    margin: 10px 10px 0px 10px;
`;

const token = localStorage.getItem('token');

const likeIcon = <FontAwesomeIcon icon={faThumbsUp} />;
const dislikeIcon = <FontAwesomeIcon icon={faThumbsDown} />;

function Avis() {
    const {postId} = useParams();
    const {userId} = useParams();
    const [likeactive, setlikeactive] = useState(false);
    const [dislikeactive, setdislikeactive] = useState(false);

    async function handleLike(e) {
        e.preventDefault();
        if (likeactive) {
            setlikeactive(false);
            console.log('likeactive, like -1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: 0,
                }),
            }).then((res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
        } else {
            setlikeactive(true);
            console.log('like else, like +1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: 1,
                }),
            }).then((res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
        }
    }

    async function handleDislike(e) {
        e.preventDefault();

        if (dislikeactive) {
            setdislikeactive(false);
            console.log('dislike active, dislike -1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: 0,
                }),
            }).then((res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
        } else {
            setdislikeactive(true);
            console.log('dislike else, dislike +1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: -1,
                }),
            }).then((res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
        }
    }

    useEffect(() => {
        const isLikeActive = window.localStorage.getItem('likeActive');
        const isDislikeActive = window.localStorage.getItem('dislikeActive');

        if (isLikeActive !== null) {
            setlikeactive(JSON.parse(isLikeActive));
        }

        if (isDislikeActive !== null) {
            setdislikeactive(JSON.parse(isDislikeActive));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('likeActive', JSON.stringify(likeactive));
        window.localStorage.setItem(
            'dislikeActive',
            JSON.stringify(dislikeactive)
        );
    });

    return (
        <LikeButton>
            <AvisButton onClick={handleLike}>{likeIcon}</AvisButton>
            <AvisButton onClick={handleDislike}>{dislikeIcon}</AvisButton>
        </LikeButton>
    );
}

export default Avis;
