import { useState } from "react";
import icon from "../../styles/icon.js"
import "./navbar.css";

const Navbar = (props) => {

   const [filtro,setFiltro] = useState("");

    return <div className="navbar">
        <img src= {icon.logo} />

    <div>
        {props.search && (
            <>
            <input onChange={(e) => setFiltro(e.target.value)}onKeyDown={(e)=>{if (e.key === 'Enter')
             {props.onClickSearch(filtro);}}} type="text" id=""/>
             
            <button onClick={() => props.onClickSearch(filtro)} className="btn btn-blue">Buscar</button>
            </>
        )}
    </div>

    <div className="dashboard">
        {
            props.total && <>
            <div> Total de Gastos </div>
            <div>R$ {props.total.toLocaleString('pt-BR', {minimumFractionDigits:2})}</div>
            </>
        }
        </div>
</div>
}

export default Navbar;