"use client";

import {
    SandpackProvider,
    SandpackLayout,
    SandpackFileExplorer,
    SandpackCodeEditor,
    SandpackPreview
} from "@codesandbox/sandpack-react";

export default function CodePreview() {
    const files = {};

    return (
        <SandpackProvider files={files} theme="dark" template="react">
            <SandpackLayout>
                <SandpackFileExplorer />
                <SandpackCodeEditor closableTabs showTabs />
                <SandpackPreview />
            </SandpackLayout>
        </SandpackProvider>
    );
}
