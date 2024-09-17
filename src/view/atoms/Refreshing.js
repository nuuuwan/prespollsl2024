import { useState } from "react";
import { Time } from "../../nonview/base";
import { Box } from "@mui/material";

export default function Refreshing({ children, durationS }) {
  const [ut, setUT] = useState(Time.now().ut);

  setTimeout(() => {
    setUT(Time.now().ut);
    console.debug(`⌛ Refreshing ${ut}...`);
  }, durationS * 1_000);

  return <Box key={ut}>{children}</Box>;
}
