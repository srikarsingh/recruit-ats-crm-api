const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const accountSchema = mongoose.Schema(
  {
    account_name: {
      type: String,
      required: true,
      trim: true,
    },
    account_owner:{
      type: mongoose.SchemaTypes.ObjectId,
      ref:"User"
    },
    account_currency_type:{
      type: String,
      default:null
    },
    account_status:{
      type: String,
      default:"active"
    }
  },
  {
    timestamps: {
      "createdAt":"account_added_on",
      "updatedAt":"account_last_modified"
    },
  }
);

// add plugin that converts mongoose to json
accountSchema.plugin(toJSON);
accountSchema.plugin(paginate);


/**
 * Check if account name is taken
 * @param {string} account_name - The account name
 * @returns {Promise<boolean>}
 */
accountSchema.statics.isAccountNameTaken = async function (account_name, excludeAccountId) {
  const account = await this.findOne({ account_name, _id: { $ne: excludeAccountId } });
  return !!account;
};

/**
 * @typedef Account
 */
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
