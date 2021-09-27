import { AccordionProps } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";

interface AccordionWrapperProps extends AccordionProps {
  readonly expandedPanel: string[];
  children({
    expanded,
    onChange,
  }: {
    expanded: string[];
    onChange(obj: { panel: string; isExpanded: boolean }): void;
  }): ReactElement;
}

const AccordionWrapper: React.FC<AccordionWrapperProps> = ({
  children,
  expandedPanel,
}) => {
  const [panelExpanded, setPanelExpanded] = useState<string[]>(expandedPanel);

  useEffect(() => {
    if (expandedPanel && expandedPanel.length) {
      setPanelExpanded(expandedPanel);
    }
  }, [expandedPanel]);

  const onChange = (obj: { panel: string; isExpanded: boolean }) => {
    const { isExpanded, panel } = obj;
    if (isExpanded) {
      setPanelExpanded([...panelExpanded, panel]);
    } else {
      setPanelExpanded(panelExpanded.filter((item) => item !== panel));
    }
  };

  return (
    <>
      {children({
        expanded: panelExpanded,
        onChange,
      })}
    </>
  );
};

export default AccordionWrapper;
