import { Link, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { getFilteredProds } from "~/lib/product.server";

const SearchProduct = () => {
  const searchProds = useActionData();
  console.log('searchProds :: ', searchProds);

  // useEffect(() => {

  // }, [])

  return (
    <>
      <div className="w-full p-10" >
        {searchProds && searchProds.status && searchProds.data.length === 0 &&
          <p className="px-10 py-4 bg-red-200 text-red-800" >
            No Products Found :-(
          </p>
        }
        {searchProds && !searchProds.status &&
          <p className="px-10 py-4 bg-red-200 text-red-800" >
            {searchProds.msg}
          </p>
        }
        {searchProds && searchProds.status && searchProds.data.length > 0 &&
          <div>
            <p className="py-2 mb-4 text-gray-500 font-semibold" >We found selected products only for you</p>

            {searchProds.data.map(_p =>
              <div className="my-10 p-5 border-2 border-gray-300 rounded-2xl" >
                <Link to={`/product/${_p.uid}`} className="bg-slate-200  ">
                  <div className="flex " >
                    <div className="relative ">
                      <img src={`https://ldxbxarkcxnvujovtmoo.supabase.co/storage/v1/object/public/prods/${_p.imgUrl}`} alt="product 1" className="w-72 h-52 cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                      </div>
                    </div>
                    <div className="mx-24 w-full flex flex-col justify-between" >
                      <div className="p-4">
                        <h4 className="uppercase font-medium text-xl mb-4 text-gray-800 ">
                          {_p.name}
                        </h4>
                        <h4 className="font-medium text-lg mb-2 text-gray-800 ">
                          {_p.description}
                        </h4>
                        <div className="flex items-baseline mb-1 space-x-2">
                          <p className="text-xl text-primary font-semibold">₹{_p.price}</p>
                          <p className="text-sm  line-through text-red-500 ">₹{_p.mrp}</p>
                        </div>
                        <div className="my-2" >
                          {_p.inStock && <p className="text-green-600" >In Stock <span className="text-xs mx-3 " >Order fast, before its unavialble</span> </p>}
                          {!_p.inStock && <p className="text-red-700" >Out of Stock <span className="text-xs mx-3 " >Hard luck!!!</span> </p>}
                        </div>
                      </div>
                      <div className="flex justify-around items-center w-full" >
                        <button className="mx-4 block py-2 w-full text-center text-white font-bold bg-violet-500 border border-primary rounded-lg">
                          Add to Wishlist (Coming Soon)
                        </button>
                        <Link to={`/product/${_p.uid}`} className="mx-4 block py-2 w-full text-center text-white font-bold bg-green-400 border border-primary rounded-lg">
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        }
      </div>
    </>
  )
}

export const action = async (actionData) => {
  // console.log('actionData :: ', actionData);

  const formData = await actionData.request.formData();
  const values = Object.fromEntries(formData);

  const dbRes = await getFilteredProds(values.search);
  console.log('dbRes :: ', dbRes);
  return dbRes;

}

export default SearchProduct;