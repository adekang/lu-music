/**
 * @jest-environment jsdom
 */
import React from 'react';
<<<<<<< HEAD
import { render, cleanup, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
=======
import { render, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';
>>>>>>> 410f661 (Fix the problem of lint reporting errors)
import App from '../App';

afterEach(cleanup);

describe('<App />', () => {
  it('renders without errors', () => {
    const { container } = render(<App />);
    // a标签含有data-testid='aNoDisabled',进行检查
    expect(getByTestId(container, 'aNoDisabled')).not.toBeDisabled();
  });
});
