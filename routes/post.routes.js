const models = require("../db/db_models")
const Post = models.Post
const User = models.User
const auth = require("../middleware/auth.middleware")
const {Router} = require('express')
const router = Router()

router.get("/news", auth, async (req, res) => {
    try {
        const posts = await Post.findAll({raw: true})
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

router.get("/:id", auth, async (req, res) =>  {
    try {
        const post = await Post.findByPk(req.params.id, {raw: true})
        res.json({post})
    } catch (err) {
        res.status(500).json({message: 'Something go wrong, try again'})
    }
})

router.post("/create", auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId)
        await user.createPost({text: req.body.text}).then(post => {
            res.status(201).json({post})
        })
    } catch (err) {
        res.status(500).json({message: 'Something go wrong, try again', err: err.message})
    }
})

module.exports = router