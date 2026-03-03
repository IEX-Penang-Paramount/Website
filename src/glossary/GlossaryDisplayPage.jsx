import React from "react";
import { GlossaryItem } from "./GlossaryItem";
import { Link } from "react-router-dom";
import "./GlossaryDisplayPage.css"
import { useParams } from "react-router-dom";
import { glossaryData } from "./glossaryData";
export default function GlossaryDisplayPage() {

    const {id} = useParams();
    const word = glossaryData.find(w => w.id === id);
    if (!word) {
        return <div className="wordFrame">Word not found</div>;
    }
    return (
    <div className="outerWordFrame">
        <div className = "returnLink">
            <Link to="/glossary">{"< Back to Glossary"}</Link>
        </div>
        <GlossaryItem word={word}/>
     </div>
    )
}

