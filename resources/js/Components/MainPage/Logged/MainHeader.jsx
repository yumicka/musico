import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faBell, 
  faSignOutAlt,
  faSearch,
  faHome,
  faBook,
  faCalendarAlt,
  faMusic
} from '@fortawesome/free-solid-svg-icons';

export default function MainHeader() {
  return (
    <header className="bg-black/80 backdrop-blur-lg border-b border-[#333] fade">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1aa58c] to-[#148f77] rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faMusic} className="text-white text-sm" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold">Musico</h1>
            </div>

            <nav className="flex items-center space-x-4 md:space-x-6">
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-[#1aa58c] transition-colors">
                <FontAwesomeIcon icon={faHome} />
                <span className="text-sm md:text-base">Page1</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-[#1aa58c] transition-colors">
                <FontAwesomeIcon icon={faBook} />
                <span className="text-sm md:text-base">Page2</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-[#1aa58c] transition-colors">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className="text-sm md:text-base">Page3</span>
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#1a1a1a] border border-[#333] rounded-lg py-2 pl-10 pr-4 text-sm w-48 md:w-64 focus:outline-none focus:border-[#1aa58c]"
              />
            </div>

            <button className="relative p-2">
              <FontAwesomeIcon icon={faBell} className="text-gray-300 hover:text-[#1aa58c] transition-colors" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1aa58c] to-[#148f77] rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
              </div>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faSignOutAlt} href={route('logout')}/>
                <span className="hidden md:inline text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}