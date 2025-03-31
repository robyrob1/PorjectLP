// backend/routes/api/spots.js
const express = require('express');
const router = express.Router();
const { Spot, SpotImage, User, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

// Validation middleware for spots
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city').exists({ checkFalsy: true }).withMessage('City is required'),
  check('state').exists({ checkFalsy: true }).withMessage('State is required'),
  check('country').exists({ checkFalsy: true }).withMessage('Country is required'),
  check('lat')
    .isDecimal()
    .withMessage('Latitude must be a valid decimal'),
  check('lng')
    .isDecimal()
    .withMessage('Longitude must be a valid decimal'),
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .isDecimal({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

// GET all spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    include: [
      { model: SpotImage },
      { model: Review }
    ]
  });

  const spotsList = spots.map(spot => {
    const totalStars = spot.Reviews.reduce((sum, review) => sum + review.stars, 0);
    const avgRating = totalStars / spot.Reviews.length;
    const previewImage = spot.SpotImages.find(img => img.preview)?.url || null;

    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: parseFloat(spot.lat),
      lng: parseFloat(spot.lng),
      name: spot.name,
      description: spot.description,
      price: parseFloat(spot.price),
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: avgRating || 0,
      previewImage
    };
  });

  res.json({ Spots: spotsList });
});

// GET spots owned by current user
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    where: { ownerId: user.id },
    include: [
      { model: SpotImage },
      { model: Review }
    ]
  });

  const formattedSpots = spots.map(spot => {
    // Same formatting logic as GET all spots
    // ...
  });

  res.json({ Spots: formattedSpots });
});

// GET details for a specific spot
router.get('/:id', async (req, res) => {
  const spot = await Spot.findByPk(req.params.id, {
    include: [
      { model: SpotImage, attributes: ['id', 'url', 'preview'] },
      { model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName'] },
      { model: Review }
    ]
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const numReviews = spot.Reviews.length;
  const avgStarRating = spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews;

  res.json({
    ...spot.toJSON(),
    numReviews,
    avgStarRating: avgStarRating || 0,
    SpotImages: spot.SpotImages,
    Owner: spot.Owner
  });
});

// POST create a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  res.status(201).json(spot);
});

// POST add an image to a spot
router.post('/:id/images', requireAuth, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.id);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const image = await SpotImage.create({
    spotId: spot.id,
    url,
    preview
  });

  res.json({
    id: image.id,
    url: image.url,
    preview: image.preview
  });
});

// PUT update a spot
router.put('/:id', requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const spot = await Spot.findByPk(id);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  res.json(spot);
});

// DELETE a spot
router.delete('/:id', requireAuth, async (req, res) => {
  const { user } = req;
  const spot = await Spot.findByPk(req.params.id);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await spot.destroy();
  res.json({ message: "Successfully deleted" });
});

module.exports = router;