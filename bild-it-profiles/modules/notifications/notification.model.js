const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    recieverId: { type: String, required: true, },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;