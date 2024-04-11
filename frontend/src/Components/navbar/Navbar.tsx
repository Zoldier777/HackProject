import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const navigate = useNavigate();

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <>
            <div className="navbar bg-base-100 drop-shadow gap-1 justify-between sticky top-0 z-50">
                <div className="flex-initial">
                    <Link to={'/search'}>
                    <div className="btn btn-ghost text-xl">MarketSafe</div>
                    </Link>
                </div>
                <div className="flex-grow form-control">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="input input-bordered border-neutral-600	 w-full" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        onKeyDown={handleKeyDown} 
                                            />
                </div>
                <div className="flex-initial gap-2">
                    <div role="button" className="btn btn-ghost btn-circle avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Create</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-l bg-yellow-300">Start Advertising</a>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navbar;
