import Head from "next/head";
import { Inter } from "next/font/google";
import { Button } from "@nextui-org/react";
import {
  Container,
  Row,
  Col,
  Text,
  Input,
  Spacer,
  Table,
  Modal,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { EditIcon } from "../components/EditIcon";
import { DeleteIcon } from "../components/DeleteIcon";
import { IconButton } from "@/components/IconButton";

const inter = Inter({ subsets: ["latin"] });

// Define an interface for the row data
interface Transaction {
  // Use number type for transaction_id
  transaction_id: number | null;
  // Use string type for username and product
  username: string;
  product: string;
  // Use number type for quantity
  quantity: number;
  // Use Date type for transact_date
  transact_date: Date;
}

export default function Home() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [transactionDate, setTransactionDate] = useState("");
  const [result, setResult] = useState<Transaction[]>([]);
  const [selectedRow, setSelectedRow] = useState<Transaction>(
    {} as Transaction
  );
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  const fetchData = async () => {
    const res = await fetch("/api/transaction");
    const data = await res.json();
    setResult(data);
  };

  //when page loads, fetch data from api '/api/transaction'
  useEffect(() => {
    fetchData();
  }, []);

  const handleUserIdChange = (e: any) => {
    setUserId(e.target.value);
  };

  const handleProductIdChange = (e: any) => {
    setProductId(e.target.value);
  };

  const handleQuantityChange = (e: any) => {
    setQuantity(e.target.value);
  };

  const handleTransactionDateChange = (e: any) => {
    setTransactionDate(e.target.value);
  };

  const handleTransactionUpdateChange = (e: any) => {
    selectedRow.quantity = e.target.value;
    setSelectedRow(selectedRow);
  };

  const handleCreateButtonPressed = async () => {
    let transaction: Transaction = {
      transaction_id: null,
      username: userId,
      product: productId,
      quantity: quantity,
      transact_date: new Date(transactionDate),
    };
    console.log(transaction);
    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // POST request using fetch with async/await, pointing to the api route /api/transaction. then fetchdata to update the state
  };

  const handleTransactionUpdateButtonPressed = async () => {
    console.log(selectedRow);
    setVisible(false);
    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  };

  const handleDeleteButtonPressed = async (transaction: Transaction) => {
    console.log(transaction.transaction_id + ' is deleted');
    // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  }

  return (
    <>
      <Head>
        <title>Copilot Demo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container
          gap={1}
          justify="center"
          alignContent="center"
          alignItems="center"
          css={{ my: "15%" }}
        >
          <Row justify="center" align="center">
            <Text
              h1
              size={60}
              css={{
                textGradient: "45deg, $purple600 -20%, $pink600 100%",
              }}
              weight="bold"
            >
              GitHub Copilot Demo
            </Text>
          </Row>
          <Row gap={2} justify="center" align="center">
            <Col span={4}>
              <Input
                clearable
                label="Name"
                placeholder="Name"
                onChange={handleUserIdChange}
                fullWidth={true}
              />
            </Col>
            <Col span={4}>
              <Input
                clearable
                label="Product"
                placeholder="Product Name"
                onChange={handleProductIdChange}
                fullWidth={true}
              />
            </Col>
            <Col span={4}>
              <Input
                type="number"
                clearable
                label="Quantity"
                placeholder="Quantity"
                onChange={handleQuantityChange}
                fullWidth={true}
              />
            </Col>
            <Col span={4}>
              <Input
                type="date"
                label="Transaction Date"
                onChange={handleTransactionDateChange}
                fullWidth={true}
              />
            </Col>
          </Row>
          <Spacer y={2} />
          <Row justify="center" align="center">
            <Col span={12}>
              <Button color={"primary"} shadow auto onPress={handleCreateButtonPressed}>
                Create
              </Button>
            </Col>
          </Row>
          <Spacer y={2} />
          <Row justify="center" align="center">
            <Text
              h4
              size={48}
              css={{
                textGradient: "45deg, $blue900 -20%, $accents8 100%",
              }}
              weight="bold"
            >
              Transaction History
            </Text>
          </Row>
          <Spacer y={2} />
          <Row justify="center" align="center">
            <Col span={12}>
              <Table
                aria-label="Example table with static content"
                lined
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
              >
                <Table.Header>
                  <Table.Column align="center">User</Table.Column>
                  <Table.Column align="center">Product</Table.Column>
                  <Table.Column align="center">Quantity</Table.Column>
                  <Table.Column align="center">Transaction Date</Table.Column>
                  <Table.Column align="center">Action</Table.Column>
                </Table.Header>
                <Table.Body>
                  {result.map((item) => (
                    <Table.Row key={item.transaction_id}>
                      <Table.Cell css={{ textAlign: "center" }}>
                        {item.username}
                      </Table.Cell>
                      <Table.Cell css={{ textAlign: "center" }}>
                        {item.product}
                      </Table.Cell>
                      <Table.Cell css={{ textAlign: "center" }}>
                        {item.quantity}
                      </Table.Cell>
                      <Table.Cell css={{ textAlign: "center" }}>
                        {new Date(item.transact_date).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <IconButton
                              onClick={() => {
                                setVisible(true);
                                setSelectedRow(item);
                              }}
                            >
                              <EditIcon size={20} fill="#979797" />
                            </IconButton>
                          </Col>
                          <Col css={{ d: "flex" }}>
                            <IconButton
                              onClick={() => handleDeleteButtonPressed(item)}
                            >
                              <DeleteIcon size={20} fill="#FF0080" />
                            </IconButton>
                          </Col>
                        </Row>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

              <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
              >
                <Modal.Header>
                  <Text id="modal-title" size={24}>
                    <b>Details</b>
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    fullWidth
                    readOnly
                    label="Name"
                    value={selectedRow.username}
                  />
                  <Input
                    fullWidth
                    label="Product"
                    value={selectedRow.product}
                  />
                  <Input
                    fullWidth
                    type="number"
                    clearable
                    label="Quantity"
                    onChange={handleTransactionUpdateChange}
                  />
                  <Button onPress={handleTransactionUpdateButtonPressed}>
                    Update
                  </Button>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}