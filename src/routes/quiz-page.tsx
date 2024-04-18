import { useOptions } from "@/components/options-provider";
import fetchData from "@/lib/data-fetcher";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Score from "@/components/score";

type question = {
  question: string;
  answers: {
    [key: string]: string | null;
  };
  correct_answer: string;
};

const QuizPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState<question[]>([]);
  const [question, setQuestion] = useState<question | null>(null);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const { category } = useParams();
  const { cat, diff } = useOptions();

  const getQuiz = async () => {
    setIsLoading(true);
    const fetchedData = await fetchData({
      endpoint: "questions",
      param: `category=${category}&difficulty=${diff}`,
    });
    setData(fetchedData);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  useEffect(() => {
    setQuestion(data[index] || null);
  }, [index, data]);

  const handleNextQuestion = () => {
    if (!selected) {
      toast.error("Please select an answer!");
      return;
    }
    setIndex((prevIndex) => prevIndex + 1);
    if (selected === question?.correct_answer) {
      toast.success("Correct Answer!");
      setScore((prevScore) => prevScore + 1);
    } else {
      toast.error("Wrong Answer!");
    }
  };

  const isLastQuestion = index === data.length - 1;

  const handleSubmit = () => {
    setQuizSubmitted(true);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center flex-col gap-1 px-10 text-center max-[360px]:px-3">
          <h1 className="capitalize font-semibold text-2xl">{category} Quiz</h1>
          <p className="dark:text-gray-400">
            Difficulty: {diff ? diff : "Any"}
          </p>
          <div className="flex flex-col justify-center items-center gap-5 border rounded-md px-6 py-3 backdrop-blur-sm">
            <div>
              {index + 1}
              <span>. </span>
              {question?.question}
            </div>
            <RadioGroup
              defaultValue="comfortable"
              className="flex flex-col gap-4 w-full"
              onValueChange={(value) => setSelected(value)}
            >
              {question?.answers &&
                Object.entries(question.answers).map(
                  ([key, value]) =>
                    value !== null && (
                      <div className="flex items-center space-x-2" key={key}>
                        <RadioGroupItem value={key} id={`r-${key}`} />
                        <Label htmlFor={`r-${key}`}>{value}</Label>
                      </div>
                    )
                )}
            </RadioGroup>
            {quizSubmitted ? (
              <Score score={score} />
            ) : isLastQuestion ? (
              <Button variant="outline" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button variant="outline" onClick={handleNextQuestion}>
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;