const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const user = await User.create({
      userId: `${firstName}${lastName}`,
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      phone
    });

    const organisation = await Organisation.create({
      orgId: `${user.userId}-org`,
      name: `${firstName}'s Organisation`,
      description: ''
    });

    user.addOrganisation(organisation);

    const accessToken = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.status(201).json({
      status: 'uccess',
      message: 'Registration successful',
      data: {
        accessToken,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(422).json({
        status: 'Bad request',
        message: 'Registration unsuccessful',
        errors: [
          {
            field: 'email',
            message: 'Email already exists'
          }
        ]
      });
    } else {
      res.status(400).json({
        status: 'Bad request',
        message: 'Registration unsuccessful'
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({
        status: 'Bad request',
        message: 'Authentication failed'
      });
    }

    const accessToken = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.status(200).json({
      status: 'uccess',
      message: 'Login successful',
      data: {
        accessToken,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Login unsuccessful'
    });
  }
};

module.exports = { register, login };