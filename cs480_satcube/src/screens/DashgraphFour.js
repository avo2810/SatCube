import "../styles/graphstyle.css";
import img from "../Images/graph 3.PNG";

export default function DashgraphFour() {
  return (
    <section className="graph-page">
      <div className="graph-wrapper">
        <h1>Fox RADSAT</h1>
        <div className="container">
          <div className="box">
            <img src={img} />
            <h4>Fox RADSAT 2017</h4>
            <a
              href="http://localhost:8080/graphs/foxrad17.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h4>Fox RADSAT 2018</h4>
            <a
              href="http://localhost:8080/graphs/foxrad18.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h4>Fox RADSAT 2019</h4>
            <a
              href="http://localhost:8080/graphs/foxrad19.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h4>Fox RADSAT 2020</h4>
            <a
              href="http://localhost:8080/graphs/foxrad20.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
          <div className="box">
            <img src={img} />
            <h4>Fox RADSAT 2021</h4>
            <a
              href="http://localhost:8080/graphs/foxrad21.html"
              className="graph-btn"
            >
              View Analysis
            </a>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
