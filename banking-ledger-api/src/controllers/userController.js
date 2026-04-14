const pool = require('../src/config/db.js');

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getAllUsers };
