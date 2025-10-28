import { IonAlert } from "@ionic/react";
import { AlertBoxProps } from "../../interfaces/uiInterface";

const AlertBox: React.FC<AlertBoxProps> = ({
    trigger,
    header = "Alert",
    message,
    confirmText = "OK",
    cancelText,
    onConfirm,
    onCancel,
}) => {
    return (
        <IonAlert
            trigger={trigger}
            header={header}
            message={message}
            buttons={[
                ...(cancelText
                    ? [
                        {
                            text: cancelText,
                            role: "cancel",
                            handler: onCancel,
                        },
                    ]
                    : []),
                {
                    text: confirmText,
                    handler: onConfirm,
                },
            ]}
        />
    );
};

export default AlertBox;