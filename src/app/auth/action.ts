'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard/home')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if(password !== confirmPassword){
    redirect('/error')
  }

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  const { error : create_doctor_error } = await supabase
  .from("doctors")
  .insert({ email: data.email,password : data.password });

  if (create_doctor_error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function Logout(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  } 
    
    redirect('/auth/login');
  }
