import { IonToast } from "@ionic/react";
import { ToastBoxProps } from "../../interfaces/uiInterface";


const ToastBox: React.FC<ToastBoxProps> = ({
    trigger,
    message,
    duration = 2000,
    color = "primary",
    position = "bottom",
    icon,
}) => {
    return (
        <IonToast
            trigger={trigger}
            message={message}
            duration={duration}
            color={color}
            position={position}
            icon={icon}
        />
    );
};

export default ToastBox;