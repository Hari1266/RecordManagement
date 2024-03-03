import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/records?page=${page}&search=${search}&sortBy=${sortBy}`
        );
        setRecords(response.data);

        const totalCountResponse = await axios.get(
          `http://localhost:5000/records/count?search=${search}`
        );
        const totalCount = totalCountResponse.data.count;

        const calculatedTotalPages = Math.ceil(totalCount / 20);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error("Error fetching records", error);
      }
    };
    fetchRecords();
  }, [page, search, sortBy]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  let paginationButtons = [];
  console.log(totalPages);
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={page === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    
    <div >
      <div  >
      <h1>Record Management</h1>
      </div>
      <div className="header">
        <div className="search">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="sort-by">
          <select
            className="sort-by-select"
            value={sortBy}
            onChange={handleSortBy}
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr >
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.sno}>
              <td>{record.sno}</td>
              <td>{record.customer_name}</td>
              <td>{record.age}</td>
              <td>{record.phone}</td>
              <td>{record.location}</td>
              <td>{record.created_at}</td>
              <td>{record.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">{paginationButtons}</div>
    </div>
  );
};

export default App;
