import "../styles/graphstyle.css"
import img from "../Images/graph 3.PNG"

export default function DashgraphThree() {



    return <><div className="wrapper">
                    <h1>Fox RADSAT</h1>
    <div className="container">
        <div className="box">
            <img src={img}/>
            <h3>Fox RADSAT 2017</h3>
            <a href="http://localhost:8080/graphs/foxrad17.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox RADSAT 2018</h3>
            <a href="http://localhost:8080/graphs/foxrad18.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox RADSAT 2019</h3>
            <a href="http://localhost:8080/graphs/foxrad19.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox RADSAT 2020</h3>
            <a href="http://localhost:8080/graphs/foxrad20.html" className="btn">View Analysis</a>
        </div>
        <div className="box">
            <img src={img}/>
            <h3>Fox RADSAT 2021</h3>
            <a href="http://localhost:8080/graphs/foxrad21.html" className="btn">View Analysis</a>
        </div>
        
    </div>
</div>   </>
}