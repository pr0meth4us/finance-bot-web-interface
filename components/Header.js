const Header = ({ onRefresh, onLogout }) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Financial Overview
            </h1>
            <div className="flex items-center gap-2">
                <button
                    onClick={onRefresh}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                    Refresh
                </button>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;