import { createContext, useContext } from "react";

export const NavigableFocusContext = createContext<boolean | null>(null);

export const useNavigableFocus = () => {
	const context = useContext(NavigableFocusContext);
	if (context === null) {
		// return false;
		throw new Error("useNavigableFocus must be used within a NavigableFocusContext");
	}
	return context;
};
