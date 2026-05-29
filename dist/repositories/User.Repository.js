"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
// Poder treaer esos datos de las entidades o tablas de la bd
exports.UserRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
