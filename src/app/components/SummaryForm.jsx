import React from 'react';
import { Textarea } from './Textarea';

export const SummaryForm = ({ summary, onSummaryChange }) => {
  return (
    <Textarea
      label="Professional Summary"
      name="summary"
      value={summary}
      onChange={onSummaryChange}
    />
  );
};