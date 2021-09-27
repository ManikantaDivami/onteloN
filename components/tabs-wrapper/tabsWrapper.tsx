import React, { useEffect } from "react";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";
import Tab, { TabProps } from "@material-ui/core/Tab";

interface TabWrapperProps extends TabProps {
  readonly key: string;
  TabItemWrapper: React.FC<{ isActive: boolean }>;
}
interface TabComponentProps extends TabsProps {
  readonly tabHeaders: ReadonlyArray<TabWrapperProps>;
  activeTabValue: number;
  onTabChange(activeTab: number): void;
}
const TabsWrapper: React.FC<TabComponentProps> = (props) => {
  const { tabHeaders, activeTabValue, onTabChange, ...rest } = props;
  var [value, setValue] = React.useState(activeTabValue);
  useEffect(() => {
    setValue(activeTabValue);
  }, [activeTabValue]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <div className="tab-wrapper">
      <Tabs data-testid="tabs" {...rest} value={value} onChange={handleChange}>
        {tabHeaders.map((child, i: number) => {
          const { key, TabItemWrapper, ...childRest } = child;
          return (
            <Tab
              {...childRest}
              key={key}
              label={<TabItemWrapper isActive={value === i} />}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default TabsWrapper;
