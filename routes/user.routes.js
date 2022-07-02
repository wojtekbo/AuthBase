const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
  res.render('logged', {user: req.user._json.name, image: req.user._json.picture});
});

router.get('/profile', (req, res) => {
  if (req.user) {
    res.render('profile');
  } else {
    res.render('noPermission');
  }
});

router.get('/profile/settings', (req, res) => {
  if (req.user) {
    res.render('settings');
  } else {
    res.render('noPermission');
  }
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.render('logout');
});

module.exports = router;
