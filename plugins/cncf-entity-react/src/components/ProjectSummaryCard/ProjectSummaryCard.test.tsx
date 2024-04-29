import React from 'react';
import { screen } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ProjectSummaryCard } from './ProjectSummaryCard';

describe('ProjectAudits', () => {
  it('should render', async () => {
    await renderInTestApp(<ProjectSummaryCard />)

    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it('should display a custom message', async () => {
    await renderInTestApp(<ProjectSummaryCard message="Hello Example" />)

    expect(screen.getByText('Hello Example')).toBeInTheDocument();
  })
})
