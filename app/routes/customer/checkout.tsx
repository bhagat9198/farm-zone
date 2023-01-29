import { Form, useActionData } from "@remix-run/react";
import { addOrder } from "~/lib/order.server";
import { useProdStore } from "~/store/prods";
import { useUserStore } from "~/store/user";

export default function Checkout() {
  const _useProdStore: any = useProdStore();
  const actionData = useActionData();
  const _useUserStore: any = useUserStore();
  console.log('_useProdStore :: ',_useProdStore.checkout[0]);
  
  return (
    <>
      {actionData && !actionData.status &&
        <p className="text-red-800 bg-red-200  font-bold py-2 px-10" >
          {actionData.msg}
        </p>
      }
      {actionData && actionData.status &&
        <p className="text-green-800 bg-green-200  font-bold py-2 px-10" >
          Order created successfully
        </p>
      }
      <Form method="post" className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6 mx-10">
        <input type="text" name="customerId" value={_useUserStore.udata.uid} hidden />
        <input type="text" name="farmId" value={_useProdStore.checkout[0].Farmer.uid} hidden />
        <input type="text" name="prodId" value={_useProdStore.checkout[0].uid} hidden />
        <div className="col-span-8 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-medium capitalize mb-4">Order Details</h3>
          <div className="space-y-4">
            <div className='flex flex-col mb-4' >
              <label htmlFor="name" className="text-gray-600 my-2">Your Name</label>
              <input type="text" name="name" id="name" className="input-box bg-slate-100 px-4 py-2 " />
            </div>
            <div className='flex flex-col mb-4' >
              <label htmlFor="address" className="text-gray-600 my-2">Address</label>
              <input type="text" name="address" id="address" className="input-box bg-slate-100 px-4 py-2 " />
            </div>
            <div className='flex flex-col mb-4' >
              <label htmlFor="city" className="text-gray-600 my-2">City</label>
              <input type="text" name="city" id="city" className="input-box bg-slate-100 px-4 py-2 " />
            </div>
            <div className='flex flex-col mb-4' >
              <label htmlFor="state" className="text-gray-600 my-2">State</label>
              <input type="text" name="state" id="state" className="input-box bg-slate-100 px-4 py-2 " />
            </div>
            <div className='flex flex-col mb-4' >
              <label htmlFor="pin" className="text-gray-600 my-2">PinCode</label>
              <input type="text" name="pin" id="pin" className="input-box bg-slate-100 px-4 py-2 " />
            </div>
          </div>

        </div>

        <div className="col-span-4 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">Order summary</h4>
          <div>
            <img src={`https://ldxbxarkcxnvujovtmoo.supabase.co/storage/v1/object/public/prods/${_useProdStore.checkout[0].imgUrl}`} className="h-20 w-20" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div>
                <h5 className="text-gray-800 font-medium">{_useProdStore.checkout[0].name}</h5>
                <p className="text-sm text-gray-600">Qty: ${_useProdStore.checkout[0].qty}</p>
              </div>

              <p className="text-gray-800 font-medium">₹{_useProdStore.checkout[0].price}</p>
            </div>
          </div>

          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>Shipping</p>
            <p>Free</p>
          </div>

          <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">Total</p>
            <p>₹{_useProdStore.checkout[0].price}</p>
          </div>

          <button
            type="submit"
            className="block w-full my-2 py-3 px-4 text-center border bg-green-200  border-green-400 rounded-md">
            Place order with CoD
          </button>
          <button disabled
            className="block w-full my-2 py-3 px-4 text-center bg-gray-200 border border-red-400 rounded-md">
            Pay now & order  (Comming soon)
          </button>
        </div>

      </Form>
    </>
  )
}

export const action = async (actionData) => {
  console.log('actionData :: ', actionData);

  const formData = await actionData.request.formData();
  const values = Object.fromEntries(formData);
  console.log('values :: ', values);

  const dbRes = await addOrder(values)
  console.log('dbRes :: ', dbRes);

  return dbRes;

}