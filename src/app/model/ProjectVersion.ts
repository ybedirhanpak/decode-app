import { SandpackFiles } from "@codesandbox/sandpack-react";

export interface ProjectVersion {
    id: string;
    index: number;
    files: SandpackFiles;
    date: string;
}
