import React from 'react';
import { useSelector } from "react-redux"
import { useMemo } from "react"

function ExtraInformations() {

    const movies = useSelector((state) => state.moviesReducer.movies)
    const language = useSelector((state) => state.navigationBarReducer.language)

    const average_rating = useMemo(() => {
        let total_rating = 0
        movies?.forEach(movie => total_rating += movie?.vote_average)
        return movies?.length > 0 ? (total_rating / movies?.length) : 0
    }, [movies])

    return (
        <div className="d-flex gap-3 align-items-center my-4" style={{ color: "#d1d1d1" }}>
            <div>
                <div className="fw-bold" style={{backgroundColor:"#ee0000", padding:"10px", display:"flex", justifyContent:"center", color:"white", fontSize:"25px", borderRadius:"10%"}}>{movies.length}</div>
                <div style={{backgroundColor:"black", padding:"5px 10px", marginTop:"4px", borderRadius:"10px"}}>{language === "en-US" ? "Items on this list" : "Bu listedeki öğeler"}</div>
            </div>

            <div>
                <div className="fw-bold" style={{backgroundColor:"#ee0000", padding:"10px", display:"flex", justifyContent:"center", color:"white", fontSize:"25px", borderRadius:"10%"}}>{average_rating.toFixed(1)}</div>
                <div style={{backgroundColor:"black", padding:"5px 10px", marginTop:"4px", borderRadius:"10px"}}>{language === "en-US" ? "Average Rating" : "Ortalama Puan"}</div>
            </div>
        </div>
    )
}

export default ExtraInformations