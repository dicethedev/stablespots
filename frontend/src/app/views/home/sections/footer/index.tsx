import { TwitterXIcon, WarpcastIcon } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();

  const handleAdminLogin = () => {
    router.push("/login");
  };

  return (
    <footer className="w-full py-6 px-4 md:px-8 mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        {/* Left item */}
        <p className="text-sm text-[var(--desc-text-color)]">
          Powered by <b className="font-medium text-black">StableSpots</b>
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {/* Warpcast Icon */}
          <a
            href="https://warpcast.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Warpcast"
          >
            <WarpcastIcon />
          </a>

          {/* Twitter Icon */}
          <a
            href="https://twitter.com/usdcnearme"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <TwitterXIcon />
          </a>

          {/* Login Admin Button */}
          <Button
            size="sm"
            variant="link" // if your Button component supports link variant
            className="ml-2 !bg-transparent !text-[var(--direct-btn-color)] underline px-0 py-0 cursor-pointer"
            onClick={handleAdminLogin}
          >
            StableSpots Admin
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
