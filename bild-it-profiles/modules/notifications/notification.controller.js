const router = require('express').Router();
const auth = require('../../middleware/auth');
const NotificationService = require('./notification.service');

router.get('/:userId', auth(), (req, res) => {
    const opts = { recieverId: req.params.userId, limit: 1, skip: 0 };
    const notifications = NotificationService.fetchNotifications(opts);
    notifications.then(notifications => {
        res.json(notifications);
    });
});

router.post('/', auth(), (req, res) => {
    const notification = NotificationService.createNotification(req.body);
    notification.then(notification => res.json(notification));
});

router.post('/update', auth(), (req, res) => {
    const notifications = NotificationService.updateNotifications(req.body);
    console.log(notifications)
    // res.json(notifications);
});

module.exports = router;