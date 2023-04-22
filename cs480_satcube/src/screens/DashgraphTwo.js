import "../styles/graphstyle.css"
import img from "../Images/graph 3.PNG"

export default function DashgraphTwo() {



    return <><div className="wrapper">
                    <h1>Fox 1D</h1>
    <div className="container">
        <div className="box">
            <img src={img}/>
            <h3>Fox1D 2018</h3>
            <a href="http://localhost:8080/graphs/fox1d18.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox1D 2019</h3>
            <a href="http://localhost:8080/graphs/fox1d19.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox1D 2020</h3>
            <a href="http://localhost:8080/graphs/fox1d20.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox1D 2021</h3>
            <a href="http://localhost:8080/graphs/fox1d21.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox1D 2022</h3>
            <a href="http://localhost:8080/graphs/fox1d22.html" className="btn">View Analysis</a>
        </div>
    
    </div>
</div>   </>
}