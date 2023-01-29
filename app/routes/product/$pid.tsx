import { Link, useActionData, useLoaderData, useMatches, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getProduct } from "~/lib/product.server";

export default function EachProduct() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const [qty, setQty] = useState(1);
  const matches = useMatches();
  console.log('matches :: ', matches);
  console.log('loaderData :: ', loaderData);
  console.log('actionData :: ', actionData);
  const submit = useSubmit();

  const mainProd = loaderData?.mainProd;
  const relProds = loaderData?.realted;
  // useEffect(() => {
  //   if (loaderData.status && loaderData.data[0].name) {
  //     let formData = new FormData();
  //     formData.append('name', loaderData.data[0].name)
  //     submit(formData, {method: 'post'} )
  //   }
  // }, [loaderData.data])

  const incrementQty = () => {
    setQty(prev => prev + 1)
  }

  const decrementQty = () => {
    if (qty === 1) return;

    setQty(prev => prev--)
  }

  return (
    <>
      {mainProd && !mainProd.status &&
        <p className="px-10 rounded-lg py-2" >{mainProd?.msg}</p>
      }
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img src={`https://ldxbxarkcxnvujovtmoo.supabase.co/storage/v1/object/public/prods/${mainProd.data[0].imgUrl}`} alt="product" className="w-full" />
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">{mainProd.data[0].name}</h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
              <span><i className="fa-solid fa-star"></i></span>
            </div>
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              {mainProd.data[0].inStock && <span className="text-green-600">In Stock</span>}
              {!mainProd.data[0].inStock && <span className="text-red-600">Out of Stock</span>}
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">{mainProd.data[0].brand}</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">₹ ${mainProd.data[0].price}</p>
            <p className="text-base text-gray-400 line-through">₹ ${mainProd.data[0].mrp}</p>
          </div>

          <p className="mt-4 text-gray-600">
            ${mainProd.data[0].description}
          </p>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div onClick={decrementQty} className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</div>
              <div className="h-8 w-8 text-base flex items-center justify-center">{qty}</div>
              <div onClick={incrementQty} className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <a href="#"
              className="bg-primary border border-primary px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
              <i className="fa-solid fa-bag-shopping"></i> Add to cart
            </a>
          </div>


        </div>
      </div>

      {<div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Related products</h2>
        {relProds && relProds.status && relProds.data.length === 0 &&
          <p className="mx-10 rounded-lg py-2 text-red-700 bg-red-200 font-bold" >Didnt found any matching products</p>}
        <div className="grid grid-cols-4 gap-6">
          {relProds && relProds.status && relProds.length > 0 &&
            relProds.data.map(_p => (
              <div className="bg-white shadow rounded ">
                <div className="relative">
                  <img src={`https://ldxbxarkcxnvujovtmoo.supabase.co/storage/v1/object/public/prods/${_p.imgUrl}`} alt="product 1" className="w-full" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link to={`product/${_p.uid}`}
                      className=" text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="view product">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    {/* <a href="#"
                     className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                     title="add to wishlist">
                     <i className="fa-solid fa-heart"></i>
                   </a> */}
                  </div>
                </div>
                <div className="pt-4 pb-3 px-4">
                  <a href="#">
                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{_p.name}</h4>
                  </a>
                  <div className="flex items-baseline mb-1 space-x-2">
                    <p className="text-xl text-primary font-semibold">₹ ${_p.price}</p>
                    <p className="text-sm text-gray-400 line-through">₹ ${_p.mrp}</p>
                  </div>
                </div>
                <a href="#"
                  className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                  to cart</a>
              </div>
            ))}
        </div>
      </div>}
    </>)
}

export const loader = async ({ params }) => {
  console.log('params :: ', params);

  const pid = params.pid;

  const dbRes = await getProduct(pid);
  console.log('each product ::dbRes :: ', dbRes);

  if (!dbRes.status) {
    return dbRes
  }

  let name = dbRes.data?.[0].name.split(' ')[0];
  let subname = name;
  if (name.length > 4) {
    subname = name.substring(0, 3);
  }
  console.log('subname :: ', subname);

  const dbReleated = await getProduct(subname);
  console.log('each product ::dbReleated :: ', dbReleated);


  return {
    mainProd: dbRes,
    realted: dbReleated
  }

}

