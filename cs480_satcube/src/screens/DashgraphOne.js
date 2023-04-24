import "../styles/graphstyle.css";
import img from "../Images/graph 3.PNG";

export default function DashgraphOne() {
  return (
    <section className="graph-page">
      <div className="graph-wrapper">
        <h1>Fox 1C</h1>
        <div className="container">
          <div className="box">
            <img src={img} />
            <h3>Fox1C 2018</h3>
            <a
              href="http://localhost:8080/graphs/fox1c18.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1C 2019</h3>
            <a
              href="http://localhost:8080/graphs/fox1c19.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1C 2020</h3>
            <a
              href="http://localhost:8080/graphs/fox1c20.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1C 2021</h3>
            <a
              href="http://localhost:8080/graphs/fox1c21.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1C 2022</h3>
            <a
              href="http://localhost:8080/graphs/fox1c22.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>

          <div className="box">
            <img src={img} />
            <h3>SatNOGS</h3>
            <a
              href="https://replit.com/@AnthonyCucinell/CUBESAT-Directory?v=1"
              className="graph-btn"
            >
              SatNOGS Satellites
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1E</h3>
            <a
              href="https://fox1e--anthonycucinell.repl.co/"
              className="graph-btn"
            >
              Fox1E APU CubeSat Team
            </a>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
