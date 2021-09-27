import { AccordionSummary, AccordionSummaryProps } from "@material-ui/core";
import React from "react";
import minus from "../../public/images/svgs/minus.svg";
import plus from "../../public/images/svgs/plus.svg";
import Image from "next/image";
import styles from "./summaryWrapper.module.scss";

interface SummaryWrapperProps extends AccordionSummaryProps {
  readonly Summary: React.FC;
  readonly expanded: boolean;
}
const SummaryWrapper: React.FC<SummaryWrapperProps> = ({
  Summary,
  expanded,
  className,
  ...rest
}) => {
  return (
    <AccordionSummary
      {...rest}
      className={
        className
          ? `${className} ${styles.accordionHeader}`
          : styles.accordionHeader
      }
      expandIcon={
        expanded ? (
          <Image src={minus} alt="expand icon" />
        ) : (
          <Image src={plus} alt="expand icon" />
        )
      }
    >
      <Summary />
    </AccordionSummary>
  );
};

export default SummaryWrapper;
