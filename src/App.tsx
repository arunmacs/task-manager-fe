import "./App.css";
import HomePage from "./components/HomePage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="min-h-screen">
      <Layout>
        <main className="relative pt-[74px] pb-8 px-4 sm:px-6 md:px-8">
          <HomePage />
        </main>
      </Layout>
    </div>
  );
}

export default App;
