import { Select } from "@components";
import { IsoCurrency } from "@core/api/graphql";
import TextInput from "components/TextInput";
import React, { FC } from "react";

import styles from "./CurrencyInput.module.scss";

interface CurrencyInputProps {
  name?: string;
  id?: string;
  children?: any;
}

const renderCurrency = (currency: string) => <div>{currency}</div>;

const CurrencyInput: FC<CurrencyInputProps> = ({ id, name, ...props }) => {
  const options = [IsoCurrency.Eur, IsoCurrency.Usd, IsoCurrency.Gbp];

  return (
    <div className={styles.CurrencyInput}>
      <Select placeholder="" name={name} id={id} options={options}>
        {renderCurrency}
      </Select>{" "}
      <TextInput />
    </div>
  );
};

export default CurrencyInput;
