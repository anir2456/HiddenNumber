import { useState, useEffect} from "react";
import { Button} from "react-bootstrap";
import Board from "./Board";


const Display = () => {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true" || false);
    const [entryJson, setEntryJson] = useState({name: "", pswd: ""})



    useEffect(() => {

        window.onstorage = () => {
            setLoggedIn(localStorage.getItem("loggedIn") === "true")
        }
    }, [localStorage.getItem("loggedIn")])

    const handleClick = (event) => {
        setEntryJson(prevEntryJson => {
            return {...prevEntryJson, [event.target.name]: event.target.value }
        })

    }

        if(!loggedIn){
            return (
                <>
                        <div className="jumbotron">Please log in to view dashboard</div>
                    <br/>
                    <form action="#">
                       <div>
                           Username   <input style={{marginLeft: '1em'}} name="name" type="text"  onChange={handleClick}/>
                       </div>
                        <br/>
                        <div>
                             Password <input style={{marginLeft: '1em'}} name="pswd" type="password"  onChange={handleClick}/>
                        </div>
                        <br/>
                        <div>
                            <Button type="submit" onClick={(e) => {
                                e.preventDefault();
                                if(entryJson.name.length >=4 && entryJson.pswd === "1234") {
                                    setLoggedIn(true);
                                    localStorage.setItem("loggedIn", "true")
                                }
                            }} variant="primary">Login</Button>
                        </div>
                    </form>
                </>
            )
        } else {
                return (
                    <>
                        <div className="jumbotron">{`Hey welcome back ${entryJson.name} !!`}</div>
                        <br/>
                        <Button onClick={() => {
                            setLoggedIn(false);
                            localStorage.setItem("loggedIn", "false")
                            setEntryJson({name: "", password: ""})
                        }} variant="primary">Logout</Button>
                        <br/>
                        <Board name={entryJson.name}/>
                    </>
                )

        }

}

export default Display;