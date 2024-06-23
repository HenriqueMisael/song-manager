import { Button, MenuItem } from '@blueprintjs/core';
import type { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import { Select } from '@blueprintjs/select';
import { memo } from 'react';

const filter: ItemPredicate<string> = (query, name, _index, exactMatch) => {
  const normalizedTitle = String(name).toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
  }
};

const renderString: ItemRenderer<string> = (
  option,
  { handleClick, handleFocus, modifiers },
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={option}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={option}
    />
  );
};

interface Props {
  disabled?: boolean;
  className: string;
  options: string[];
  value?: string;
  placeholder?: string;
  onSelect: (selected: string) => void;
}

const StringSelect = memo<Props>(
  ({ disabled = false, className, placeholder, options, value, onSelect }) => {
    return (
      <Select<string>
        disabled={disabled}
        items={options}
        itemPredicate={filter}
        itemRenderer={renderString}
        noResults={
          <MenuItem
            disabled={true}
            text="No results."
            roleStructure="listoption"
          />
        }
        onItemSelect={onSelect}
        className={className}
        popoverProps={{
          minimal: true,
        }}
      >
        <Button className="grow" text={value ?? placeholder} />
      </Select>
    );
  },
);

export default StringSelect;
