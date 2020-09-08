import React from "react";
import { IconButton } from "../index";
import DropButton from "./DropButton";

const DropContent = ({ onClose }) => (
  <div style={{ padding: "16px" }}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Heading</h3>

      <IconButton onClick={onClose} icon="close"></IconButton>
    </div>
    <p>Content</p>
  </div>
);

const SimpleDropButton = () => {
  const [open, setOpen] = React.useState<boolean>();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
        <DropButton
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          dropContent={<DropContent onClose={onClose} />}
          dropProps={{ align: { top: "bottom", right: "left" } }}
        >
          Open
        </DropButton>
      </div>
    </div>
  );
};

export default {
  title: "Components/DropButton",
  decorators: [],
  component: DropButton,
};

export const Default = (props) => <SimpleDropButton />;

export const IsOPen = (props) => <SimpleDropButton open={true} />;
