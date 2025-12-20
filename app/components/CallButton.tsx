import { Phone, PhoneOff } from "lucide-react";

interface CallButtonProps {
  type: "call" | "end";
  onClick?: () => void;
}

const CallButton = ({ type, onClick }: CallButtonProps) => {
  const isAccept = type === "call";

  return (
    <button
      onClick={onClick}
      className={`
        relative w-16 h-16 rounded-full flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        ${
          isAccept ? "call-button-accept animate-wiggle" : "call-button-decline"
        }
      `}
      aria-label={isAccept ? "Call" : "End Call"}
    >
      {isAccept ? (
        <Phone className="w-7 h-7 text-secondary-foreground" />
      ) : (
        <PhoneOff className="w-7 h-7 text-destructive-foreground" />
      )}
    </button>
  );
};

export default CallButton;
