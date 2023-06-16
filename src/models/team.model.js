const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
  {
      team_name: {
        type: String,
        required: true,
        trim: true,
      },
      account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Account",
        required:true
      },
      associated_members: [
        {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User",
        }
      ]
    },
    {
      timestamps: {
        "createdAt":"team_added_on",
        "updatedAt":"team_last_modified"
      }
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);


/**
 * Check if team name is taken
 * @param {string} team_name - The team name
 * @returns {Promise<boolean>}
 */
teamSchema.statics.isAccountNameTaken = async function (team_name, excludeTeamId) {
  const team = await this.findOne({ team_name, _id: { $ne: excludeTeamId } });
  return !!team;
};


/**
 * @typedef Team
 */
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
