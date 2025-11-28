const Header: React.FC = () => {
  return (
    <>
      <header className="fixed top-0 left-0 z-50 bg-white w-full shadow-lg">
        {/* The container uses padding that adjusts slightly on medium screens */}
        <div className="p-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo: text size adjusts slightly for larger screens */}
            <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-indigo-500 via-sky-500 to-green-400 text-transparent bg-clip-text">
              TaskO
            </div>

            {/* Action Buttons Container */}
            <div className="gap-3 flex items-center">
              <div>
                <button
                  className="py-2 px-4 text-sm sm:text-base text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition duration-150 shadow-md"
                  aria-label="Register New Account"
                >
                  Register
                </button>
              </div>
              <div>
                <button
                  className="py-2 px-4 text-sm sm:text-base bg-white border-2 border-transparent rounded-md hover:bg-gray-50 hover:border-slate-500 transition duration-150 shadow-sm"
                  aria-label="Log In to Account"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
