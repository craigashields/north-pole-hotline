import Image from "next/image";
import santaAvatar from "../assets/santa.png";

const CallerAvatar = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse ring */}
      <div className="absolute w-48 h-48 rounded-full bg-christmas-red/20 animate-pulse-ring-outer" />

      {/* Inner pulse ring */}
      <div className="absolute w-40 h-40 rounded-full bg-christmas-red/30 animate-pulse-ring" />

      {/* Glow effect */}
      <div className="absolute w-36 h-36 rounded-full bg-christmas-gold/30 animate-glow-pulse" />

      {/* Avatar container */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden avatar-glow animate-float">
        {/* Border ring */}
        <div className="absolute inset-0 rounded-full border-4 border-christmas-gold/60" />

        {/* Avatar image */}
        <Image
          src={santaAvatar}
          alt="Santa Claus"
          fill
          sizes="128px"
          className="object-cover"
          priority
        />

        {/* Shimmer overlay */}
        <div className="absolute inset-0 animate-shimmer" />
      </div>
    </div>
  );
};

export default CallerAvatar;
