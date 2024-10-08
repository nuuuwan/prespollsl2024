import { Box, Typography } from "@mui/material";
import { Translate } from "../../../nonview";
import { PartyView } from "../..";
import Confidence from "./Confidence";
export default function InsightFirstPrefWinner({ winningPartyID }) {
  return (
    <Box>
      <Typography variant="h4">
        <PartyView partyID={winningPartyID} sx={{ fontSize: 20, mr: 1 }} />
        {Translate("wins")}. ✓
      </Typography>
      <Confidence />
    </Box>
  );
}
