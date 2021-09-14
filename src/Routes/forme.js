import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/pocetna.css';
import firebase from 'firebase';


function Forme() {

    let history = useHistory();

    let db = firebase.firestore();

    const [naziv, setNaziv] = useState("");
    const [tekstualni, setTekstualni] = useState(0);
    const [numeralni, setNumeralni] = useState(0);
    const [sifra, setSifra] = useState("");

    function handleSubmit(e) {
        e.preventDefault()

        if(naziv !== "" && tekstualni !== 0 && numeralni !== 0 && sifra !== "") {
            db.collection("form_layouts").doc(naziv).set({
                naziv: naziv,
                tekstualni: parseInt(tekstualni),
                numeralni: parseInt(numeralni),
                sifra: sifra
            }).then(() => {
                alert("Form layout uspjesno dodan!");
            }).catch((err) => {
            })
        } else {
            alert("Jedno od polja nije popunjeno!");
            return;
        }

        setNaziv("");
        setTekstualni(0);
        setNumeralni(0);
        setSifra("");

        history.push("/forme/"+naziv+"/unos_teksta");

    }

    return (
        <div className="sve">
            <div className="container image">
                <div className="row body">
                    <div className="col">
                    </div>
                    <div className="col-6 body">
                        <h1><b>Kreirajte izgled forme</b></h1>
                    </div>
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col padding15px">
                        <img src="https://image.flaticon.com/icons/png/512/2991/2991114.png"
                        onClick={() => history.push("/")}/>
                    </div>
                    <div className="col body2 padding15px">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <label for={naziv}>Unesite naziv forme:</label>
                                <input type="text" className="form-control" placeholder="Naziv forme" value={naziv}
                                       onChange={(e) => setNaziv(e.target.value)}/>
                                <br/>
                                <label htmlFor={sifra}>Unesite sifru za formu:</label>
                                <input type="text" className="form-control" placeholder="Sifra forme" value={sifra}
                                       onChange={(e) => setSifra(e.target.value)}/>
                                <br/>
                                <label for={tekstualni}>Unesite broj tekstualnih inputa:</label>
                                <input type="number" className="form-control" placeholder="Tekstualni" value={tekstualni}
                                       onChange={(e) => setTekstualni(e.target.value)}/>
                                <br/>

                                <label for={numeralni}>Unesite broj numeralnih inputa:</label>
                                <input type="number" className="form-control" placeholder="Numeralni" value={numeralni}
                                       onChange={(e) => setNumeralni(e.target.value)}/>
                                <br/>
                                <button type="submit" className="btn btn-outline-light">UNESI</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forme;