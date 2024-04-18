import { useState } from "react";
import { Button } from "./ui/button";
import LoginPage from "./login/login";
import { useLogin } from "./login-provider";

const WelcomePage = () => {
  const [open, setOpen] = useState(false);

  const { status } = useLogin();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full">
        <div className="px-10 flex items-center justify-around max-[930px]:px-0 max-[930px]:flex-col-reverse ">
          <div className="flex-1">
            {status === "true" ? (
              <div className="flex flex-col justify-center gap-5 max-w-[80%] ml-auto max-[930px]:max-w-full max-[930px]:text-center max-[930px]:px-2">
                <h1 className="text-4xl font-semibold">
                  Explore Variety of Questions
                </h1>
                <p className="dark:text-gray-400">
                  Discover a platform akin to a knowledge testing hub where you
                  can engage in quizzes and embed them seamlessly into your
                  website.
                </p>
                <a href="/customize">
                  <Button className="max-w-fit max-[930px]:mx-auto">
                    Start A Quiz
                  </Button>
                </a>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-5 max-w-[80%] ml-auto max-[930px]:max-w-full max-[930px]:text-center max-[930px]:px-2">
                <h1 className="text-4xl font-semibold">
                  Explore Variety of Questions
                </h1>
                <p className="dark:text-gray-400">
                  Discover a platform akin to a knowledge testing hub where you
                  can engage in quizzes and embed them seamlessly into your
                  website.
                </p>
                <Button
                  onClick={() => setOpen(true)}
                  className="max-w-fit max-[930px]:mx-auto"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
          {open && <LoginPage open={open} setOpen={setOpen} />}
          <div className="flex-1 flex justify-center">
            <img src="/hero.svg" alt="hero" className="w-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
