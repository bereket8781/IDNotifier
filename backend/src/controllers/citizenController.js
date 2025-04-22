const Citizen = require('../models/Citizen');

async function getAllCitizens(req, res, next) {
  try {
    const citizens = await Citizen.findAll();
    res.json(citizens);
  } catch (err) {
    next(err);
  }
}

async function getCitizenById(req, res, next) {
  try {
    const { id } = req.params;
    const citizen = await Citizen.findByPk(id);
    if (!citizen) {
      return res.status(404).json({ error: 'Citizen not found' });
    }
    res.json(citizen);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllCitizens, getCitizenById };