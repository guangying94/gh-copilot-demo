-- Create table for transaction
CREATE TABLE [dbo].[transaction] (  
    [transaction_id] INT IDENTITY(1,1) PRIMARY KEY,  
    [username] NVARCHAR(100) NOT NULL,  
    [product] NVARCHAR(100) NOT NULL,  
    [quantity] INT NOT NULL,  
    [transact_date] DATETIME NOT NULL  
);



-- Insert dummy data
INSERT INTO transaction (username, product, quantity, transact_date)
VALUES ('John Doe', 'Apple', 5, '2023-05-08 07:30:00'),
       ('Jane Smith', 'Banana', 2, '2023-05-08 08:15:00'),
       ('Bob Johnson', 'Orange', 1, '2023-05-08 09:00:00'),
       ('Samantha Lee', 'Grapes', 3, '2023-05-08 10:30:00'),
       ('David Kim', 'Pineapple', 4, '2023-05-08 11:45:00');



-- Create a stored procedure to get all transactions
CREATE PROCEDURE dbo.GetAllTransactions
AS
BEGIN
  SELECT transaction_id, username, product, quantity, transact_date FROM transactions;
END;


-- Create a stored procedure to get transaction by id
CREATE PROCEDURE dbo.GetTransactionById
  @transaction_id int
AS
BEGIN
  SELECT transaction_id, username, product, quantity, transact_date FROM transactions WHERE transaction_id = @transaction_id;
END;

-- Create a stored procedure to insert a new row
CREATE PROCEDURE dbo.InsertTransaction
  @username nvarchar(50),
  @product nvarchar(50),
  @quantity int,
  @transact_date datetime
AS
BEGIN
  INSERT INTO transactions (username, product, quantity, transact_date)
  VALUES (@username, @product, @quantity, @transact_date);
END;


-- Create a stored procedure to update an existing row
CREATE PROCEDURE dbo.UpdateTransaction
  @transaction_id int,
  @username nvarchar(50),
  @product nvarchar(50),
  @quantity int,
  @transact_date datetime
AS
BEGIN
  UPDATE transactions 
  SET username = @username,
      product = @product,
      quantity = @quantity,
      transact_date = @transact_date
  WHERE transaction_id = @transaction_id;
END;

-- Create a stored procedure to delete a row by transaction_id
CREATE PROCEDURE dbo.DeleteTransaction
  @transaction_id int
AS
BEGIN
  DELETE FROM transactions WHERE transaction_id = @transaction_id;
END;