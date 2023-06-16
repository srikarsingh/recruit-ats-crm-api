const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const actionsSchema = mongoose.Schema(
    {
        entity_type: {
            type: String,
            required: true
        },
        action_linked_id: {
            type: String,
            required: true
        },
        action_type: {
            type: String,
            required: true
        },
        action_obj: {
            type: String,
            required: true
        },
        action_done_by: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:"User"
        },
        action_done_on: {
            type: Date.now(),
        }
    }
);

// add plugin that converts mongoose to json
actionsSchema.plugin(toJSON);
actionsSchema.plugin(paginate);

/**
 * @typedef Action
 */
const Action = mongoose.model("Actions", actionsSchema);

module.exports = Action;
