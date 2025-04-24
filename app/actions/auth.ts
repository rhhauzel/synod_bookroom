"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData){
    const supabase = await createClient();

    const credentials = {
        displayname: formData.get('displayname') as string,
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        phone: formData.get('mobile') as string,
    }

    const { error, data } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
            data: {
                displayname: credentials.displayname,
                username: credentials.username,
                phone: credentials.phone,
            }
        }
    })

    if (error){
        return {
            status: error?.message,
            user: null,
        }
    }else if(data?.user?.identities?.length === 0){
        return {
            status: "User with email address already exists",
            user: null,
        }
    }

    revalidatePath("/", "layout")
    return {
        status: "success",
        user: data.user,
    }
}

export async function signIn(formData: FormData){
    const supabase = await createClient();

    const credentials = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error, data} = await supabase.auth.signInWithPassword(credentials)

    if(error){
        return {
            status: error?.message,
            user: null,
        }
    }

    //TODO: Create a user instance in tm_user_profiles table

    revalidatePath("/", "layout")
    return {
        status: "success",
        user: data.user,
    }
}

export async function signOut() {
    const supabase = await createClient()
    
    const {error}=await supabase.auth.signOut();

    if(error){
        redirect('/error')
    }

    revalidatePath("/", "layout")
    redirect('/login')
}

export async function getUserData(){
    const supabase = await createClient()

    const {error,data}=await supabase.auth.getUser()

    if(error){
        return {
            status: error?.message,
            user: null,
        }
    }

    //TODO: Create a user instance in tm_user_profiles table
    return {
        status: "success",
        user: data.user,
    }
}