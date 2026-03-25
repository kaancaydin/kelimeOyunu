import "./App.css";
import { InfoTab } from "./components/InfoTab";
import { GameOver } from "./components/GameOver";
import { GameStart } from "./components/GameStart";
import { useGameLogic } from "./hooks/useGameLogic";
import { MainGame } from "./components/MainGame";

function App() {
  const { state, actions, refs } = useGameLogic();

  if (!state.data) { //loading screen
    return (
      <div className="w-screen h-screen flex justify-center items-center backdrop-blur-lg">
        <div className="flex justify-center items-center">
          <h1 className="flex gap-2">
            {["K", "O"].map((letter) => (
              <div
                key={letter}
                className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-md p-0.5 shadow-[0_4px_10px_rgba(0,0,0,0.5)]
                before:content-[''] before:absolute before:inset-0 before:rounded-md before:z-0
                before:bg-[conic-gradient(from_var(--angle),transparent_75%,#818cf8,#a78bfa,#c084fc)]
                before:animate-[snakeBorder_2.25s_linear_infinite]"
              >
                <span
                  className="relative z-10 w-full h-full flex items-center justify-center
                  text-3xl sm:text-5xl font-clash font-black uppercase
                  rounded-md border border-white/20
                  animate-[bgShift_8s_ease-in-out_infinite]"
                >
                  {letter}
                </span>
              </div>
            ))}
          </h1>
        </div>
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
