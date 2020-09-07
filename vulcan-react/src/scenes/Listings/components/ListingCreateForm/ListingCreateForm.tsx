import {
  MultiTierDropdown,
  MultiTierDropdownItem,
  MultiTierDropdownOption,
} from "@components";
import { PropertyInfo } from "@core/api/graphql";
import React, { FC } from "react";

import styles from "./ListingCreateForm.module.scss";

interface ListingCreateFormProps {
  fieldData?: PropertyInfo;
  children?: any;
}

const ListingCreateForm: FC<ListingCreateFormProps> = ({
  fieldData,
  ...props
}) => {
  return (
    <div className={styles.ListingCreateForm}>
      <MultiTierDropdown triggerLabel="Select Property Type">
        <MultiTierDropdownItem value="Group2" triggerLabel="test">
          <MultiTierDropdownOption value="TestA">Test</MultiTierDropdownOption>
        </MultiTierDropdownItem>
        <MultiTierDropdownItem value="Group1" triggerLabel="test">
          <MultiTierDropdownOption value="TestB">Test</MultiTierDropdownOption>
          <MultiTierDropdownOption value="TestC">Test</MultiTierDropdownOption>
          <MultiTierDropdownOption value="TestD">Test</MultiTierDropdownOption>
        </MultiTierDropdownItem>
        <MultiTierDropdownItem value="Group3" triggerLabel="test">
          <MultiTierDropdownOption value="TestE">Test</MultiTierDropdownOption>
          <MultiTierDropdownOption value="TestF">Test</MultiTierDropdownOption>
        </MultiTierDropdownItem>
      </MultiTierDropdown>
    </div>
  );
};

export default ListingCreateForm;
