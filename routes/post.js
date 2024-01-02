const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const post = require('../controllers/posts');

router.get('/', auth, post.getAllPosts);
router.get('/:id', auth, post.getPost);
router.post('/newpost', auth, multer, post.newPost);
router.delete('/:id', auth, post.deletePost);

router.get('/user/:id', auth, authAdmin, post.getUserPosts); 
router.delete('/admin/:id', auth, authAdmin, post.deletePost);

module.exports = router;