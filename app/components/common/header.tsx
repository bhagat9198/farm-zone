import { Form, Link } from "@remix-run/react";
import { useUserStore } from "~/store/user";
import Logo from "../miscellaneous/img";


export default function Header() {
  const _useUserStore: any = useUserStore();

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link to="index.html">
          <div className="w-32" >
            <Logo />
          </div>
        </Link>

        <Form method="post" action="/search-product" className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input type="text" name="search" id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
            placeholder="Search for product you like" />
          <button
            className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">Search</button>
        </Form>

        {_useUserStore.state &&
          <div className="flex items-center space-x-4">
            <Link to="#" className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fa-regular fa-heart"></i>
              </div>
              <div className="text-xs leading-3">Wishlist</div>

            </Link>
            <Link to="#" className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <div className="text-xs leading-3">Cart</div>
            </Link>
            <Link to={`${_useUserStore.udata.utype}/profile/${_useUserStore.udata.uid}`} className="text-center text-gray-700 hover:text-primary transition relative">
              <div className="text-2xl">
                <i className="fa-regular fa-user"></i>
              </div>
              <div className="text-xs leading-3">Your Profile</div>
            </Link>
          </div>}
      </div>
    </header>
  );
}