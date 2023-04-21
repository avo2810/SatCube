import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.userType == "Super Admin") {
          setAdmin(true);
        }
        setUserData(data.data);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3 mb-lg-5">
          <div className="position-relative card table-nowrap table-card">
            <div className="card-header align-items-center">
              <h3 className="mb-0">AMSAT Fox Satellite Telemetry</h3>
            </div>
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="small text-uppercase bg-body text-muted">
                  <tr>
                    <th>Name</th>
                    <th>Website</th>
                    <th>Other Names</th>
                    <th>Linux Command Line Download</th>
                    <th>Command Line Extract</th>
                    <th>Links to Data Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="align-middle">
                    <td>FOX1C</td>
                    <td>
                      <a
                        href="https://www.amsat.org/tlm/fox1c/"
                        target={"_blank"}
                      >
                        https://www.amsat.org/tlm/fox1c/
                      </a>
                    </td>
                    <td>AO-95</td>
                    <td>wget https://www.amsat.org/tlm/fox1c/FOXDB.tar.gz</td>
                    <td>tar -zxvf FOXDB.tar.gz</td>
                    <td>
                      <a
                        href="http://localhost:8888/voila/render/fox1c%202018.ipynb"
                        target="_blank"
                      >
                        FOX1C
                      </a>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>FOX1D</td>
                    <td>
                      <a
                        href="https://www.amsat.org/tlm/fox1d/"
                        target={"_blank"}
                      >
                        https://www.amsat.org/tlm/fox1d/
                      </a>
                    </td>
                    <td>AO-92</td>
                    <td>wget https://www.amsat.org/tlm/fox1d/FOXDB.tar.gz</td>
                    <td>tar -zxvf FOXDB.tar.gz</td>
                    <td>
                      <a
                        href="http://localhost:8889/voila/render/Fox1d.ipynb"
                        target="_blank"
                      >
                        FOX1D
                      </a>
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td>FOX1E</td>
                    <td>
                      <a
                        href="https://www.amsat.org/tlm/fox1e/"
                        target={"_blank"}
                      >
                        https://www.amsat.org/tlm/fox1e/
                      </a>
                    </td>
                    <td>AO-109</td>
                    <td>wget https://www.amsat.org/tlm/fox1e/FOXDB.tar.gz</td>
                    <td>tar -zxvf FOXDB.tar.gz</td>
                    <td>
                      <a
                        href="http://localhost:8890/voila/render/Fox%201e.ipynb"
                        target="_blank"
                      >
                        FOX1E
                      </a>
                    </td>
                  </tr>
                  <tr className="align-middle last-row">
                    <td>RADFXSAT</td>
                    <td>
                      <a
                        href="https://www.amsat.org/tlm/radfxsat/"
                        target={"_blank"}
                      >
                        https://www.amsat.org/tlm/radfxsat/
                      </a>
                    </td>
                    <td>AO-91 and Fox-1B</td>
                    <td>
                      wget https://www.amsat.org/tlm/radfxsat/FOXDB.tar.gz
                    </td>
                    <td>tar -zxvf FOXDB.tar.gz </td>
                    <td>
                      <a href="#" target={"_blank"}>
                        Link
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
