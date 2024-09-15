import { Box, Grid2, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { Bellwether } from "../../nonview/core";
import { ArrayX } from "../../nonview/base";

function RegionResultListViewGroup({ title, entIDList }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  if (!entIDList) {
    return null;
  }

  const { electionDisplay } = data;
  const resultLK = electionDisplay.resultIdx["LK"];
  const winnerPartyID = resultLK.winningPartyID;

  return (
    <Box>
      <Typography variant="h3">{title}</Typography>
      <Grid2
        container
        spacing={1}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
      >
        {ArrayX.sort(entIDList, function (entID) {
          const result = electionDisplay.resultIdx[entID];
          if (!result) {
            return 0;
          }
          const partyToVotes = result.partyToVotes;
          return -partyToVotes.partyToPVotesSorted[winnerPartyID];
        }).map(function (entID) {
          return (
            <Grid2
              xs={12}
              md={12}
              xl={12}
              key={entID}
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <CumResultsView entID={entID} />
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
}

export default function RegionResultListView() {
  const data = useDataContext();

  if (!data) {
    return null;
  }
  const { provinceIdx, edIdx, pdIdx, ezIdx, elections, electionDisplay } = data;

  const infoList = Bellwether.getBestBellwetherInfoList(
    elections,
    electionDisplay,
    pdIdx
  );

  const N_DISPLAY = 10;
  const bellwetherEntIDList = infoList
    .filter(function (info) {
      return (
        info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
      );
    })
    .slice(0, N_DISPLAY)
    .map((x) => x.entID);

  const pdResultList = electionDisplay.pdResultList;
  const nAll = electionDisplay.pdResultList.length;
  const latestResults = pdResultList
    .splice(nAll - N_DISPLAY, nAll)
    .reverse()
    .map((x) => x.entID);


  const groupToEntIDList = {
    "Island": ["LK"],
    "Ethnicity": Object.keys(ezIdx),
    "Provinces": Object.keys(provinceIdx),
    "Electoral Districts": Object.keys(edIdx),
    "Historical Bellwethers": bellwetherEntIDList,
    "Latest Results": latestResults,
  };
  

  return (
    <Stack direction="column" alignItems="center" gap={5}>
      
{Object.entries(groupToEntIDList).map(function ([title, entIDList]) {
        return (
          <RegionResultListViewGroup
            key={title}
            title={title}
            entIDList={entIDList}
          />
);})}

    </Stack>
  );
}
