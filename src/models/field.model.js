const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const fieldsSchema = mongoose.Schema(
    {
        entity_type: {
            type: String,
            required: true
        },
        field_type: {
            type: String,
            required: true
        },
        field_name: {
            type: String,
            required: true
        },
        field_label: {
            type: String,
            required: true
        },
        section: {
            type: String,
            required: true
        },
        section_description: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false
        },
        required: {
            type: Boolean,
            required: true
        },
        disabled: {
            type: Boolean,
            required: true
        },
        is_array: {
            type: Boolean,
            required: false
        },
        readonly: {
            type: Boolean,
            required: true
        },
        visible_on_table: {
            type: Boolean,
            required: true
        },
        visible_on_form: {
            type: Boolean,
            required: true
        },
        order: {
            type: Number,
            required: true,
        },
        column_width: {
            type: Number,
            required: true,
        },
        system_column: {
            type: Boolean,
            required: true,
        },
        sortable: {
            type: Boolean,
            required: true,
        },
        filter_type: {
            type: String,
            required: true,
        },
        filter_type_locked: {
            type: Boolean,
            required: true,
        },
        ref: {
            type: String,
            required: false,
            default:null
        },
        validation_rules: [
            {
                error_type:{
                    type:String
                },
                error_msg:{
                    type:String
                }
            }
        ]
    },
    {
        timestamps: {
            "createdAt":"field_added_on",
            "updatedAt":"field_last_modified"
        }
    }
);

// add plugin that converts mongoose to json
fieldsSchema.plugin(toJSON);
fieldsSchema.plugin(paginate);

/**
 * @typedef Field
 */
const Field = mongoose.model("Field", fieldsSchema);

module.exports = Field;
