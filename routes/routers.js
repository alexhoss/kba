const express = require('express');
// const artistController = require('../controllers/ArtistController');
const router = express.Router();
const profileController = require('../controllers/profileController')
const postController = require('../controllers/postController')
const searchController = require('../controllers/searchController')
const messageController = require('../controllers/messageController')
    // const loginController = require('../controllers/loginController')


// router.get('/people/:id', artistController.getPeople);

// router.post('/people/deleteByName/:name', artistController.postDeletePeople)

// router.post('/peoples/add', artistController.postAddPeople)

// router.post('/home', loginController.getUser);
// CURTIS ROUTER
router.post('/login', profileController.postLoginProfile)
router.post('/signup', profileController.postSignupProfile)
router.post('/registration', profileController.postRegistrationProfile)


// Johnny
router.get('/search_results', searchController.search)
router.get('/all_posts', postController.getAllPosts)

router.get('/profile_left', profileController.getPeople)

router.get('/home', postController.getAllPostsHome)
router.post('/postRequest', postController.postDiscussionRequest)
router.post('/postReply', postController.postReplyRequest)

//profiles

router.get('/profiles', profileController.getAllPeople);

router.get('/profiles/:id', profileController.getPeople);

router.post('/like/:id', profileController.addLike)

router.get('/messages', messageController.getAllSubjectMessages)
router.post('/sendMessage', messageController.sendMessage)
    // profileController.getPostsFromUser)
module.exports = router;