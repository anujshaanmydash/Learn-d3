import { useState,useEffect } from "react";

export const useResizeObserver = (ref) =>{
    const [dimension,setDimension] = useState(null);

    useEffect(()=>{
        const  observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries)=>{
            entries.forEach(entry => setDimension(entry.contentRect));
        })

        resizeObserver.observe(observeTarget);
        return ()=>{
            resizeObserver.unobserve(observeTarget);
        }
    },[ref])

    return dimension;
}