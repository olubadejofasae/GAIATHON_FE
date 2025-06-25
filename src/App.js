import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProblemSol from "./pages/ProblemSol";
import Teams from "./pages/Team";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Main>
          <Route exact path="/" component={Home} />
          <Route exact path="/problemsol" component={ProblemSol} />
          <Route exact path="/team" component={Teams} />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
