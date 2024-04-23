import React from 'react';
import { screen } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ProjectAuditsCard } from './ProjectAuditsCard';

describe('ProjectAudits', () => {
  it('should render', async () => {
    await renderInTestApp(<ProjectAuditsCard />)

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should display a custom message', async () => {
    await renderInTestApp(<ProjectAuditsCard message="Hello Example" />)

    expect(screen.getByText('Hello Example')).toBeInTheDocument();
  })
})
