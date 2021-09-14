import './App.css';
import {BrowserRouter as Routes, Route, Switch} from "react-router-dom";

import pocetna from "./Routes/pocetna";
import forme from "./Routes/forme";
import formeNaziv from "./Routes/forme_naziv";
import formeFinal from "./Routes/forma_final";
import formeOdgovori from "./Routes/forma_odgovori";

function App() {
  return (
      <Routes>
        <Switch>
            <Route exact path = "/" component={pocetna}/>
            <Route exact path = "/forme" component={forme}/>
            <Route exact path = "/forme/:naziv/unos_teksta" component={formeNaziv}/>
            <Route exact path = "/forme/:naziv" component={formeFinal}/>
            <Route exact path = "/forme/:naziv/odgovori" component={formeOdgovori}/>
        </Switch>
      </Routes>
  );
}

export default App;
