import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/pocetna.css';
import firebase from 'firebase';
import { useParams } from "react-router";



function FormeOdgovori() {
    let db = firebase.firestore();

    let { naziv } = useParams();

    let history = useHistory();

    let niz_tekstova = [];
    let niz_odgovora = [];


    let array = [{
        naziv: naziv,
        sifra: 0,
        tekstualni: 1,
        tekstovi: niz_tekstova,
        odgovori: niz_odgovora,
        numeralni: 1
    }];

    const [formLayout, setFormLayout] = useState([array]);
    const [sifra, setSifra] = useState("");
    const [prikazi, setPrikazi] = useState(false);

    useEffect( () => {
        procitajFormLayout();
    }, []);

    function procitajFormLayout() {
        db.collection("form_layouts").where("naziv", "==", naziv)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((artikal) => {
                    array = querySnapshot.docs.map(formLayout => formLayout.data());
                    setFormLayout(array);
                    console.log(array);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    return (
        <div className="sve">
            <div className="container image">
                <div className="row body">
                    <div className="col">
                    </div>
                    <div className="col-6 body">
                        <h1><b>{naziv} - ODGOVORI</b></h1>
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
                            <div className="container">

                                { prikazi ?
                                    <div>
                                    <h3>Zabiljezeni odgovori</h3>
                                    {[...Array(formLayout[0].tekstualni+formLayout[0].numeralni)].map((e, i) =>
                                    <div>
                                    <div key={i}>{formLayout[0].odgovori[i]}</div>
                                    </div>
                                    )}
                                    </div>
                                    :
                                    <form onSubmit={() => {
                                        if(formLayout[0].sifra === sifra) {
                                            setPrikazi(true);
                                        }
                                    }}>
                                        <label htmlFor="sifra">Unesite sifru forme:</label>
                                        <input type="number" className="form-control"
                                               onChange={(e) => setSifra(e.target.value)}/>
                                        <br/>
                                        <button type="submit" className="btn btn-outline-light">POTVRDI</button>
                                    </form>}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormeOdgovori;