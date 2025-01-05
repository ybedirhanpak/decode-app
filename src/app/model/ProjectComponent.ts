import { GeneratedComponentCode } from "./Code";

interface ProjectComponent {
    id: string;
    name: string;
    versions: ProjectComponentVersion[];
}

interface ProjectComponentVersion {
    id: string;
    index: number;
    date: string;
    code: GeneratedComponentCode;
}

export type { ProjectComponent, ProjectComponentVersion };
