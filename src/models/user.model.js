const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
      user_name: {
        type: String,
        required: true,
        trim: true,
      },
      user_email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
          }
        },
      },
      user_password: {
        type: String,
        trim: true,
        minlength: 8,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
        private: true, // used by the toJSON plugin
      },
      user_role: {
        type: String,
        enum: roles,
        default: 'user',
      },
      account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Account",
        required:true
      },
      user_status: {
        type: String,
        enum: ["Active","Inactive"],
        default: "Active",
      },
      user_owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User",
      },
      associated_teams:[
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref:"Team"
        }
      ]
    },
  {
      timestamps: {
        "createdAt":"user_added_on",
        "updatedAt":"user_last_modified"
      }
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ user_email:email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.user_password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('user_password')) {
    user.user_password = await bcrypt.hash(user.user_password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
