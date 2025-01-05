import { ProjectComponent } from "@/app/model/ProjectComponent";
import { useState } from "react";
import classNames from "classnames";

import Button from "../Button";

import styles from "./ComponentList.module.css";

interface Props {
    components: ProjectComponent[];
    activeComponent?: ProjectComponent;
    onComponentClick: (component: ProjectComponent) => void;
    onCreateComponent: (componentName: string) => void;
}

function ComponentList({
    components,
    activeComponent,
    onComponentClick,
    onCreateComponent,
}: Props) {
    const [isCreating, setIsCreating] = useState(false);

    function handleCreateButtonClick() {
        setIsCreating(true);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            const value = (event.target as HTMLInputElement).value;
            if (!value) {
                setIsCreating(false);
                return;
            }

            // If the initial character is lowercase, capitalize it
            const componentName =
                value.charAt(0).toUpperCase() + value.slice(1);

            onCreateComponent(componentName);
            setIsCreating(false);
        } else if (event.key === "Escape") {
            setIsCreating(false);
        }
    }

    function renderComponentCard(component: ProjectComponent) {
        const isActive = activeComponent?.id === component.id;

        return (
            <div
                key={component.id}
                className={classNames(styles.componentCard, {
                    [styles.active]: isActive,
                })}
                onClick={() => onComponentClick(component)}
            >
                <span>{component.name}</span>
            </div>
        );
    }

    function renderComponentList() {
        return components.map(renderComponentCard);
    }

    return (
        <div className={styles.componentList}>
            <Button onClick={handleCreateButtonClick}>
                Create new component
            </Button>
            {renderComponentList()}
            {isCreating && (
                <input
                    className={styles.createInput}
                    autoFocus
                    onKeyDown={handleKeyDown}
                />
            )}
        </div>
    );
}

export default ComponentList;
