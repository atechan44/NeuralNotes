import { NavLink } from 'react-router-dom';

/**
 * Sidebar component for navigation
 * Matching the design from the screenshot
 */
const Sidebar = () => {
  return (
    <div className="h-screen fixed top-0 left-0 bg-[#111] border-r border-[#222] z-20 w-[80px]">
      {/* Menu button at top */}
      <div className="flex items-center justify-center h-16 border-b border-[#222]">
        <button className="p-2">
          <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main Navigation Items */}
      <nav className="mt-4 flex flex-col space-y-6">
        {/* Home */}
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`
          }
          end
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        {/* Notes */}
        <NavLink 
          to="/notes" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`
          }
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs mt-1">Notes</span>
        </NavLink>

        {/* Canvas */}
        <NavLink 
          to="/canvas" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-300'}`
          }
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Canvas</span>
        </NavLink>

        {/* To-Do */}
        <NavLink 
          to="/todo" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`
          }
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-xs mt-1">To-Do</span>
        </NavLink>

        {/* Calendar */}
        <NavLink 
          to="/calendar" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`
          }
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Calendar</span>
        </NavLink>
      </nav>

      {/* Bottom menu items */}
      <div className="absolute bottom-6 w-full flex flex-col space-y-6">
        {/* Account */}
        <NavLink 
          to="/account" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`
          }
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Account</span>
        </NavLink>
        
        {/* Settings */}
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex flex-col items-center py-2 px-2 ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}`
          }
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs mt-1">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
