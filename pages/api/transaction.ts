import type { NextApiRequest, NextApiResponse } from "next";
import * as sql from "mssql";
import { DefaultAzureCredential } from '@azure/identity'
import { SecretClient } from '@azure/keyvault-secrets'

const keyVaultName = process.env.KEYVAULT_NAME;
const keyVaultUri = `https://${keyVaultName}.vault.azure.net`
const secretName: any = process.env.SECRET_NAME;
const credential = new DefaultAzureCredential()
const client = new SecretClient(keyVaultUri, credential)


// Define the API route
export default async function handler(req: any, res: any) {
  // Get the secret
  const secret = await client.getSecret(secretName);

  // Define the connection string to Azure SQL
  const connectionString: any = secret.value;

  const pool: sql.ConnectionPool = new sql.ConnectionPool(connectionString);
  const poolConnect: Promise<sql.ConnectionPool> = pool.connect();

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
  // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  //If the request is post, then execute sql prodcedure to insert a new transaction, with the data from the request body
  //The request body has the properties of username, product, quantity and transact_date
  else if (req.method === "POST") {
    try {
      // Execute the stored procedure
      const result: sql.IProcedureResult<any> = await pool
        .request()
        .input("username", sql.NVarChar(50), req.body.username)
        .input("product", sql.NVarChar(50), req.body.product)
        .input("quantity", sql.Int, req.body.quantity)
        .input("transact_date", sql.DateTime, req.body.transact_date)
        .execute("[dbo].[InsertTransaction]");
      // Send back the result as JSON
      res.status(200).json(result.recordset);
    } catch (err: any) {
      // Handle errors
      res.status(500).send(err.message);
    }
  }
  // If the request is put, then execute sql prodcedure to update a transaction, with the data from the request body
  // The request body has the properties of transaction_id, username, product, quantity and transact_date
  else if (req.method === "PUT") {
    try {
      // Execute the stored procedure
      const result: sql.IProcedureResult<any> = await pool
        .request()
        .input("transaction_id", sql.Int, req.body.transaction_id)
        .input("username", sql.NVarChar(50), req.body.username)
        .input("product", sql.NVarChar(50), req.body.product)
        .input("quantity", sql.Int, req.body.quantity)
        .input("transact_date", sql.DateTime, req.body.transact_date)
        .execute("[dbo].[UpdateTransaction]");
      // Send back the result as JSON
      res.status(200).json(result.recordset);
    } catch (err: any) {
      // Handle errors
      res.status(500).send(err.message);
    }
  }
  // If the request is delete, then execute sql prodcedure to delete a transaction, with the data from the request query called transaction_id
  else if (req.method === "DELETE") {
    try {
      // Execute the stored procedure
      const result: sql.IProcedureResult<any> = await pool
        .request()
        .input("transaction_id", sql.Int, req.query.transaction_id)
        .execute("[dbo].[DeleteTransaction]");
      // Send back the result as JSON
      res.status(200).json(result.recordset);
    } catch (err: any) {
      // Handle errors
      res.status(500).send(err.message);
    }
  }

}
