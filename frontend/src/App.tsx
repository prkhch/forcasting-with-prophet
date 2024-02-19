import "./App.css";
import AppRoute from "config/AppRoute";
import Loading from "components/common/Loading";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Loading />
      <AppRoute />
    </RecoilRoot>
  );
}

export default App;
