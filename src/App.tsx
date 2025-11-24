import "./App.css";

function App() {
  return (
    <div className="min-h-screen w-full">
      <header className="fixed top-0 left-0 bg-gray-100 w-full px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="rounded-md text-base font-bold">TaskO</div>
          <div className="gap-2 flex">
            <div>
              <button className="p-2 rounded-md text-base bg-blue-300 border border-blue-100">
                Register
              </button>
            </div>
            <div>
              <button className="p-2 rounded-md text-base bg-emerald-300 border border-blue-100">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="relative top-[61px] w-full">
        <div>
          <h1>Task Manager</h1>
        </div>
        <div>
          <button onClick={() => {}}>Create Task</button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
