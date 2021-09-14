import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/pocetna.css';
import firebase from 'firebase';
import { useParams } from "react-router";



function FormeFinal() {
    let db = firebase.firestore();

    let { naziv } = useParams();

    let history = useHistory();

    let niz_tekstova = [];
    let niz_odgovora = [];


    let array = [{
        naziv: naziv,
        tekstualni: 1,
        tekstovi: niz_tekstova,
        odgovori: niz_odgovora,
        numeralni: 1
    }];

    console.log(array);

    function handleSubmit(e) {
        e.preventDefault()

        setOdgovori(odgovori);

        updateFormLayouts();
    }

    const [formLayout, setFormLayout] = useState([array]);
    const [odgovori, setOdgovori] = useState([formLayout[0].odgovori]);

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
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    function updateFormLayouts() {
        db.collection("form_layouts").doc(naziv).update({
            odgovori: odgovori
        }).then( () => {
            console.log("good");
        }).catch((error) => {
            console.log("bad");
        })
    }

    return (
        <div className="sve">
            <div className="container image">
                <div className="row body">
                    <div className="col">
                    </div>
                    <div className="col-6 body">
                        <h1><b>{naziv}</b></h1>
                        <h6>LINK:</h6><h6 id="kopiraj">localhost:3000/forme/{naziv}/odgovori</h6>
                        <button onClick={() => {navigator.clipboard.writeText(document.getElementById("kopiraj").innerText)}} className="btn btn-sm btn-outline-light">KOPIRAJ</button>
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
                                { [...Array(formLayout[0].tekstualni)].map((e, i) =>
                                    <div>
                                        <label for={i}>{formLayout[0].tekstovi}</label>
                                        <input type="text" className="form-control" key={i}
                                               onChange={(e) => odgovori[i] = (e.target.value)}/>
                                        <br/>
                                    </div>
                                )}
                                {[...Array(formLayout[0].numeralni)].map((e, i) =>
                                    <div>
                                        <label for={i}>{formLayout[0].tekstovi}</label>
                                        <input type="number" className="form-control" key={i}
                                               onChange={(e) => odgovori[i + formLayout[0].tekstualni] = (e.target.value)}/>
                                        <br/>
                                    </div>
                                )}
                                <button type="submit" className="btn btn-outline-light">POTVRDI</button>
                            </form>
                            <br/>
                                <button className="btn btn-outline-light" onClick={() => {
                                    history.push("/forme/" + naziv + "/odgovori");
                                }}>ODGOVORI</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormeFinal;