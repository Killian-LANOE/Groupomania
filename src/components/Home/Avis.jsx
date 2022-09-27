import {useParams} from 'react-router-dom';
import {useState} from 'react';

const token = localStorage.getItem('token');

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
            await setlike(0);

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

    return (
        <>
            <button onClick={handleLike}>Like {like}</button>
            <button onClick={handleDislike}>Dislike {dislike}</button>
        </>
    );
}

export default Avis;
