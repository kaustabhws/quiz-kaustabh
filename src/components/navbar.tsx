import { useLogin } from "./login-provider";
import { ModeToggle } from "./mode-toggle";
import UserProfile from "./ui/user-profile";

const Navbar = () => {
  const { status } = useLogin();

  return (
    <header className="h-14 w-full px-5 py-2 border-b absolute z-10 top-0 left-0 bg-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 mx-auto">
          <h1 className="text-3xl text-center font-semibold max-[330px]:text-xl">
            Quizer Pro
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {status === "true" && <UserProfile />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
