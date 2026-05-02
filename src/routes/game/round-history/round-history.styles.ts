import { css } from "@styled-system/css";

const focusRing = {
  boxShadow: "0 0 0 3px rgba(28, 28, 28, 0.18)",
  outline: "none",
};

export const styles = {
  historyButton: css({
    alignItems: "center",
    appearance: "none",
    background: "#ffffff",
    border: "2px solid #c9c7c1",
    borderRadius: "8px",
    color: "#202020",
    cursor: "pointer",
    display: "grid",
    fontSize: "1rem",
    fontWeight: "800",
    gap: "2",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    letterSpacing: "0",
    lineHeight: "1.2",
    minH: "3.6rem",
    p: "3",
    textAlign: "left",
    _focusVisible: focusRing,
    _hover: {
      background: "#f6f4ef",
    },
  }),
  actionIcon: css({
    h: "1.35rem",
    w: "1.35rem",
  }),
  chevronIcon: css({
    h: "1.45rem",
    transition: "transform 120ms ease",
    w: "1.45rem",
  }),
  chevronIconOpen: css({
    transform: "rotate(90deg)",
  }),
  historyPanel: css({
    display: "grid",
    gap: "3",
  }),
  sectionTitle: css({
    fontSize: "1.2rem",
    fontWeight: "800",
    letterSpacing: "0",
    lineHeight: "1.2",
    m: "0",
  }),
  historyEmpty: css({
    background: "#ffffff",
    border: "2px solid #c9c7c1",
    borderRadius: "8px",
    color: "#5a5a5a",
    fontSize: "0.95rem",
    lineHeight: "1.45",
    m: "0",
    p: "4",
  }),
  historyList: css({
    display: "grid",
    gap: "3",
    listStyle: "none",
    m: "0",
    p: "0",
  }),
  historyItem: css({
    background: "#ffffff",
    border: "2px solid #c9c7c1",
    borderRadius: "8px",
    display: "grid",
    gap: "3",
    p: "4",
  }),
  historyItemHeader: css({
    alignItems: "start",
    display: "grid",
    gap: "3",
    gridTemplateColumns: "minmax(0, 1fr) auto",
  }),
  historyRoundTitle: css({
    fontSize: "1.05rem",
    fontWeight: "800",
    lineHeight: "1.2",
    m: "0",
  }),
  historyRoundMeta: css({
    color: "#5a5a5a",
    fontSize: "0.9rem",
    fontWeight: "700",
    lineHeight: "1.2",
    m: "1 0 0",
  }),
  historyTotal: css({
    color: "#202020",
    fontSize: "0.95rem",
    fontWeight: "800",
    lineHeight: "1.2",
    m: "0",
    textAlign: "right",
  }),
  historyScores: css({
    display: "grid",
    gap: "2",
    m: "0",
  }),
  historyScore: css({
    alignItems: "center",
    display: "grid",
    fontSize: "0.95rem",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    lineHeight: "1.3",
    "& dt": {
      color: "#4d4d4d",
      fontWeight: "700",
      overflowWrap: "anywhere",
    },
    "& dd": {
      color: "#202020",
      fontWeight: "800",
      m: "0",
    },
  }),
};
