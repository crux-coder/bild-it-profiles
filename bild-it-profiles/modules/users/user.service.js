const User = require('./user.model');


function fetchUsers({ query = {}, populate = [], lean = true } = {}) {
    const promise = User.find(query);
    const populatedPromise = promise.populate(populate);
    return lean ? populatedPromise.lean() : populatedPromise;
};

function fetchUserById({ id = {}, populate = [], lean = true } = {}) {
    const promise = User.findById(id);
    const populatedPromise = promise.populate(populate);
    return lean ? populatedPromise.lean() : populatedPromise;
}

function createUser(payload = {}) {
    const newUser = new User({ ...payload });
    return newUser.save();
}


module.exports = {
    fetchUsers,
    fetchUserById,
    createUser
}