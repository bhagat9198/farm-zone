import { Form, useActionData, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { getAllFarmerProds } from "~/lib/product.server";

const YourProducts = () => {
  const submit = useSubmit();
  const prods = useActionData();
  console.log('prods :: ', prods);

  useEffect(() => {
    const uid = localStorage.getItem('uid_zone');
    if (!uid) return;
    let formData = new FormData();
    formData.append('uid', uid)
    submit(formData, { method: 'post', action: '/farmer/your-products' })
  }, [])

  // return <></>
  return (<>
    <div className="w-full mx-20 " >
      {prods && prods.status && prods.data.map(_p => (
        <div className="bg-white shadow rounded-2xl boder border-gray-300 my-4 ">
          <div className="flex " >
            <div className="relative ">
              <img src={`https://ldxbxarkcxnvujovtmoo.supabase.co/storage/v1/object/public/prods/${_p.imgUrl}`} alt="product 1" className="w-72 h-52 cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">

              </div>
            </div>
            <div className="mx-24 w-full flex flex-col justify-between" >
            <div className="p-4">
              <a href="#">
                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                  ${_p.name}</h4>
              </a>
              <div className="flex items-baseline mb-1 space-x-2">
                <p className="text-xl text-primary font-semibold">₹{_p.price}</p>
                <p className="text-sm text-gray-400 line-through">₹{_p.mrp}</p>
              </div>
            </div>
            <div className="flex justify-around items-center w-full" >
              <button className="mx-4 block py-1 w-full text-center text-white font-bold bg-red-400 border border-primary rounded-b">
                Delete
              </button>
              <button className="mx-4 block py-1 w-full text-center text-white font-bold bg-green-400 border border-primary rounded-b">
                Edit
              </button>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>)
}

export const action = async (actionData) => {
  console.log('actionData :: ', actionData);

  const formData = await actionData.request.formData();
  const values = Object.fromEntries(formData);

  const dbRes = await getAllFarmerProds(values.uid);
  console.log('dbRes :: ', dbRes);
  if (!dbRes.status) {
    return dbRes
  }
  return dbRes;
}

export default YourProducts;