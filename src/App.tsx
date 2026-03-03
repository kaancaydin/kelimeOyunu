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
        <Lottie
          animationData={loader}
          loop
          className="w-48 h-48 sm:w-64 sm:h-64"
        />
      </div>
    );
  }
  const { startGame, gameEnd, theme } = state;
  const { setTheme } = actions;

  return (
    <div className="flex flex-col h-dvh w-full">
      <InfoTab theme={theme} setTheme={setTheme} />
      <main
        className={`flex-1 w-full flex  min-h-0 custom-scrollbar ${gameEnd ? "overflow-y-auto" : "overflow-hidden"}`}
      >
        <div className=" w-full flex flex-col items-center py-4 px-2 ">
          {startGame ? (
            gameEnd ? (
              <GameOver actions={actions} state={state} />
            ) : (
              <div className="my-auto h-full w-full flex items-center justify-center">
                <MainGame state={state} actions={actions} refs={refs} />
              </div>
            )
          ) : (
            <div className="my-auto">
              <GameStart actions={actions} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
