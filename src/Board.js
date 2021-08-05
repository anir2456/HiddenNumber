import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap';
import './Board.css';
import {useSelector, useDispatch} from "react-redux";

const Board = ({name}) => {

    let indexes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    let magicNumber = -1;

    const [count, setCount] = useState(0);
    const [win, setWin] = useState(false);
    const [clickedIndexes, setClickedIndexes] = useState([])

    const theCount = useSelector(state => state.theCount || 0);

    const dispatch = useDispatch();

    // let theCount = -1;

    useEffect(() => {
        magicNumber = Math.floor(Math.random() * 15 + 1);
        localStorage.setItem("magNum", magicNumber.toString())
        // theCount = UpdateCount(count).theCount;
    },[])

    useEffect(() => {
        if(count === 5 || win) {
            setTimeout(() => {
                magicNumber = Math.floor(Math.random() * 15 + 1);
                localStorage.setItem("magNum", magicNumber.toString())
                setCount(0)
                dispatch({type: 'RESET'})
                setClickedIndexes([])
                // theCount = UpdateCount(count).theCount;
            }, 2000)

        }
    },[count])

    const handleClick = (index) => {

        setCount(count => count+1)
        dispatch({type: 'INCREMENT'})
        setClickedIndexes(prevIndexes => {
            prevIndexes.push(index);
            return prevIndexes;
        })
        const magNum = Number.parseInt(localStorage.getItem("magNum"))

        if(index === magNum) {
            setWin(true)

            setTimeout(() => {
                setCount(0);
                dispatch({type: 'RESET'})
                // event.target.value = index;
                console.log("you win");
                setWin(false)
                setClickedIndexes([])
            },2000)

        }
    }

        return (
            <>
                <br/>
                {count === 0 && <div className="gameStarter">Starting game.... you get 5 attempts!</div>}
                {count > 0 && count < 5 && !win && <div className="gameStarter">Game is being played now!!</div>}
                {win && <div>{`You guessed it right, now go and have fun ${name}!!`}</div>}
                {((count >= 0 && count < 5) || (win))  &&
                    <div className="wrapper">
                        {indexes.map(index => {
                            return (
                                <div onClick={() => handleClick(index)} className={clickedIndexes.includes(index) ? "inner01Clicked" : "inner01"}
                                    style={{pointerEvents: win || clickedIndexes.includes(index) ? 'none' : 'auto'}}
                                     key={index}>
                                    {win && index === Number.parseInt(localStorage.getItem("magNum"))  && index}
                                </div>
                            )
                        })}
                    </div>
                }
                <br/>
                <div>
                    {win ? <h5>Bingo buddy!!</h5> : <h5>Remaining attempts - <span>{(5 - theCount).toString()}</span></h5> }
                </div>
            </>
        )

};

export default Board;