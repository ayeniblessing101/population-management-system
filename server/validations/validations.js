module.exports = {
    validateCreateLocationInput: (request) => {
        request.checkBody('name', 'Name is required').notEmpty();
        request.sanitize('name').escape();
        request.sanitize('name').trim();
    },

    validateUpdateLocationInput: (request) => {
        request.checkBody('name', 'Name is required').notEmpty();
        request.sanitize('name').escape();
        request.sanitize('name').trim();
    },
};