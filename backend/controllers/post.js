const Post = require('../models/Post');
const fs = require('fs');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json({posts}))
        .catch((error) => res.status(400).json({error}));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({error}));
};

exports.createPost = (req, res, next) => {
    const post = new Post({
        userId: req.auth.userId,
        description: req.body.description,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file?.filename
        }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    post.save()
        .then(() => res.status(201).json({message: 'Post crée !'}))
        .catch((error) => res.status(400).json({error}));
};

exports.modifyPost = async (req, res, next) => {
    const description = req.body.description;
    const imageUrl = req.file
        ? `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`
        : null;

    const postObject = {
        description,
        imageUrl,
    };
    console.log(description);
    const post = await Post.findOne({_id: req.params.id});
    delete req.body.user_id;

    if (post.userId !== req.auth.userId) {
        res.status(403).json({message: 'Non-autorisé'});
    } else {
        if (req.file !== undefined) {
            console.log(postObject.imageUrl);
            post.imageUrl = postObject.imageUrl;
        }

        post.description = postObject.description;
        return post
            .save()
            .then(() => res.status(201).json({message: 'post mis à jour'}))
            .catch((error) => res.status(500).json({error}));
    }
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (req.body.isAdmin !== true && req.body.userId !== post.userId) {
                res.status(403).json({message: 'Non-autorisé'});
            } else {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() =>
                            res.status(200).json({message: 'Post supprimé !'})
                        )
                        .catch((error) => res.status(401).json({error}));
                });
            }
        })
        .catch((error) => res.status(500).json({error}));
};

exports.likes = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (
                post.usersDisliked.indexOf(req.auth.userId) === -1 &&
                post.usersLiked.indexOf(req.auth.userId) === -1
            ) {
                if (req.body.like === 1) {
                    console.log('1 like');
                    post.usersLiked.push(req.auth.userId);
                    post.likes += req.body.like;
                } else if (req.body.like === -1) {
                    console.log('1 dislike');
                    post.usersDisliked.push(req.auth.userId);
                    post.dislikes -= req.body.like;
                }
            }

            if (
                post.usersLiked.indexOf(req.auth.userId) !== -1 &&
                req.body.like === 0
            ) {
                console.log('- 1 like');
                const userLike = post.usersLiked.findIndex(
                    (user) => user === req.auth.userId
                );
                post.usersLiked.splice(userLike, 1);
                post.likes -= 1;
            }

            if (
                post.usersDisliked.indexOf(req.auth.userId) !== -1 &&
                req.body.like === 0
            ) {
                console.log('-1 dislike');
                const userLike = post.usersDisliked.findIndex(
                    (user) => user === req.auth.userId
                );
                post.usersDisliked.splice(userLike, 1);
                post.dislikes -= 1;
            }
            post.save();
            res.status(201).json({message: 'Like / Dislike mis à jour'});
        })
        .catch((error) => res.status(500).json({error}));
};
