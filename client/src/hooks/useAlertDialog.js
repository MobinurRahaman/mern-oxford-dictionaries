import { useState } from "react";
import AlertDialog from "../components/AlertDialog";

export const useAlertDialog = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    desc: "",
  });

  const showAlert = (title, desc) => {
    setAlertData({ title, desc });
    setAlertOpen(true);
  };

  const AlertDialogComponent = () => (
    <AlertDialog
      isOpen={alertOpen}
      setOpen={setAlertOpen}
      title={alertData.title}
      desc={alertData.desc}
    />
  );

  return [showAlert, AlertDialogComponent];
};
