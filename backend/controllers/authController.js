const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
    const { email, password, username, address, city, state, zip } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword, username, address, city, state, zip });
        await user.save();

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
