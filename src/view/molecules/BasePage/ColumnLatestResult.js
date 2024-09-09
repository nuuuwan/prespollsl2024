import { Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";
import { ResultSingleView, PDSelector, BellwetherView } from "..";
import CustomStack from "./CustomStack";
import { useDataContext } from "../../../nonview/core/DataProvider";

export default function ColumnLatestResult() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const activePDID = electionDisplay.finalPDID;
  const color = electionDisplay.getResult(activePDID).winningPartyColor;

  return (
    <CustomStack>
      <Typography variant="body1" color={color}>
        {Translate("Latest Result")} ({electionDisplay.nResults})
      </Typography>
      <PDSelector activePDID={activePDID} />
      <ResultSingleView entID={activePDID} />
      <BellwetherView />
    </CustomStack>
  );
}
