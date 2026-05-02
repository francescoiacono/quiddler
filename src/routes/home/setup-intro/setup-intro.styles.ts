import { css } from "@styled-system/css";

export const styles = {
  header: css({
    display: "grid",
    gap: "3",
  }),
  titleRow: css({
    alignItems: "center",
    display: "grid",
    gap: "3",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    minW: "0",
  }),
  headerIcon: css({
    alignItems: "center",
    border: "2px solid #343434",
    borderRadius: "8px",
    color: "#202020",
    display: "inline-flex",
    h: "3rem",
    justifyContent: "center",
    w: "3rem",
  }),
  cardsIcon: css({
    h: "1.65rem",
    w: "1.65rem",
  }),
  title: css({
    fontSize: { base: "1.85rem", sm: "2rem", md: "2.35rem" },
    fontWeight: "800",
    letterSpacing: "0",
    lineHeight: "1.05",
    m: "0",
    minW: "0",
  }),
  intro: css({
    color: "#5a5a5a",
    fontSize: "1rem",
    fontWeight: "650",
    lineHeight: "1.45",
    m: "0",
  }),
};
