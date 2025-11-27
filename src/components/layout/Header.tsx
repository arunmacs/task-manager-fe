const Header: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 left-0 z-50 bg-white-300 w-full p-4 border-b border-white shadow-lg">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-linear-to-r from-indigo-500 via-sky-500 to-green-400 text-transparent bg-clip-text">
            TaskO
          </div>
          <div className="gap-2 flex">
            <div>
              <button className="py-2 px-4 text-base text-white bg-emerald-300 border border-transparent hover:border-gray-500">
                Register
              </button>
            </div>
            <div>
              <button className="py-2 px-4 text-base bg-white border border-transparent hover:border-gray-500">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
