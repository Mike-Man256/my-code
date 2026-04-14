const pool = require('../src/config/db.js');

// Get all the account with the owner name 
const getAllAccounts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
            a.account_id,
            a.account_number,
            a.balance,
            u.full_name AS owner
            FROM account a 
            JOIN users u ON a.user_id = u.id
            `);

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


// get account for a specific user
const getUserAccount = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await pool.query(`
            SELECT 
            a.account_id,
            a.account_number,
            a.account_type,
            a.balance
            FROM account a
            WHERE a.user_id = $1
            `,  [userId]);

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


module.exports = { getAllAccounts, getUserAccount };