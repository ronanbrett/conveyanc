import React, { useState } from 'react';
import Select from '../Select';
import Button from '../../Button/Button';
import IconButton from '../../IconButton/IconButton';

const allSeasons = [
    'S01',
    'S02',
    'S03',
    'S04',
    'S05',
    'S06',
    'S07',
    'S08',
    'S09',
    'S10',
  ];

  export default {
    title: 'Components/Select/Seasons',
    decorators: [],
    component: Select,
  };


const SeasonsSelect = () => {
    const [selected, setSelected] = useState([]);
  
    const onRemoveSeason = season => {
      const seasonIndex = allSeasons.indexOf(season);
      setSelected(
        selected.filter(selectedSeason => selectedSeason !== seasonIndex),
      );
    };
  
    const renderSeason = season => (
      <Button
        key={`season_tag_${season}`}
        href="#"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          onRemoveSeason(season);
        }}
        onFocus={event => event.stopPropagation()}
      >
        <div
            style={{display: "flex", alignContent: "center", flexDirection: "row", padding: "6px 12px", margin: "6px"}}
        >
          <p>
            {season}
          </p>
          <div>
            <IconButton icon="close"></IconButton>
          </div>
        </div>
      </Button>
    );
  
    const renderOption = (option, state) => (
      <div>
        {option}
      </div>
    );
  
    return (
          <Select
            closeOnChange={false}
            multiple
            id="whateer"
            placeholder="whatnot"
            name="seasons"
            value={
              <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "200px"}}>
                {selected && selected.length ? (
                  selected.map(index => renderSeason(allSeasons[index]))
                ) : (
                  <div
                    style={{padding: "6px 12px", margin: "6px"}}
                  >
                    Select Season
                  </div>
                )}
              </div>
            }
            options={allSeasons}
            selected={selected}
            disabled={[2, 6]}
            onChange={({ selected: nextSelected }) => {
              setSelected([...nextSelected].sort());
            }}
          >
            {renderOption}
          </Select>
    );
  };
  
export const Seasons = () => (<SeasonsSelect />)