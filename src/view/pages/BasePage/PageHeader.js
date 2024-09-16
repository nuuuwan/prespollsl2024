import { Box, Stack } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import {
  ElectionSelector,
  LanguageSelector,
  RefreshButton,
} from "../../../view/atoms";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    padding: 1,
    margin: 0,
    color: "white",
    borderBottom: "1px solid #eee",
  },
};

export default function PageHeader() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const backgroundColor = electionProjected.color;
  return (
    <Box sx={Object.assign({ backgroundColor }, STYLE_PAGE_HEADER.SELECTOR)}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="center"
        alignContent="center"
      >
        <ElectionSelector colorElection={electionProjected} />
        <LanguageSelector />
        <RefreshButton />
      </Stack>
    </Box>
  );
}
