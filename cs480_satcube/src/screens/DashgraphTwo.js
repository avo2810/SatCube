import "../styles/graphstyle.css";
import img from "../Images/graph 3.PNG";

export default function DashgraphTwo() {
  return (
    <section className="graph-page">
      <div className="graph-wrapper">
        <h1>Fox 1D</h1>
        <div className="container">
          <div className="box">
            <img src={img} />
            <h3>Fox1D 2018</h3>
            <a
              href="http://localhost:8080/graphs/fox1d18.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1D 2019</h3>
            <a
              href="http://localhost:8080/graphs/fox1d19.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1D 2020</h3>
            <a
              href="http://localhost:8080/graphs/fox1d20.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1D 2021</h3>
            <a
              href="http://localhost:8080/graphs/fox1d21.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h3>Fox1D 2022</h3>
            <a
              href="http://localhost:8080/graphs/fox1d22.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
