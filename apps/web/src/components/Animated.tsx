import React, { EventHandler, FC, useState } from "react";

const Animated: FC<{ endpoint: string; onError?: () => void; className?: string; alt?: string }> = (props) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <img
        className={props.className}
        src={props.endpoint + (hovering ? ".gif" : ".webp")}
        onError={props.onError}
        alt={props.alt}
      />
    </div>
  );
};

export default Animated;
