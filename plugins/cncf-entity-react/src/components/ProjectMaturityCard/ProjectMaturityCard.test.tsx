import React from 'react';
import { screen } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ProjectMaturityCard } from './ProjectMaturityCard';

describe('ProjectAudits', () => {
  it('should render', async () => {
    await renderInTestApp(<ProjectMaturityCard />)

    expect(screen.getByText('Maturity')).toBeInTheDocument();
  });

  it('should display a custom message', async () => {
    await renderInTestApp(<ProjectMaturityCard message="Hello Example" />)

    expect(screen.getByText('Hello Example')).toBeInTheDocument();
  })
})
