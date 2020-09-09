import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import { Node, Editor, Transforms, Range, Point, createEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from "slate-history";

import "./RichTextEditor.scss";

const SHORTCUTS: { [shortcut: string]: string } = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

export interface RichTextEditorProps {
  onChange?: (value: any) => void;
  placeholder?: string;
  children?: any;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  placeholder = "Enter text",
  onChange,
  children,
  ...props
}) => {
  const [value, setValue] = useState<Node[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    []
  );

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <div className="RichTextEditor">
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue: any) => setValue(newValue)}
      >
        <Editable
          renderElement={renderElement}
          placeholder={placeholder}
          // onKeyDown={(event) => {
          //   if (event.key === "Enter" && !event.shiftKey) {
          //     event.preventDefault();
          //     console.log(editor.getFragment);
          //     // const newLine = {
          //     //   type: "paragraph",
          //     //   children: [
          //     //     {
          //     //       text: "",
          //     //     },
          //     //   ],
          //     // };
          //     // Transforms.insertNodes(editor, newLine);
          //   }
          // }}
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
};

const withShortcuts = (editor: Editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          { type },
          { match: (n) => Editor.isBlock(editor, n) }
        );

        if (type === "list-item") {
          const list = { type: "bulleted-list", children: [] } as any;
          Transforms.wrapNodes(editor, list, {
            match: (n) => n.type === "list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: "paragraph" });

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === "bulleted-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor as ReactEditor;
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

export default RichTextEditor;
