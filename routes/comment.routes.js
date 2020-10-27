const models = require("../db/db_models")
const Post = models.Post
const Comment = models.Comment
const auth = require('../middleware/auth.middleware')
const {Router} = require("express")
const router = Router()

router.post('/create/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId)
        await post.createComment({text: req.body.text, owner: req.user.userId}).then(comment => {
            res.status(201).json({comment})
        })
    } catch (err) {
        res.status(500).json({message: "Something go wrong, try again"})
    }
})

router.get('/:postId', auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId)
        const comments = await post.getComments()
        res.status(201).json({comments})
    } catch (err) {
        res.status(500).json({message: "Something go wrong, try again"})
    }
})

module.exports = router