"use client"
import { supabaseClient } from "@/lib/supabase-client"
import { useEffect, useState} from "react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { Input } from "@/components/ui/input"

const Page = () => {
     const [questions, setQuestions] = useState([])
    const supabase = supabaseClient();
    const params = useParams();
    console.log(params, 'navbar')
       
    const quizId = params.quizId

    useEffect ( () => {
        if(quizId){
            const fetchQuiz = async() => {
              
const response = await supabase
  .from('quizQuestions')
  .select('*, questionOptions(*)');

console.log("Бүх дата:", response.data);
console.log(response)
            setQuestions(response.data);
            }
            fetchQuiz();

        }
    },[quizId]);

    const updateQuestion = (qIndex, field, value) => {
        const updatedQuestions = questions.map((question, index) => {
            return index === qIndex ? { ...question, [field]: value } : question
        })
        setQuestions(updatedQuestions)

    }
    return(
                 <div> {questions?.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium">Question {qIndex + 1}</h2>
                     
                    </div>

                    <Input
                        placeholder="What is the capital of Mongolia?"
                        value={q.question}
                        readOnly={true}
                        
                    />

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Points</label>
                        <Input
                            type="number"
                            min="1"
                            className="w-24"
                            value={q.point}
                            readOnly={true}
                           

                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Pick the correct answer
                        </p>
                        {q.questionOptions?.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    checked={q.correctIndex === oIndex}
                                     onChange={(e) => updateQuestion(qIndex, 'correctIndex', oIndex)}
                                />
                                   
                                
                                <Input
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={option.option}
                                    readOnly={true}
                                    
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Button>Check Answers</Button>

</div> 
    )

}
export default Page;



