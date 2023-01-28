import { prisma, supabase } from "./supabase";

export const createUser = async(data) => {
  const {email, password} = data;
  try {
    const res = await supabase.auth.signUp({ email, password });
    console.log('res ::', res);
    
    return {
      status: true,
      data: res
    }
  } catch(error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }

}

export const addUser = async(inputData, authData) => {
  try {
    let user = await prisma
    console.log('user :: ', user);
    return user;
  } catch(error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }
}