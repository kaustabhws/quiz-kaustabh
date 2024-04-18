import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Score = ({ score }: { score: number }) => {
  const navigate = useNavigate();

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-400 underline text-center">
            Quiz Finished
          </AlertDialogTitle>
        </AlertDialogHeader>
        <h1 className="text-center text-3xl font-semibold">
          You Scored: {score}
        </h1>
        <div className="flex items-center gap-4 mx-auto">
          <Button variant="outline" onClick={() => navigate("/")}>
            Close
          </Button>
          <Button onClick={() => navigate("/customize")}>Start New</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Score;
