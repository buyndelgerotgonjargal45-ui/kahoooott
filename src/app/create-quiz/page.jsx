"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { supabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"



const Page = () => {
    const supabase = supabaseClient();


    const [questions, setQuestions] = useState("")
    const [questionsOption, setQuestionsOption] = useState([
        {
            question: "",
            point: 1000,
            options: ["", "", "", ""],
            correctIndex: 2

        }
    ])



    const addQuestions = () => {
        setQuestionsOption([...questionsOption, {
            question: "",
            point: 1000,
            correctIndex: 2,
            options: ["", "", "", ""],
        }])
    }

    const updateQuestion = (qIndex, field, value) => {
        const a = questionsOption.map((question, index) => {
            return index === qIndex ? { ...question, [field]: value } : question
        })
        setQuestions(a)

    }




    return (
        <div className="mx-auto max-w-2xl space-y-6 p-6">
            <h1 className="text-2xl font-semibold">Create quiz</h1>

            <div className="space-y-2">
                <label className="text-sm font-medium">Quiz name</label>
                <Input
                    placeholder="My first quiz"
                />
            </div>

            {questionsOption.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-medium">Question {qIndex + 1}</h2>
                        {questionsOption.length > 1 && (
                            <Button
                                variant="destructive"
                                size="sm"
                            // onClick={() => removeQuestion(qIndex)}
                            >
                                Remove
                            </Button>
                        )}
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
            </div>

        </div>
    )




}
export default Page


