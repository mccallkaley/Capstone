import {useEffect, useState} from 'react'


export default function useColorChanger(numClicks, setNumClicks){
    const [bgColor, setBgColor] = useState('black')
    useEffect(
        ()=>{
            switch(numClicks){
                case 0: setBgColor('cyan'); break;
                case 1: setBgColor('red'); break;
                case 2: setBgColor('green'); break;
                case 3: setBgColor('blue'); break;
                case 4: setBgColor('indigo'); break;
                case 5: setBgColor('violet'); break;
                default: setBgColor('gray');
                return ()=>{if (numClicks>=6){setNumClicks(0)}}
            }
        }, [numClicks]
    )
    return bgColor
}