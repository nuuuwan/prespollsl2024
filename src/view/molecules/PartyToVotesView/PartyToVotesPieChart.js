import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Party } from "../../../nonview/core";
import { Format } from "../../../nonview/base";

import { STYLE } from "../../../nonview/constants";
import { Box } from "@mui/material";

export default function PartyToVotesPieChart({ partyToVotes }) {
  const data = Object.entries(partyToVotes.partyToVotesSortedOthered).map(
    function ([partyID, votes]) {
      const party = Party.fromID(partyID);
      return {
        id: partyID,
        value: votes / partyToVotes.totalVotes,
        label: partyID,
        color: party.color || "#888",
      };
    }
  );

  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => Format.percentVotes(item.value),
            arcLabelMinAngle: 60,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: "200%",
            fontFamily: STYLE.FONT_FAMILY,
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        width={320}
        height={320}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
    </Box>
  );
}
