
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSubmit, useTransition } from "@remix-run/react";
import { useState } from "react";
import { useRef } from "react";
import { addUser, createUser } from "~/lib/auth.server";
// import { prisma } from "~/lib/supabase";

export default function Signup() {
  const submit = useSubmit();
  const transition = useTransition();
  const signupForm = useRef(null);
  const actionRes = useActionData();
  console.log('actionRes :: ', actionRes);
  // const formSubmitHandler = (event) => {
  //   event.preventDefault();
  //   const values = new FormData(signupForm.current);
  //   console.log('values ::: ', values);


  //   // submit(event.currentTarget, { replace: true });
  // }

  return (
    <>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Register for new cosutumer
          </p>
          {actionRes && !actionRes.status &&
            <p className="text-red-600 mb-6 text-sm">
              {actionRes.msg}
            </p>
          }
          <Form method="post" autoComplete="off" ref={signupForm} >
            <div className="space-y-2">
              <div>
                <label htmlFor="name" className="text-gray-600 mb-2 block">Full Name</label>
                <input type="text" name="name" id="name"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="fulan fulana" />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">Email address</label>
                <input type="email" name="email" id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com" />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
                <input type="password" name="password" id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******" />
              </div>
              <div>
                <label htmlFor="confirm" className="text-gray-600 mb-2 block">Confirm password</label>
                <input type="password" name="confirm" id="confirm"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******" />
              </div>
              <div className="mb-2" >
                <p>You are :</p>
                <div className="flex justify-evenly" >
                  <div>
                    <input type={'radio'} name='registerAs' value={'farmer'} id="registerAsFarmer" />
                    <label htmlFor="registerAsFarmer" className="mx-2" >Farmer</label>
                  </div>
                  <div>
                    <input type={'radio'} name='registerAs' value={'customer'} id="registerAsCustomer" />
                    <label htmlFor="registerAsCustomer" className="mx-2" >Customer</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <input type="checkbox" name="aggrement" id="aggrement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer">I have read and agree to the <a
                  href="#" className="text-primary">terms & conditions</a></label>
              </div>
            </div>
            <div className="mt-4">
              <button type="submit"
                className="block w-full py-2 text-center bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                {transition.state === "submitting" ? 'Creating...' : 'Create Your Account'} </button>
            </div>
          </Form>

          {/* <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div className="mt-4 flex gap-4">
            <a href="#"
              className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
            <a href="#"
              className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
          </div> */}

          <p className="mt-10 text-center text-gray-600">Already have account?
            <Link to={'/auth/signin'}
              className="text-primary font-semibold">Login now</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export const action = async (actionData) => {
  // console.log('actionData :: ', actionData);

  const formData = await actionData.request.formData();
  const values = Object.fromEntries(formData);
  console.log('values :: ', values);
  if (!values.name || !values.email || !values.password || !values.confirm || !values.registerAs || !values.aggrement) {
    return {
      status: false,
      msg: 'Please enter all the fields'
    }
  }

  if (values.password !== values.confirm) {
    return {
      status: false,
      msg: 'Passwords didnt match'
    }
  }

  const res = await createUser(values);

  if (!res.status) {
    return res
  }
  const resDb = await addUser(values, res.data)
  console.log('resDb :: ', resDb);
  if (!resDb.status) {
    return resDb
  }

  return redirect(`/${values.registerAs}/profile/${resDb.data.uid}`);
};
