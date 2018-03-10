'use strict';

module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
		title: DataTypes.STRING,
		description: DataTypes.TEXT,
		category: DataTypes.STRING,
		inventory: DataTypes.INTEGER,
		price: DataTypes.FLOAT,
		image_url: DataTypes.TEXT,
		untappd_endpoint_url: DataTypes.TEXT,
		rating: DataTypes.STRING,
		createdAt:{type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
		updatedAt:{type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}
	});

	Product.associate = (models) => {
		models.Category.hasMany(Product, {foreignKey:'category', sourceKey:'title'});
		Product.belongsTo(models.Category, {foreignKey:'category', targetKey:'title'});
	};

	return Product
};


