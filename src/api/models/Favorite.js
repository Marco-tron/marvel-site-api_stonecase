const { Model, DataTypes } = require('sequelize');

class Favorite extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            thumb: DataTypes.STRING,
            marvelid: DataTypes.INTEGER,
            category: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    
    //associating Favorites with users
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'Users' });
    }
}

module.exports = Favorite;