import { Form, useActionData, useLoaderData, useNavigate, useSubmit, useTransition } from '@remix-run/react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { addProduct, editProd, getProduct } from '~/lib/product.server';
import { supabase } from '~/lib/supabase';
import { useUserStore } from '~/store/user';
import logoImg from './../../assets/images/logo.jpg';

const EditProduct = () => {
  const imgRef = useRef(null);
  const imgUploadRef = useRef(null);
  // const [img, setImg] = useState(null)
  const [fileName, setFileName] = useState(null)
  const transition = useTransition();
  const _useUserStore: any = useUserStore();
  const navigate = useNavigate();
  const submit = useSubmit();
  const prodAction = useActionData();
  console.log('prodAction :: ', prodAction);
  const loaderData = useLoaderData();
  console.log('loaderData :: ', loaderData);
  
  // localStorage.setItem('location_zone', '/farmer/add-product')

  const imgChangeHYandler = async (e) => {
    const [file] = e.target.files
    if (file) {
      let fName = `${Math.random()}_${file.name}`
      setFileName(fName)
      const { data, error } = await supabase.storage
        .from('prods')
        .upload(fName, file)
      console.log('data :: ', data);

      imgRef.current.src = URL.createObjectURL(file)
    }
  }


  return (
    <>
      {loaderData && !loaderData.status &&
        <p className='w-full py-2 px-10 bg-red-200 text-red-800' > {loaderData.msg}</p>
      }
      {prodAction && prodAction.status &&
        <p className='w-full py-2 px-10 bg-green-200 text-green-800' > Product Edited</p>
      }
      {prodAction && !prodAction.status &&
        <p className='w-full py-2 px-10 bg-red-200 text-red-800' > {prodAction.msg}</p>
      }
      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-2 "></div>
        <div className="col-span-8 border border-gray-200 p-4 rounded " >
          <h3 className="text-lg font-medium capitalize mb-4">Edit your product</h3>
          <div className="space-y-4" >
            <div className='flex justify-center items-center flex-col mb-4' >
              <img ref={imgRef} src={`https://ldxbxarkcxnvujovtmoo.supabase.co/storage/v1/object/public/prods/${loaderData.data[0].imgUrl}`}
                className="h-36 w-44   rounded-lg mb-2" />
              <input type={'file'} accept="images/*" ref={imgUploadRef} onChange={imgChangeHYandler} name="img" />
            </div>
            <Form method='post' className='mx-10' >
              <div>
                <input name='fileName' type={'text'} hidden value={fileName || loaderData.data[0].fileName} />
                <input name='user_uid' type={'text'} hidden value={_useUserStore.udata.uid || ''} />
              </div>
              <div className='flex flex-col mb-4' >
                <label htmlFor="name" className="text-gray-600 my-2">Product Name</label>
                <input type="text" value={loaderData.data[0].name} name="name" id="name" className="input-box bg-slate-100 px-4 py-2 " />
              </div>
              <div className='flex flex-col mb-4' >
                <label htmlFor="brand" className="text-gray-600 my-2">Product Brand Name</label>
                <input type="text" value={loaderData.data[0].brand} name="brand" id="brand" className="input-box bg-slate-100 px-4 py-2 " />
              </div>
              <div className='flex flex-col mb-4' >
                <label htmlFor="mrp" className="text-gray-600 my-2">MRP Price</label>
                <input type="number" value={loaderData.data[0].mrp} name="mrp" id="mrp" className="input-box bg-slate-100 px-4 py-2 " />
              </div>
              <div className='flex flex-col mb-4' >
                <label htmlFor="price" className="text-gray-600 my-2">Price after discount</label>
                <input type="number" value={loaderData.data[0].price} name="price" id="price" className="input-box bg-slate-100 px-4 py-2 " />
              </div>
              <div className='flex  mb-4' >
                <label htmlFor="inStock" className="text-gray-600 my-2 pr-4">Is Product In Stock? </label>
                <input type="checkbox" checked={loaderData.data[0].inStock} name="inStock" id="inStock" className="input-box bg-slate-100 px-4 py-2 " />
              </div>
              <div className='flex flex-col mb-4' >
                <label htmlFor="description" className="text-gray-600 my-2">Description</label>
                <textarea name='description' value={loaderData.data[0].description} id='description' placeholder='explain about your product' rows={5} className="w-full nput-box bg-slate-100 px-4 py-2" />
              </div>
              <div className='flex flex-col mb-4'>
                <button type='submit' className='bg-green-200 py-2 rounded-lg text-green-900 font-bold' >{transition.state === "submitting" ? "Adding..." : "Add Your Product"}</button>
              </div>
            </Form>
          </div>
        </div>
        <div className="col-span-2 "></div>
      </div>
    </>
  )
}

export const loader = async ({ params }) => {
  console.log('loader :: params :: ', params);
  const pid = params.id;
  const dbRes = await getProduct(pid);

  return dbRes;
}

export const action = async (actionData) => {
  const formData = await actionData.request.formData();
  let values = Object.fromEntries(formData);
  console.log('values :: ', values);

  if (!values.fileName || !values.name || !values.mrp || !values.price || !values.description || !values.brand) {
    return {
      status: false,
      msg: 'form is incomplete'
    }
  }
  if (values?.inStock === 'on') {
    values.inStock = true
  } else {
    values.inStock = false
  }
  values.mrp = +values.mrp;
  values.price = +values.price;

  const dbRes = await editProd(values);
  console.log('dbRes :: ', dbRes);
  if (!dbRes.status) {
    return dbRes;
  }

  return dbRes;
}



export default EditProduct;