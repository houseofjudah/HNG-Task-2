const { Organisation } = require('../models/org.model');
const { User } = require('../models/user.model')
const getOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.findAll({
      where: {
        userId: req.user.userId
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {
        organisations: organisations.map((organisation) => ({
          orgId: organisation.orgId,
          name: organisation.name,
          description: organisation.description
        }))
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Failed to retrieve organisations'
    });
  }
};

const getOrganisation = async (req, res) => {
  try {
    const organisation = await Organisation.findOne({
      where: {
        orgId: req.params.orgId,
        userId: req.user.userId
      }
    });

    if (!organisation) {
      res.status(404).json({
        status: 'Not found',
        message: 'Organisation not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Failed to retrieve organisation'
    });
  }
};

const createOrganisation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organisation = await Organisation.create({
      orgId: `${req.user.userId}-org`,
      name,
      description
    });

    req.user.addOrganisation(organisation);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Failed to create organisation'
    });
  }
};

const addUsersToOrganisation = async (req, res) => {
  try {
    const { userId } = req.body;
    const organisation = await Organisation.findOne({
      where: {
        orgId: req.params.orgId
      }
    });

    if (!organisation) {
      res.status(404).json({
        status: 'Not found',
        message: 'Organisation not found'
      });
    }

    const user = await User.findOne({
      where: {
        userId
      }
    });

    if (!user) {
      res.status(404).json({
        status: 'Not found',
        message: 'User not found'
      });
    }

    organisation.addUser(user);

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: 'Failed to add user to organisation'
    });
  }
};

module.exports = {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  addUsersToOrganisation
};