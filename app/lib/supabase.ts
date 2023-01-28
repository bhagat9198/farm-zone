import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client';

let _supabase = null;

if (!_supabase) {
  const supabaseUrl = process.env.PROJECT_URL;
  const supabaseKey = process.env.API_KEY
  _supabase = createClient(supabaseUrl!, supabaseKey!)
}

export const supabase = _supabase;


let _prismaClient = null;

if (!_prismaClient) {
  _prismaClient = new PrismaClient()
}

export const prisma = _prismaClient;