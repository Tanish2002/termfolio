import { Toaster } from "react-hot-toast";

export function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--tokyo-night-background)",
          color: "var(--tokyo-night-foreground)",
          border: "1px solid var(--tokyo-night-blue)",
          padding: "16px",
          minWidth: "300px"
        },
        duration: 5000
      }}
      containerStyle={{
        marginTop: "20px",
        marginRight: "15px"
      }}
    />
  );
}

export default CustomToaster;
