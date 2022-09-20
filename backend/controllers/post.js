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

exports.modifyPost = (req, res, next) => {
    const postObject = req.file
        ? {
              ...JSON.parse(req.body.post),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                  req.file.filename
              }`,
          }
        : {...req.body};

    delete postObject._userId;
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (post.userId !== req.auth.userId) {
                res.status(403).json({message: 'Non-autorisé !'});
            } else {
                Post.updateOne(
                    {_id: req.params.id},
                    {...postObject, _id: req.params.id}
                )
                    .then(() =>
                        res.status(200).json({message: 'Post modifié !'})
                    )
                    .catch((error) => res.status(401).json({error}));
            }
        })
        .catch((error) => res.status(400).json({error}));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (post.userId !== req.auth.userId) {
                res.status(403).json({message: 'Non-autorisé !'});
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
