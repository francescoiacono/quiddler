import { css } from "@styled-system/css";

export const styles = {
  header: css({
    display: "grid",
    gap: "3",
  }),
  title: css({
    fontSize: { base: "2.35rem", sm: "2.7rem", md: "3rem" },
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
