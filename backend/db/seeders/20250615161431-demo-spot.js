'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "1 Emberwood Hollow",
        city: "Frostpine",
        state: "Alveria",
        country: "Eldoria",
        lat: 11.11111,
        lng: -11.11111,
        name: "Mage's Lakeside Cabin",
        description: "Nestled deep in Frostpine Forest, this secluded mage's cabin overlooks the enchanted Mistveil Lake. Cast your line for the mythical Frostscale Trout, then warm your soul by the runestone firepit under the aurora-lit skies.",
        price: 72
      },
      {
        ownerId: 2,
        address: "2 Moonpetal Path",
        city: "Velwyn",
        state: "Glimmerwine",
        country: "Eldoria",
        lat: 22.2222,
        lng: -22.2222,
        name: "Elven Vineyard Retreat",
        description: "Tucked between rolling hills and glowing vineyards, this elven getaway offers endless evenings of stargazing and sweet nectar tasting. Every booking includes a daily goblet of enchanted elderberry wine.",
        price: 120
      },
      {
        ownerId: 3,
        address: "3 Bardstone Lane",
        city: "Daggerfall",
        state: "Stormhold",
        country: "Eldoria",
        lat: 33.3333,
        lng: -33.3333,
        name: "Tavern Above The Guildhall",
        description: "A favorite among traveling adventurers and guild members alike. Stay above the famed Daggerfall Bard Guild—live music echoes nightly and every shopkeeper knows your name.",
        price: 80
      },
      {
        ownerId: 1,
        address: "187 Hollowcover Rise",
        city: "Ravensreach",
        state: "Ebonmoor",
        country: "Eldoria",
        lat: 44.4444,
        lng: -44.4444,
        name: "Druid’s Wildflower Haven",
        description: "Hidden in the whispering meadows of Ebonmoor, this herbalist's retreat is ideal for alchemists and nature lovers. Watch morning fog dance across ancient fields from your moss-covered veranda.",
        price: 87
      },
      {
        ownerId: 2,
        address: "154 Catapillar Canopy",
        city: "Greenroot",
        state: "Feywild Reach",
        country: "Eldoria",
        lat: 55.5555,
        lng: -55.5555,
        name: "Canopy Treefolk Sanctuary",
        description: "Live among the whispering leaves in this ancient treefolk haven. Swing from vine to vine or follow the river path for a trek through ancient ruins protected by forest spirits.",
        price: 102
      },
      {
        ownerId: 3,
        address: "492 Coralspine Docks",
        city: "Saltwharf",
        state: "Azure Isles",
        country: "Eldoria",
        lat: 66.6666,
        lng: -66.6666,
        name: "Seashell Siren’s Bungalow",
        description: "Overlooking moonlit tides, this seaside escape offers private coves and ocean-song breezes. Merfolk sightings at dusk are rumored but not guaranteed.",
        price: 92
      },
      {
        ownerId: 1,
        address: "17239 Scholar's Bend",
        city: "Wyrmsgate",
        state: "Runebreak",
        country: "Eldoria",
        lat: 77.7777,
        lng: -77.7777,
        name: "Alchemist’s Roost in Wyrmsgate",
        description: "Centrally located in the spellbound capital, this modest study above a potion shop is ideal for aspiring wizards. Fresh ingredients await at the arcane market just two blocks away.",
        price: 49
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
