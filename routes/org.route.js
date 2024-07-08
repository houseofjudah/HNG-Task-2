const express = require('express');
const router = express.Router();
const {
  getOrganisations,
  getOrganisation,
  createOrganisation,
  addUsersToOrganisation
} = require('../controllers/org.controller');

router.get('/', getOrganisations);
router.get('/:orgId', getOrganisation);
router.post('/', createOrganisation);
router.post('/:orgId/users', addUsersToOrganisation);

module.exports = router;