const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((project) => project.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs: blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Blog,
        }
      ],

      where: {
        blog_id: req.params.id
      },
    });

    const commentWithoutLog = commentData.map((value) => value.get({plain: true}));
    const comment = commentWithoutLog.map((value) => {
      return {
        ...value,
        logged_in_user: req.session.user_id,
      };
    });
    console.log(comment);
    
    res.render('blog', {
      blog: blog,
      comments: comment,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }, {model: Comment}],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/newBlog', (req, res) => {
  
    res.render('newBlog');
});

module.exports = router;
