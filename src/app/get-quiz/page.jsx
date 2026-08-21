"use client"
import { useEffect, useState} from "react"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
const Page = () => {

    const [quiz, setQuiz ] = useState([]);
     const router = useRouter();
     const supabase = supabaseClient();

     useEffect(()=>{
        const fetchQuiz=async()=>{
            const response= await supabase.from("quiz").select("*")

            setQuiz(response.data || [])
        }
        fetchQuiz()
     },[])

    
    return (
        
            <div>{quiz?.map((item) => {
            return(
                <div key={item.id} onClick={()=>router.push(`/get-quiz/${item.id}`)}>{item.name}
                <Button>Play</Button>
                </div>
            )
        })}
           </div>
    
        

    )

}
export default Page;