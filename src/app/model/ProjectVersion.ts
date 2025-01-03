import { SandpackFiles } from "@codesandbox/sandpack-react";

export interface ProjectVersion {
    id: string;
    files: SandpackFiles;
    date: string;
}
