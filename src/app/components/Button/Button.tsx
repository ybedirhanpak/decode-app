import classNames from "classnames";
import styles from "./Button.module.css";

interface Props {
    className?: string;
    variant?: "primary" | "secondary" | "accent";
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

function Button({
    className,
    variant = "primary",
    disabled = false,
    children,
    onClick,
}: Props) {
    return (
        <button
            className={classNames(styles.button, styles[variant], className, {
                [styles.disabled]: disabled,
            })}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.content}>{children}</span>
        </button>
    );
}

export default Button;
