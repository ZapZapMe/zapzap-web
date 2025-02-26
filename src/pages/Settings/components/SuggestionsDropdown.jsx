import React, { useCallback, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

const SuggestionsDropdown = ({
  shouldShow,
  filteredElements,
  onClick,
  prefIx,
}) => {
  const [currIdx, setCurrIdx] = useState(0);

  const upHandler = useCallback(() => {
    if (currIdx === 0) return;
    const selectedIdx =
      (currIdx + filteredElements.length - 1) % filteredElements.length;
    setCurrIdx(selectedIdx);
    document.getElementById(`command-${selectedIdx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currIdx, filteredElements.length]);

  const downHandler = useCallback(() => {
    if (currIdx === filteredElements.length - 1) return;
    const selectedIdx = (currIdx + 1) % filteredElements.length;
    setCurrIdx(selectedIdx);
    document.getElementById(`command-${selectedIdx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currIdx, filteredElements.length]);

  const enterHandler = useCallback(() => {
    if (filteredElements.length === 0) return;
    onClick(filteredElements[currIdx]);
  }, [currIdx, filteredElements, onClick]);

  const handleKeydown = useCallback(
    (event) => {
      if (event.key === 'ArrowUp') {
        return upHandler();
      }

      if (event.key === 'ArrowDown') {
        return downHandler();
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        enterHandler();
        return;
      }
    },
    [downHandler, enterHandler, upHandler]
  );

  useEffect(() => {
    setCurrIdx(0);
  }, [filteredElements]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);
  return (
    shouldShow && (
      <div className="w-100 mt-2 position-absolute top-100 overflow-hidden rounded-2 bg-neutral-95">
        <Dropdown.Item
          as="button"
          disabled
          className="bg-neutral-90 p-2 typography-caption-large"
        >
          Suggestions
        </Dropdown.Item>
        {filteredElements.map((suggestion, index) => (
          <Dropdown.Item
            as="button"
            onMouseEnter={() => setCurrIdx(index)}
            key={suggestion}
            className={`p-2 cursor-pointer typography-body text-neutral-30 ${index === currIdx ? 'active bg-neutral-90' : ''}`}
            onClick={() => onClick(suggestion)}
          >
            <span>{prefIx}</span>
            {prefIx ? (
              <span className="text-yellow-70">{suggestion}</span>
            ) : null}
          </Dropdown.Item>
        ))}
        {filteredElements.length === 0 && (
          <Dropdown.Item className="text-xs text-gray-400">
            No data to show.
          </Dropdown.Item>
        )}
      </div>
    )
  );
};

export default SuggestionsDropdown;
