// backend/microservices/game_service/models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, default: 'waiting' }, // waiting, in-progress, finished
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', gameSchema);