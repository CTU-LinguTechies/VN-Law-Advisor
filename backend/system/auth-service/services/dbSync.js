const sequelize = require('./sequelizeService');
require('../models/User');

sequelize.sync();
