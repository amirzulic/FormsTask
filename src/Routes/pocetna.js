import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/pocetna.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "firebase";

function Pocetna() {

    let history = useHistory();

    let db = firebase.firestore();

    const [naziv, setNaziv] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        if (naziv === "") {
            alert("Niste unijeli naziv forme!");
        } else {
            history.push("/forme/" + naziv);
        }
    }
    return (
        <div className="sve">
            <div className="container image">
                <div className="row body">
                    <div className="col">
                    </div>
                    <div className="col-6 body">
                        <h1><b>The Forms Project</b></h1>
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col padding15px">
                        <img src="https://image.flaticon.com/icons/png/512/2991/2991114.png"/>
                    </div>
                    <div className="col body2 padding15px">
                        <h3>Dobro došli na projekat Forme</h3>
                        <br/>
                        <h3>Da bi nastavili dalje, pritisnite dugme koje se nalazi ispod</h3>
                        <br/>
                        <button type="button" className="btn btn-outline-light" onClick={ () => {
                            history.push("/forme");
                        }}> NASTAVI </button>
                        <br/>
                        <hr/>
                        <h3>Ukoliko ste već prethodno kreirali formu, za njeno učitavanje unesite naziv ispod:</h3>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor={naziv}>Unesite naziv forme:</label>
                            <input type="text" className="form-control" placeholder="Naziv forme"
                                   onChange={(e) => setNaziv(e.target.value)}/>
                                   <br/>
                            <button type="submit" className="btn btn-outline-light">UNESI</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pocetna;