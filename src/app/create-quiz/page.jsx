"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { supabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"



const Page = () => {
    const supabase = supabaseClient();
      const router = useRouter();


    const [questions, setQuestions] = useState("")
    const [questionsOption, setQuestionsOption] = useState([
        {
            question: "",
            point: 1000,
            options: ["", "", "", ""],
            correctIndex: 2

        }
    ])
    const [quizName, setquizName] = useState("")



    const addQuestions = () => {
        setQuestionsOption([...questionsOption, {
            question: "",
            point: 1000,
            correctIndex: 2,
            options: ["", "", "", ""],
        }])
    }
  

    const updateQuestion = (qIndex, field, value) => {
        const uptadeQuestions = questionsOption.map((question, index) => {
            return index === qIndex ? { ...question, [field]: value } : question
        })
        setQuestionsOption(uptadeQuestions)

    }
    console.log(questionsOption)

    const updateOptions = (qIndex, oIndex, value) => {
        const updated = questionsOption.map((q, index) => {
            if(index === qIndex) {
                const newOptions = q.options.map((o, index) => {
                    return index === oIndex ? value: o
                })
                return {
                    ...q, options: newOptions,
                } 
            }else {
                return q;
            }
        })
        setQuestionsOption(updated)
    }

    const createQuiz = async () => {
        // console.log(quizName)
        // console.log(questionsOption)
       const response = await supabase.from("quiz").insert({
            name: quizName
        }).select("*");
        console.log(response, "create-quiz response ------")
        const quizId = response.data[0].id

        for (let i = 0; i < questionsOption.length; i++) {
            const response = await supabase.from("quizQuestions").insert({
                quizId: quizId,
                question: questionsOption[i].question,
                questionOrder: i + 1,
                point: questionsOption[i].point

             
            }).select("*")
            console.log(response, "ques res")
            const questionId = response.data[0].id

            for (let j = 0; j < questionsOption[i].options.length; j++) {
                const response = await supabase.from("questionOptions").insert({
                    questionId: questionId,
                    option: questionsOption[i].options[j],
                    isCorrect: questionsOption[i].correctIndex === j
                }).select("*")
                console.log(response, "options response")
            }
        }
 if(response.data !== null) {
            router.push("/get-quiz")
        }else{
            alert("again")
        }
    }




    return (
        <div className="mx-auto max-w-2xl space-y-6 p-6">
            <h1 className="text-2xl font-semibold">Create quiz</h1>

            <div className="space-y-2">
                <label className="text-sm font-medium">Quiz name</label>
                <Input
                    placeholder="My first quiz"
                    value={quizName}
                    onChange={(e) => setquizName(e.target.value)}

                />
            </div>

            {questionsOption.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium">Question {qIndex + 1}</h2>
                        {/* {questionsOption.length > 1 && (
                            <Button
                                variant="destructive"
                                size="sm"
                            // onClick={() => removeQuestion(qIndex)}
                            >
                                Remove
                            </Button>
                        )} */}
                    </div>

                    <Input
                        placeholder="What is the capital of Mongolia?"
                        value={q.question}
                        onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                    />

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Points</label>
                        <Input
                            type="number"
                            min="1"
                            className="w-24"
                            value={q.point}
                            onChange={(e) => updateQuestion(qIndex, 'point', e.target.value)}

                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Pick the correct answer
                        </p>
                        {q.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center gap-2">
                                <Input
                                    type="radio"
                                    checked={q.correctIndex === oIndex}
                                    onChange={(e) => updateQuestion(qIndex, 'correctIndex', oIndex)}
                                />
                                <Input
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={option}
                                    onChange= {(e) => updateOptions(qIndex, oIndex, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={addQuestions}>
                    Add question
                </Button>
                <Button variant="outline" onClick={createQuiz}>
                    Create quiz
                </Button>
            </div>

        </div>
    )




}
export default Page;


