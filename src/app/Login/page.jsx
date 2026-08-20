"use client"
import { Input } from "@/components/ui/input"
import { supabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const LoginPage = () => {
    const supabase = supabaseClient();
    
    const router = useRouter();
    const signIn = async () => {
        const response = await supabase.auth.signUp({
            email: "otgoo@gmail.com",
            password: "otgoo0099",
        })
        console.log(response, "sign up response ---")
        await supabase.from("users").insert({
          authId: response.data.user.id,
          username: username
        })
    }
    

     const LogIN = async()=> {
        const response = await supabase.auth.signInWithPassword({
            email: "otgoo@gmail.com",
            password: "otgoo0099",
        })
        if(response.data.user !== null) {
            router.push("/")
        }else{
            alert("burtglgui")
        }

        console.log(response, "log in response----")
    }

    return (
        <div> 
            <div className="max-w-sm mx-auto p-8 space-y-5 bg-white rounded-2xl shadow-md border border-gray-200">
  <div className="text-center space-y-1">
    <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
    <p className="text-sm text-gray-500">Sign in or create an account</p>
  </div>

  <div className="space-y-3">
    <Input
      placeholder="email"
      type="email"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />
    <Input
      placeholder="password"
      type="password"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  <div className="space-y-2">
    <Button
      onClick={LogIN}
      className="w-full py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800"
    >
      Log In
    </Button>
    <Button
      onClick={signIn}
      className="w-full py-2 rounded-lg bg-white text-black font-medium border border-gray-300 hover:bg-gray-50"
    >
      Sign Up
    </Button>
  </div>
</div>

        </div>
    )
}
export default LoginPage;