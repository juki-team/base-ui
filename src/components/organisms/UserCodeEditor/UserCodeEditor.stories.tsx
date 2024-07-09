import React from "react";
import { MockupJukiProvider } from "../../mockup";
import { UserCodeEditor as UserCodeEditorCmp } from "./index";

export default {
  component: UserCodeEditorCmp,
};

export const UserCodeEditor = () => {
  return (
    <MockupJukiProvider>
      <UserCodeEditorCmp
        languages={[{ value: "A", label: "A" }]}
        sourceStoreKey={"testing"}
        enableAddCustomSampleCases
      />
    </MockupJukiProvider>
  );
};
