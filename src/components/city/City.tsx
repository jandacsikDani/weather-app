import SearchModal from "../searchModal/SearchModal";
import "./City.css";
import { useState } from "react";

function City(){
    const [isOpen, setIsOpen] = useState<boolean>(false);


return (
    <>
        <div className="cityContainer">
            <div id="changeCity" onClick={() => setIsOpen(true)}>Város kiválasztása</div>
            {isOpen && <SearchModal onClose={() => setIsOpen(false)}/>}
            <div id="cityName">Város neve</div>
            <div id="temperature"></div>
            <div id="unit"></div>
        </div>
    </>
)
}

export default City;
