import classNames from "classnames";

import { ProjectComponentVersion } from "@/app/model/ProjectComponent";
import { formatDate } from "@/app/utils/format";

import styles from "./VersionsPanel.module.css";

interface Props {
    versions: ProjectComponentVersion[];
    activeVersion: ProjectComponentVersion;
    onVersionClick: (version: ProjectComponentVersion) => void;
}

function VersionsPanel({ versions, activeVersion, onVersionClick }: Props) {
    function renderVersionCard(version: ProjectComponentVersion) {
        const isActive = version.id === activeVersion.id;

        return (
            <div
                key={version.id}
                className={classNames(styles.versionCard, {
                    [styles.active]: isActive,
                })}
                onClick={() => onVersionClick(version)}
            >
                <span className={styles.badge}>v{version.index}</span>
                <span className={styles.date}>{formatDate(version.date)}</span>
            </div>
        );
    }

    const sortedVersions = versions.sort((a, b) => a.index - b.index);

    return (
        <div className={styles.versionsPanel}>
            {sortedVersions.map(renderVersionCard)}
        </div>
    );
}

export default VersionsPanel;
