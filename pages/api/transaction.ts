import type { NextApiRequest, NextApiResponse } from "next";
import * as sql from "mssql";

// Define the connection string to Azure SQL
const connectionString: any = process.env.AZURE_SQL_CONNECTION_STRING;

const pool: sql.ConnectionPool = new sql.ConnectionPool(connectionString);
const poolConnect: Promise<sql.ConnectionPool> = pool.connect();

// Define the API route
export default async function handler(req: any, res: any) {
  // Wait for a connection
  await poolConnect;
  // Check req method
  if (req.method === "GET") {
    //check is request has a query called transaction_id
    if (req.query.transaction_id) {
      // If it does, get the transaction with trasaction_id
      try {
        // Execute the stored procedure
        const result: sql.IProcedureResult<any> = await pool
          .request()
          .input("transaction_id", sql.Int, req.query.transaction_id)
          .execute("[dbo].[GetTransactionById]");
        // Send back the result as JSON
        res.status(200).json(result.recordset);
      }
      // Handle errors
      catch (err: any) {
        res.status(500).send(err.message);
      }
    } else {
      // If it doesn't, get all transactions
      try {
        // Execute the stored procedure
        const result: sql.IProcedureResult<any> = await pool
          .request()
          .execute("[dbo].[GetAllTransactions]");
        // Send back the result as JSON
        res.status(200).json(result.recordset);
      } catch (err: any) {
        // Handle errors
        res.status(500).send(err.message);
      }
    }
  }
  //If the request is post, then execute sql prodcedure to insert a new transaction, with the data from the request body
  //The request body has the properties of username, product, quantity and transact_date
}
