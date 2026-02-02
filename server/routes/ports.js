const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require( '../models/Post')

//@router POST api/posts
//@desc create posts
//@access Private
router.post('/', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newPost = new Post({
			title,
			description,
			url: url.startsWith('https://') ? url : `https://${url}`,
			status: status || 'TO LEARN',
			user: req.userId
		})

		await newPost.save()

		res.json({ success: true, message: 'Happy learning!', post: newPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


//@router GET api/posts
//@desc get posts
//@access Private
router.get('/', verifyToken , async (req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        res.json({ success: true, posts})   
		 console.log(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, messsage: 'Internal server error'})
    }
}) 
//@router PUT api/posts
//@desc update posts
//@access private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status} = req.body

	//simple validation
	if(!title)
		return res.status(400).json({ success: false, message: 'title it required'})
	try {
		let updatePost = {
			title,
			description: description || '',
			url: (url.startsWith('https://') ? url: `htpps://${url}`) || '',
			status: status || 'TO LEARN'
		}
		const postUpdateCondition = {_id: req.params.id, user: req.userId}
		updatePost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatePost,
			{ new: true}
		)
		//User not authorised to update post or post not found
		if(!updatePost)
			return res.status(401).json({success: false, message: 'Post not founof user authorised'})
		res.json({ success: true, message: 'update ok', post: updatePost})
	} catch (error) {
			res.status(500).json({ success: false, messsage: 'Internal server error'})	
	}
})
// @router DELETE api/post
// @ Delete post
// @desc private
router.delete('/:id', verifyToken, async ( req, res) => {
	try {
		const postDeleteCondition = {_id: req.params.id, user: req.userId}
		const deletePost = await Post.findByIdAndDelete(postDeleteCondition)

		// user not authorised or post not found
		if(!deletePost)
			return res.status(401).json({success: false, messgae: ' Post not found or user authorised'})
		res.json({success: true, post: deletePost})
	} catch (error) {
		res.status(500).json({ success: false, messsage: 'Internal server error'})	
	}
})
module.exports = router