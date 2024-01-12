import { useEffect, useRef, useState } from "preact/hooks";
import { timeFormatting } from "../utils/parsers";

export default function Timer({duration}:{duration:number}){
    const [time, setTime] = useState(duration)
    const [run, setRun] = useState(false)
    const timer = useRef<undefined | number>(undefined)
    const formattedTime = timeFormatting(time)

    useEffect(()=>{
        const incrementTime = ()=>{
            setTime(t => t - 1)
        }
        if(time < 1 || !run){
            return
        }else{
            timer.current = setInterval(incrementTime, 1000)
        }
        return ()=>{ if(timer.current) clearInterval(timer.current)}
    },[time, run])

    return <button onClick={()=>{setRun(r => !r)}}>{formattedTime}</button>
}