import { useSearchParams, useNavigate } from "react-router-dom"
import { ChevronLeftIcon } from "lucide-react"

function TaskPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const title = searchParams.get("title")
    const description = searchParams.get("description")
    function onBackClick(){
        navigate(-1)
    }

    return (
    <div className="h-screen w-screen bg-slate-500 p-6">
    
        <div className="w-500px space-y-4 mx-auto">
        <div className="flex justify-center relative mb-6">
            <button onClick={onBackClick} className="absolute left-0 top-0 bottom-0 text-slate-100">
                <ChevronLeftIcon />
            </button>
            <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes da Tarefa
            </h1>
        </div>
        <div className="bg-slate-200 p-4 rounded-md">
            <h2 className="text-xl font-bold text-slate-600">{title}</h2>
            <p className="text-slate-600">{description}</p>
        </div>
       
        </div>
    </div>
    );
}

export default TaskPage