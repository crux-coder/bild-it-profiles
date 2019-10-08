const Notification = require('./notification.model');

function fetchNotifications({ query = {}, populate = [], lean = true } = {}) {
    const promise = Notification.find({ ...query });
    const populatedPromise = promise.populate(populate);
    return lean ? populatedPromise.lean() : populatedPromise;
};

function createNotification(payload = {}) {
    const exercise = Notification.create({ ...payload });
    return exercise;
};


module.exports = {
    fetchNotifications,
    createNotification,
};