import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function Home() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" }
  ]);
  
  const [transactions, setTransactions] = useState([
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 }
  ]);

  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    // Combine customers and their transactions
    if (customers.length > 0 && transactions.length > 0) {
      const combined = customers.flatMap(customer => {
        return transactions
          .filter(transaction => transaction.customer_id === parseInt(customer.id))
          .map(transaction => ({
            customerId: customer.id,
            customerName: customer.name,
            transactionId: transaction.id,
            transactionDate: transaction.date,
            transactionAmount: transaction.amount
          }));
      });
      setCombinedData(combined);
      setFilteredData(combined);  // Initialize filtered data
    }
  }, [customers, transactions]);

  useEffect(() => {
    const filtered = combinedData.filter(item => {
      const nameMatch = item.customerName.toLowerCase().includes(nameFilter.toLowerCase());
      const amountMatch = item.transactionAmount.toString().includes(amountFilter);
      return nameMatch && amountMatch;
    });
    setFilteredData(filtered);
  }, [nameFilter, amountFilter, combinedData]);


  useEffect(() => {
    if (selectedCustomer) {
      const customerTransactions = transactions.filter(
        transaction => transaction.customer_id === parseInt(selectedCustomer)
      );

      const totalsPerDay = customerTransactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += transaction.amount;
        return acc;
      }, {});

      const chartData = Object.keys(totalsPerDay).map(date => ({
        date,
        totalAmount: totalsPerDay[date]
      }));

      setChartData(chartData);
    } else {
      setChartData([]);
    }
  }, [selectedCustomer, transactions]);





  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="p-5">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by customer name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Filter by transaction amount"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            className="form-control mb-4"
          />

          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="form-control"
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <table className="table table-success table-hover rounded-4">
          <thead>
            <tr>
              <th scope="col">Customer ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Transaction ID</th>
              <th scope="col">Transaction Date</th>
              <th scope="col">Transaction Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.customerId}</td>
                <td>{item.customerName}</td>
                <td>{item.transactionId}</td>
                <td>{item.transactionDate}</td>
                <td>{item.transactionAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedCustomer && chartData.length > 0 && (
          <div className="mt-5">
            <h4>Transaction Amounts per Day for Selected Customer</h4>
            <LineChart
              width={600}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
            </LineChart>
          </div>
        )}
      </div>
    </>
  );
}
