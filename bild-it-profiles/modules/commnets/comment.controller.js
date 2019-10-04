const router = require('express').Router();
const auth = require('../../middleware/auth');
const ROLES = require('../../constants/roles');
const CommentService = require('./comment.service');

router.get('/:exerciseId', auth(), (req, res, next) => {
    const opts = { query: { exercise: req.params.exerciseId }, populate: [{ path: 'user', select: 'firstName lastName fullName' }], lean: false };
    CommentService.findCommentsByExerciseId(opts)
        .then(comments => res.json(comments))
        .catch(err => res.json(err));
});

router.post('/', auth(), (req, res) => {
    const comment = CommentService.createComment(req.body);
    comment.then(comment => res.json(comment));
});

module.exports = router;

