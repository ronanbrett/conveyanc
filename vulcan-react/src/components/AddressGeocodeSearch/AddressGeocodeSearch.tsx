import TextInput from "components/TextInput";
import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./AddressGeocodeSearch.module.scss";
import { getGeoCoding } from "@services/google.service";
import { useRxDebounce } from "@hooks/useDebounceRxjs";

const RESULTS = {
  results: [
    {
      address_components: [
        {
          long_name: "777",
          short_name: "777",
          types: ["street_number"],
        },
        {
          long_name: "South Circular Road",
          short_name: "S Circular Rd",
          types: ["route"],
        },
        {
          long_name: "Saint James' (part of Phoenix Park)",
          short_name: "Saint James' (part of Phoenix Park)",
          types: ["neighborhood", "political"],
        },
        {
          long_name: "Dublin 8",
          short_name: "Dublin 8",
          types: ["postal_town"],
        },
        {
          long_name: "County Dublin",
          short_name: "County Dublin",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Ireland",
          short_name: "IE",
          types: ["country", "political"],
        },
      ],
      formatted_address:
        "777 S Circular Rd, Saint James' (part of Phoenix Park), Dublin, Co. Dublin, Ireland",
      geometry: {
        location: {
          lat: 53.3464682,
          lng: -6.3066952,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 53.34781718029149,
            lng: -6.305346219708498,
          },
          southwest: {
            lat: 53.34511921970849,
            lng: -6.308044180291502,
          },
        },
      },
      place_id: "ChIJ9eU-8U4MZ0gRMoLRXyVNS8M",
      plus_code: {
        compound_code: "8MWV+H8 Dublin, County Dublin, Ireland",
        global_code: "9C5M8MWV+H8",
      },
      types: ["establishment", "point_of_interest"],
    },
  ],
  status: "OK",
};

interface AddressGeocodeSearchProps {
  children?: any;
}

const AddressGeocodeSearch: FC<AddressGeocodeSearchProps> = ({ ...props }) => {
  const [value, setValue] = useState<string>();
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestedFolks, setSuggestedFolks] = useState([]);

  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [suggestions, updateSuggestions] = useRxDebounce<any, any[]>(
    getGeoCoding
  );

  const boxRef = useRef<HTMLElement>();

  useEffect(() => {
    forceUpdate();
  }, [forceUpdate]);

  const onChange = async (event: SyntheticEvent) => {
    const { value: newValue } = event.target as any;
    setValue(newValue);
    updateSuggestions(newValue as string);
  };

  const onSelect = (event: any) => setValue(event.suggestion.value);

  const renderSuggestions = () => {
    return (
      suggestions &&
      suggestions.map(({ formatted_address }, index, list) => ({
        label: (
          <div>
            <p>{formatted_address}</p>
          </div>
        ),
        value: formatted_address,
      }))
    );
  };

  return (
    <div className={styles.AddressGeocodeSearch}>
      <TextInput
        type="search"
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        suggestions={renderSuggestions()}
        placeholder="Enter your name..."
        onSuggestionsOpen={() => setSuggestionOpen(true)}
        onSuggestionsClose={() => setSuggestionOpen(false)}
      />
    </div>
  );
};

export default AddressGeocodeSearch;
