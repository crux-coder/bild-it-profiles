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

function updateUser(payload = {}) {
    return User.findById(payload._id)
        .then(user => {
            const { firstName, lastName, email, password, dob, approved, roles, socketId } = payload;
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.password = password;
            user.dob = dob;
            user.approved = approved;
            user.roles = roles;
            user.socketId = socketId;
            return user;
        }).then(user =>
            user.save()
                .then(() => {
                    return user;
                })
                .catch(err => console.log(err)))
};

function createUser(payload = {}) {
    const newUser = new User({ ...payload });
    return newUser.save();
}


module.exports = {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser
}