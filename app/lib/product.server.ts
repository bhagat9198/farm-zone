import { PrismaClient } from "@prisma/client";
import { supabase } from "./supabase";

const _prismaClient = new PrismaClient()

export const addProduct = async (data) => {
  try {
    const prod = await _prismaClient.farmer.update({
      where: {
        uid: data.user_uid,
      },
      data: {
        products: {
          create: {
            imgUrl: data.fileName,
            name: data.name,
            price: data.price,
            brand_name: data.brand,
            inStock: data.inStock,
            mrp: data.mrp,
            description: data.description
          }
        }
      }
    })

    // const prod = await _prismaClient.product.create({
    //   data: {
    //     description: data.description,

    //     farmerId: data.user_uid
    //   }
    // })
    console.log('prod :: ', prod);
    if (!prod) {
      return {
        status: false,
        ms: 'Unable to craete product'
      }
    }

    return {
      status: true,
      data: prod
    }

  } catch (error) {
    return {
      status: false,
      msg: error.message
    }
  }
}

export const getAllFarmerProds = async (uid) => {
  try {
    const prods = await _prismaClient.product.findMany({
      where: {
        Farmer: {
          uid: uid
        }
      }
    })
    console.log('prods :: ', prods);
    if (prods) {
      return {
        status: true,
        data: prods
      }
    } else {
      return {
        status: true,
        msg: 'Something went wrong'
      }
    }

  } catch (error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }

  }
}

export const getFilteredProds = async (searchStr) => {
  try {
    const prods = await _prismaClient.product.findMany({
      where: {
        name: { contains: searchStr }
      },
      select: {
        brand_name: true,
        created_at: true, description: true, Farmer: true, farmerId: true, id: true, imgUrl: true, inStock: true, mrp: true,
        name: true, price: true, uid: true, updated_at: true

      }
    })
    console.log('getFilteredProds :: prods :: ', prods);
    if (prods) {
      return {
        status: true,
        data: prods
      }
    }
    return {
      status: false,
      msg: 'Something went wrong'
    }

  } catch (error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }
}

export const getProduct = async(pid) => {
  try {
    const prod = await _prismaClient.product.findMany({
      where: {
        uid: pid
      },
      select: {
        brand_name: true, created_at: true, description: true, Farmer: true, farmerId: true, id: true, imgUrl: true, inStock: true, mrp: true,
        name: true, price: true, uid: true, updated_at: true
      }
    })
    console.log('prod :: ', prod);
    if(prod) {
      return {
        status: true,
        data: prod
      }
    }
    return {
      status: false,
      msg: 'Something went wrong'
    }
  } catch(error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
    
  }
}

export const deleteProd = async(uid) => {

  try {
    const prod = await _prismaClient.product.delete({
      where: {
        uid: uid
      }
    })
  } catch(error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }
}

export const editProd = async(data) => {
  try {
    const prod = await _prismaClient.product.update({
      where: {
        uid: data.uid
      },
      data: {
        brand_name: data.brand, description: data.description, imgUrl: data.fileName, inStock: data.inStock, mrp: data.mrp, 
        price: data.price, name: data.name
      }
    })
    if(prod) {
      return {
        status: true, data:prod
      }
    }
    return {
      status: false, msg: 'Something went wrong'
    }
  } catch(error) {
    console.log('error :: ', error);
    return {
      status: false,
      msg: error.message
    }
  }
}