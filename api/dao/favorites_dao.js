const Favorite = require('../../models/Favorite');

module.exports = {
    addFavorite: function(favorite, callback) {
        Favorite.create(favorite, function(err, favorite_instance) {
            if (err) {
                console.error('Error creating new favorite:', favorite);
                callback(err);
            } else {
                callback(null, favorite_instance);
            }
        });
    }
};