import React, { useState, useEffect } from 'react';
import { parse } from 'papaparse';
import "../styles/telemstyle.css"

export default function Telemetry() {
  // Define the data state and setData function using the useState hook
  const [data, setData] = useState([]);

  // Fetch the CSV data when the component mounts using the useEffect hook
  useEffect(() => {
    fetch('http://localhost:8080/csv/FOX1E_rttelemetry.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Parse the CSV data using the papaparse library
        console.log("csvText:",csvText)
        const parsedData = parse(csvText, { header: true }).data;
        // Set the data state to the parsed CSV data
        console.log("parasingData:", parsedData)
        setData(parsedData);
      });
  }, []);

  // Render the component
  return (
    
    <div className="style">
  {/* Render a title */}
  <h1 className='title'>FOX 1E Telemetry Data:</h1>
  {/* If data has been loaded, render a scrollable table */}
  {data.length > 0 &&
    <div className='s'>
      <table className='table' style={{margin: "0 auto", maxWidth: "950px"}}>
        {/* Render the table header */}
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th className='head'key={index}>{key}</th>
          ))}
        </tr>
        {/* Render each row of the table */}
        {data.map((row, index) => (
          <tr className='g' key={index}>
            {Object.values(row).map((value, index) => (
              <td className='line' key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  }
</div>
  )
}
