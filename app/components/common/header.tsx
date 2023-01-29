import { Form, Link } from "@remix-run/react";
import { FaUserCircle } from "react-icons/fa";
import { useUserStore } from "~/store/user";
import Logo from "../miscellaneous/img";


export default function Header() {
  const _useUserStore: any = useUserStore();
  console.log('_useUserStore :: ', _useUserStore);
  
  return (
    <header className="py-4 shadow-sm ">
      <div className="container flex items-center justify-between">
        <Link to="index.html" className="flex justify-center items-center" >
          <div className="w-32" >
            <Logo />
          </div>
          <div>
          <div className="text-3xl text-green-600 font-bold" >
            FARM - A - Zone
          </div>
          <span className="text-base italic" >Lets support our farmers</span>
          </div>
        </Link>

        {((!_useUserStore.status || _useUserStore.status) && _useUserStore?.udata?.utype !== 'farmer') &&
          <Form method="post" action="/search-product" className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" name="search" id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
            placeholder="Search for product you like" />
          <button
            className="bg-primary border border-primary  px-8 rounded-r-md ">Search</button>
        </Form>}

        {_useUserStore.state &&
          <div className="flex items-center space-x-4">

            <Link to={`${_useUserStore.udata.uType}/profile/${_useUserStore.udata.uid}`} className="text-center text-gray-700 hover:text-primary transition relative flex justify-center items-center">
              <div className="text-2xl mx-2">
                <FaUserCircle />
              </div>
              <div className="text-lg leading-3">Your Profile</div>
            </Link>
          </div>}
      </div>
    </header>
  );
}