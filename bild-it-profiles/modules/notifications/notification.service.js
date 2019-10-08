const Notification = require('./notification.model');

function fetchNotifications({ query = {}, populate = [], limit = 0, skip = 0, lean = true } = {}) {
    const promise = Notification.find({ ...query }).limit(limit).skip(skip);
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