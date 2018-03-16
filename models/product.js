'use strict';

module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
		untappd_id: DataTypes.INTEGER,
		title: DataTypes.STRING,
		description: DataTypes.TEXT,
		category: DataTypes.STRING,
		brewery: DataTypes.STRING,
		abv: DataTypes.STRING,
		ibu: DataTypes.STRING,
		image_url: DataTypes.TEXT,
		rating: DataTypes.STRING,
		rating_count: DataTypes.INTEGER,
		inventory: DataTypes.INTEGER,
		price: DataTypes.FLOAT,
		createdAt:{type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')},
		updatedAt:{type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP')}
	});

	Product.associate = (models) => {
		models.Category.hasMany(Product, {foreignKey:'category', sourceKey:'title'});
		Product.belongsTo(models.Category, {foreignKey:'category', targetKey:'title'});
	};

	return Product
};


