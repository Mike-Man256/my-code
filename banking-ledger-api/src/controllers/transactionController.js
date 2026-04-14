const pool = require("../src/config/db.js");

const transferFunds = async (req, res) => {
  const { from_account_id, to_account_id, amount, reference } = req.body;

  // Basic validation
  if (!from_account_id || !to_account_id || !amount || !reference) {
    return res.status(400).json({
      success: false,
      message:
        "from_account_id, to_account_id, amount and reference are required ",
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount should be greater than zero",
    });
  }

  try {
    // start ACID transaction
    await pool.query("BEGIN");

    // check sender has enough balance
    const senderResult = await pool.query(
      "SELECT balance FROM account WHERE account_id = $1",
      [from_account_id],
    );

    console.log("Sender result:", senderResult.rows);

    if (senderResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(400).json({
        success: false,
        message: "Sender's Account not found",
      });
    }

    const senderBalance = parseFloat(senderResult.rows[0].balance);
    console.log("Sender Balance:", senderBalance);
    console.log("Amount:", amount);

    if (senderBalance < amount) {
      await pool.query("ROLLBACK");
      return res.status(400).json({
        success: false,
        message: "Insufficient Funds",
      });
    };

    // prevents sending funds to the sender's account 
    if (from_account_id === to_account_id) {
        return res.status(400).json({
            message: "You cannot send money to yourself"
        })
    };


    // Debit sender
    console.log("Debiting sender.....");
    await pool.query(
      "UPDATE account SET balance = balance - $1 WHERE account_id = $2",
      [amount, from_account_id],
    );

    // credit reciever
    console.log("Crediting reciever....");
    await pool.query(
      "UPDATE account SET balance = balance + $1 WHERE account_id = $2",
      [amount, to_account_id],
    );

    // record transaction
    console.log("Inserting trasaction into records");
    const transaction = await pool.query(
      `INSERT INTO transaction 
            (reference, from_account_id, to_account_id, amount, type, status)
            VALUES ($1, $2, $3, $4, 'transfer', 'completed')
            RETURNING *`,
      [reference, from_account_id, to_account_id, amount],
    );

    console.log("Transaction results:", transaction.rows);

    // All step succeceded - commit
    await pool.query("COMMIT");

    console.log("Commit successful, sending response...");
    console.log("transaction.rows[0]:", transaction.rows[0]);

    res.status(200).json({
      success: true,
      message: "Transfer successfull",
      data: transaction.rows[0],
    });
  } catch (error) {
    // something failed - undo everthing
    await pool.query("ROLLBACK");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransaction = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT 
            t.id,
            t.reference,
            t.amount,
            t.type,
            t.status,
            t.created_at,
            u1.full_name AS sender,
            u2.full_name AS reciever
            FROM transaction t 
            JOIN account a1 ON t.from_account_id = a1.account_id
            JOIN account a2 ON t.to_account_id = a2.account_id
            JOIN users u1 ON a1.user_id = u1.id
            JOIN users u2 ON a2.user_id = u2.id
            ORDER BY t.created_at DESC
           `);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { transferFunds, getTransaction };
