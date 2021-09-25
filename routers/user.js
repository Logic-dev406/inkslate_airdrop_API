const express = require('express');
const router = express.Router();
const User = require('../models/user');
const response = require('../helpers/response');

router.post('/participate', async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email });
    const referredByID = (await req.query.ref) || '';
    const refID = await Math.random().toString(36).toUpperCase().substr(2, 8);

    if (userExist) {
        return res.status(200).send(response('Login successfully', userExist));
    }

    try {
        let user = new User({
            email: req.body.email,
            referredByID: referredByID,
            refID: refID,
            referralLink: `https://newsapp-landing-page.vercel.app/login/${refID}`,
        });
        user = await user.save();

        if (!user)
            return res.status(404).send(response('Login failed', {}, false));

        res.send(response('User successfully created', user));
    } catch (error) {
        res.send(response(error.message, {}, false));
    }
});

router.get('/referral', async (req, res) => {
    const referral = await User.findOne({
        referredByID: referredByID,
    });
    console.log(referral);
    res.send(referral);
});

module.exports = router;
