import React from 'react';
import { Typography } from '@material-ui/core';

/**
 * Props for {@link ExampleComponent}.
 *
 * @public
 */
export interface ProjectMaturityCardProps {
  message?: string;
}

/**
 * Displays an example.
 *
 * @remarks
 *
 * Longer descriptions should be put after the `@remarks` tag. That way the initial summary
 * will show up in the API docs overview section, while the longer description will only be
 * displayed on the page for the specific API.
 *
 * @public
 */
export function ProjectMaturityCard(props: ProjectMaturityCardProps) {
  // By destructuring props here rather than in the signature the API docs will look nicer
  const { message = 'Maturity' } = props;

  return <Typography variant="h1">{message}</Typography>;
}
