const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize
        })
    }

    // associating users with favorites
    static associate(models) {
        this.hasMany(models.Favorite, { foreignKey: 'user_id', as: 'Favorites' });
    }
}

module.exports = User;