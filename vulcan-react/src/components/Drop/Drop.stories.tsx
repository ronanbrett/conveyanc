import React, { useEffect, useRef, useState } from "react";

import Drop from "./Drop";

import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Drop",
  decorators: [],
  component: Drop,
};

const SimpleDrop = () => {
  const targetRef = useRef();

  const [, setShowDrop] = useState(false);
  useEffect(() => {
    setShowDrop(true);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          ref={targetRef}
        >
          Target
        </div>
        {targetRef.current && (
          <Drop
            align={{ top: "bottom", left: "left" }}
            target={targetRef.current}
          >
            <div style={{ padding: "24px" }}>Drop Contents</div>
          </Drop>
        )}
      </div>
    </div>
  );
};

export const Default = (props) => <SimpleDrop />;
