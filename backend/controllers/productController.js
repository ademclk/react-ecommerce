
exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'All products fetched from the database successfully.',
    })
}