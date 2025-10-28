import React, { createContext, useContext, useEffect, useState } from 'react';

interface InstallPromptContextType {
    deferredPrompt: any;
    canInstall: boolean;
    triggerInstall: () => Promise<void>;
}

const InstallPromptContext = createContext<InstallPromptContextType>({
    deferredPrompt: null,
    canInstall: false,
    triggerInstall: async () => { },
});

export const InstallPromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setCanInstall(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const triggerInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') console.log('User accepted install');
        else console.log('User dismissed install');
        setDeferredPrompt(null);
        setCanInstall(false);
    };

    return (
        <InstallPromptContext.Provider value={{ deferredPrompt, canInstall, triggerInstall }}>
            {children}
        </InstallPromptContext.Provider>
    );
};

export const useInstallPrompt = () => useContext(InstallPromptContext);
