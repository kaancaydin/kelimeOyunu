//import { Timer } from "./components/Timer";
import "./App.css";
import { InfoTab } from "./components/InfoTab";
import { GameOver } from "./components/GameOver";
import { GameStart } from "./components/GameStart";
import { useGameLogic } from "./hooks/useGameLogic";
import { MainGame } from "./components/MainGame";
import loader from "./assets/animations/loader.json";
import Lottie from "lottie-react";

function App() {
  const { state, actions, refs } = useGameLogic();

  if (!state.data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center backdrop-blur-lg">
        <Lottie animationData={loader} loop className="w-48 h-48 sm:w-64 sm:h-64"/>
      </div>
    );
  }
  const { startGame, gameEnd, theme } = state;
  const { setTheme } = actions;

  return (
    <div className="flex flex-col h-full w-full justify-between items-center overflow-hidden">
      <InfoTab theme={theme} setTheme={setTheme} />
      <main className="flex-1 w-full flex items-center justify-center p-2 overflow-hidden">
        {startGame ? (
          gameEnd ? (
            <GameOver actions={actions} state={state} />
          ) : (
            <MainGame state={state} actions={actions} refs={refs} />
          )
        ) : (
          <GameStart actions={actions} />
        )}
      </main>
    </div>
  );
}

export default App;

/*       <div className="hidden">
        <div className="hidden">
          {data.kelimeler.map((item, index) => (
            <ul
              className="flex justify-center items-center flex-col gap-8 p-5
                bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[60vw] max-w-225 min-h-20
                transition-all duration-500 hover:shadow-indigo-500/20"
            >
              <li key={index}>
                <b>{item.kelime}</b> - {item.aciklama} - Harf :{" "}
                {item.harfSayisi} - Köken : {item.koken}
              </li>
            </ul>
          ))}
        </div>
      </div> */
