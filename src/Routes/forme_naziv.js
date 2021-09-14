import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/pocetna.css';
import firebase from 'firebase';
import { useParams } from "react-router";



function FormeNaziv() {

    let { naziv } = useParams();

    let history = useHistory();

    const [tekstovi, setTekstovi] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        setTekstovi(tekstovi);

        updateFormLayouts();

        history.push("/forme/" + naziv);
    }

    let db = firebase.firestore();

    let array = [{
        naziv: naziv,
        tekstualni: 1,
        numeralni: 1
    }];

    const [formLayout, setFormLayout] = useState([array]);


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
            tekstovi: tekstovi
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
                        <h1><b>UNOS TEKSTUALNIH PORUKA</b></h1>
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
                                {[...Array(formLayout[0].tekstualni)].map((e, i) =>
                                    <div>
                                        <label for={i}>Unesite tekst {i+1}. za tekstualnu formu</label>
                                        <input type="text" className="form-control" key={i}
                                               onChange={(e) => tekstovi[i] = (e.target.value) }/>
                                        <br/>
                                    </div>
                                )}

                                {[...Array(formLayout[0].numeralni)].map((e, i) =>
                                    <div>
                                        <label for={i}>Unesite tekst {i + 1 + formLayout[0].tekstualni}. za numeralnu formu</label>
                                        <input type="text" className="form-control" key={i}
                                               onChange={(e) => tekstovi[i+formLayout[0].tekstualni] = (e.target.value)}/>
                                        <br/>
                                    </div>
                                )}
                                <br/>
                                <button type="submit" className="btn btn-outline-light">POTVRDI</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormeNaziv;