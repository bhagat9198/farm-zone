import { PrismaClient } from "@prisma/client";
const _prismaClient = new PrismaClient()

export const getUserDetails = async (uid, uType) => {
  try {
    console.log(uid, uType);
    
    let user;
    if (uType === 'farmer') {
      user = await _prismaClient.farmer.findUnique({
        where: {
          uid: uid
        },
        select: {
          orders: true,
          products: true,
          created_at: true,
          email: true,
          id: true,
          name: true,
          uid: true
        }
      })

    } else {
      user = await _prismaClient.customer.findUnique({
        where: {
          uid: uid
        },
        select: {
          orders: true
        }
      })
    }
    console.log('user :: ', user);
    if(user && user.name) {
      return {
        status: true,
        data: user
      }
    }
    return {
      status: false,
      msg: 'No user found'
    }

  } catch (error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }
}