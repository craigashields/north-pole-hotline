import { memo } from "react";

interface SnowflakeProps {
  style: React.CSSProperties;
}

const Snowflake = memo(({ style }: SnowflakeProps) => {
  return (
    <div
      className="absolute text-snow/40 pointer-events-none animate-snowfall"
      style={style}
    >
      ❄
    </div>
  );
});

Snowflake.displayName = "Snowflake";

export default Snowflake;
