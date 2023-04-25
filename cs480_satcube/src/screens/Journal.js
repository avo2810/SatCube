import { useEffect, useState } from "react"
import "../styles/journalstyle.css"
import "../script.js"
import { useNavigate } from "react-router-dom";



export default function Journal(){

    const [data, setData] = useState([]);
    const [formTitle, setFormTitle] = useState([]);
    const [formBody, setFormBody] = useState([]);
    const [targetId, setTargetId] = useState(false)
    const navigate = useNavigate();



    const fetchData = async ()=>{
        const response = await fetch("http://localhost:8080/api/post");
        console.log("??", response)
        const journalData = await response.json();
        setData(journalData);
        console.log(journalData);


    }

    //runs on load once
    useEffect(()=>{
        
       


        fetchData();

 

    },[])

    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");

        if(id!== undefined){
            setTargetId(id)
        }
        console.log("get id",id)

    })

    const formHandler = async (e) => {
        e.preventDefault();

        console.log(e.target.title.value, e.target.body.value);
        const res = await fetch("http://localhost:8080/api/post", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: e.target.title.value,
                body: e.target.body.value
            }), 
        });

        console.log("result:", res)
        fetchData();

    }


    return <div className="wrapper">
        <header className="text-center">
       <h2>
          Journal
       </h2>
      
    </header>
    


        {
            targetId ? <>

         <div >
           { data.map(d=>{

                if(targetId == d._id){
                    return <div class="card" key={d._id} onClick={()=>navigate("/journal?id=" + d._id)}>
                        <h4>{d.title} </h4>
                
                        <p>{d.body}</p>
                        <a href={`mailto:?subject=${d.title}&body=${d.body}`}>Email me</a>
        
                        </div>

                }
               
            })
        }
         
        </div>
        
            
            </>: <>
            <div >
            <form class="journalForm" onSubmit={formHandler}>
            <fieldset>
                <label>Satellite Name</label>
                <input type="text" name="title"/>
            </fieldset>
      
            <fieldset>
                <label>Entry</label>
                <textarea name="body"/>
            
            </fieldset>
            <fieldset>
                <label></label>   
            <input className="button" type="submit" value="Create Journal" ></input>
            </fieldset>
        </form>
    </div>
    <br/><br/>
    
    <div className="wrapper">
        {
            data.map(d=>{
                return <div class="card" key={d._id} onClick={()=>navigate("/journal?id=" + d._id)}>
                    <h4>{d.title} </h4>
                
                <p>{d.body}</p>
                </div>
            })
        }
        
    </div>
            </>
        }
       
</div>
}

