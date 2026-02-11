//import { Timer } from "./components/Timer";
import "./App.css";
import { InfoTab } from "./components/InfoTab";
import { GameOver } from "./components/GameOver";
import { GameStart } from "./components/GameStart";
import { useGameLogic } from "./hooks/useGameLogic";
import { MainGame } from "./components/MainGame";

function App() {
  const { state, actions, refs } = useGameLogic();

  if (!state.data) {
    return <div className="p-3">Loading....</div>;
  }
  const { startGame, gameEnd } = state;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <InfoTab />
      {startGame ? (
        gameEnd ? (
          <GameOver actions={actions} state={state} />
        ) : (
          <MainGame state={state} actions={actions} refs={refs} />
        )
      ) : (
        <GameStart actions={actions} />
      )}

      {/*       <div className="hidden">
        <Timer ref={timerRef} />
        {kelimeler.map((item, index) => (
          <ul
            className="flex justify-center items-center flex-col gap-8 p-5
                bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
                w-[60vw] max-w-225 min-h-20
                transition-all duration-500 hover:shadow-indigo-500/20"
          >
            <li key={index}>
              <b>{item.kelime}</b> - {item.aciklama} - Harf : {item.harfSayisi}{" "}
              - Köken : {item.koken}
            </li>
          </ul>
        ))}
      </div> */}
    </div>
  );
}

export default App;
