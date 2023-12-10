import { memo } from "react";
import CrawlingBug from "./CrawlingBug";
import { blue } from "../../../styles/colors";

const CrawlingBugs = memo(({ num = 8 }) => {
  return Array(num)
    .fill(1)
    .map((_, i) => (
      <CrawlingBug
        key={i}
        color={blue.hex}
      />
    ));
});

export default CrawlingBugs;
