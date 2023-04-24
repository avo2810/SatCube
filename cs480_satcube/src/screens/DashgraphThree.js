import "../styles/graphstyle.css"
import img from "../Images/graph 3.PNG"

export default function DashgraphThree() {



    return <><div className="wrapper">
                    <h1>Fox 1E</h1>
    <div className="container">
        <div className="box">
            <img src={img}/>
            <h3>Fox1E 2021</h3>
            <a href="http://localhost:8080/graphs/fox1e21.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox1E 2022</h3>
            <a href="http://localhost:8080/graphs/fox1e22.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox1E 2023</h3>
            <a href="http://localhost:8080/graphs/fox1e23.html" className="btn">View Analysis</a>
        </div>
        
    </div>
</div>   </>
}