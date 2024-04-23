import React from 'react';
import { screen } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ProjectGeneralCard } from './ProjectGeneralCard';

describe('ProjectGeneralCard', () => {
  it('should render', async () => {
    await renderInTestApp(<ProjectGeneralCard />)

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should display a custom message', async () => {
    await renderInTestApp(<ProjectGeneralCard message="Hello Example" />)

    expect(screen.getByText('Hello Example')).toBeInTheDocument();
  })
})
