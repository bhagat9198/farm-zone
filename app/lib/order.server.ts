import { PrismaClient } from "@prisma/client";
import { UserImg } from "~/components/miscellaneous/img";
import { supabase } from "./supabase";

const _prismaClient = new PrismaClient()

export const addOrder = async(data) => {
  try {
    const order = await _prismaClient.order.create({
      data: {
        address: data.address, city: data.city, cost: data.cost, pin: data.pin, state: data.state, Customer: data.customerId,
        Farmer: data.farmId, Product: data.prodId, order_deliver_date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      
      }
    })
    console.log('order :: ', order);
    if(order) {
      return {
        status: true,
        data: order
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