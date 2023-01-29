
import { PrismaClient } from "@prisma/client";
import { UserImg } from "~/components/miscellaneous/img";
import { supabase } from "./supabase";

const _prismaClient = new PrismaClient()

export const createUser = async (data) => {
  const { email, password } = data;
  try {
    const res = await supabase.auth.signUp({ email, password });
    console.log('res ::', res);

    return {
      status: true,
      data: res
    }
  } catch (error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }

}

export const addUser = async (userValues, authRes) => {
  try {
    console.log('authRes :: ', authRes);

    let user;
    if (userValues.registerAs === 'farmer') {
      user = await _prismaClient.farmer.create({
        data: {
          email: userValues.email,
          name: userValues.name,
          uid: authRes.data.user.id
        }
      })
    } else {
      user = await _prismaClient.customer.create({
        data: {
          email: userValues.email,
          name: userValues.name,
          uid: authRes.data.user.id,
        }
      })
    }
    console.log('user :: ', user);

    return {
      status: true,
      data: user
    }
  } catch (error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }
}

export const signinUser = async (data) => {
  const { email, password } = data;

  try {
    console.log('email, password :: ', email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log('data, error :: ', data, error);
    
    if (error) {
      return {
        status: false, msg: error.message
      }
    } else {
      return {
        status: true, data: data
      }
    }

  } catch (error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.msg
    }

  }
}