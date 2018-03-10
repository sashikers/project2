'use strict';

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Category', {
		title: {type: DataTypes.STRING, allowNull: false, unique: true},
		createdAt:{type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
		updatedAt:{type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}
	});
};
