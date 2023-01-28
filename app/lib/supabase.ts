import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client';

let _supabase = null;

if (!_supabase) {
  // const supabaseUrl = process.env.PROJECT_URL;
  const supabaseUrl = 'https://ldxbxarkcxnvujovtmoo.supabase.co';
  // const supabaseKey = process.env.API_KEY
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeGJ4YXJrY3hudnVqb3Z0bW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ5MDAzNjcsImV4cCI6MTk5MDQ3NjM2N30.WQHmV6CKt_mokehnw7K5lwYgCM1eDSGRCAL5nCEOcU4"
  _supabase = createClient(supabaseUrl!, supabaseKey!)
}

export const supabase = _supabase;


// let _prismaClient = null;

// if (!_prismaClient) {
//   _prismaClient = new PrismaClient()
// }

// export const prisma = _prismaClient;