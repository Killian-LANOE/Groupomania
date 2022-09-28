import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons';

const LikeButton = styled.div`
    display: flex;
    flex-direction: row;
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
    const [like, setlike] = useState(1);
    const [dislike, setdislike] = useState(-1);
    const [likeactive, setlikeactive] = useState(false);
    const [dislikeactive, setdislikeactive] = useState(false);

    async function handleLike(e) {
        e.preventDefault();
        console.log('click like');
        if (likeactive) {
            await setlikeactive(false);
            await setlike(0);
            console.log('likeactive, like -1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: like,
                }),
            });
        } else {
            console.log('like else, like +1');
            await setlikeactive(true);
            await setlike(1);

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: like,
                }),
            });
        }
    }

    async function handleDislike(e) {
        e.preventDefault();
        console.log('click dislike');

        if (dislikeactive) {
            await setdislikeactive(false);
            await setdislike(-1);
            console.log('dislike active, dislike -1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: dislike,
                }),
            });
        } else {
            setdislikeactive(true);
            setdislike(0);
            console.log('dislike else, dislike +1');

            await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: userId,
                    like: dislike,
                }),
            });
        }
    }

    useEffect(() => {
        const isLikeActive = window.localStorage.getItem('likeActive');
        console.log(isLikeActive);

        if (isLikeActive !== null) {
            setlikeactive(JSON.parse(isLikeActive));
        }
    }, []);

    useEffect(() => {
        const isDislikeActive = window.localStorage.getItem('dislikeActive');
        console.log(isDislikeActive);

        if (isDislikeActive !== null) {
            setdislikeactive(JSON.parse(isDislikeActive));
        }
        return () => {
            setdislikeactive();
        };
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
