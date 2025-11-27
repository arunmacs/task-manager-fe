import "./App.css";
import HomePage from "./components/HomePage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="min-h-screen w-full">
      <Layout>
        <main className="w-full relative top-[62px] py-10 px-4">
          <HomePage />
        </main>
      </Layout>
    </div>
  );
}

export default App;
