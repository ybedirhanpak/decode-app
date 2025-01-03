import classNames from "classnames";

import { ProjectVersion } from "@/app/model/ProjectVersion";
import { formatDate } from "@/app/utils/format";

import styles from "./VersionsPanel.module.css";

interface Props {
    versions: ProjectVersion[];
    activeVersion: ProjectVersion;
    onVersionClick: (version: ProjectVersion) => void;
}

function VersionsPanel({ versions, activeVersion, onVersionClick }: Props) {
    function renderVersionCard(version: ProjectVersion) {
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

    return (
        <div className={styles.versionsPanel}>
            {versions.map(renderVersionCard)}
        </div>
    );
}

export default VersionsPanel;
