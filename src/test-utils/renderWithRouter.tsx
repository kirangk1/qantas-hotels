import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter, MemoryRouterProps, Route, Routes } from 'react-router-dom';

const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

interface RenderWithRouterOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: MemoryRouterProps['initialEntries'];
}

export const renderWithRouter = (
  ui: ReactElement,
  { initialEntries = ['/'], ...renderOptions }: RenderWithRouterOptions = {}
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter future={ROUTER_FUTURE} initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    ),
    ...renderOptions,
  });

export const renderWithRoute = (
  element: ReactElement,
  path: string,
  initialEntries: MemoryRouterProps['initialEntries'] = ['/']
) =>
  render(
    <MemoryRouter future={ROUTER_FUTURE} initialEntries={initialEntries}>
      <Routes>
        <Route path={path} element={element} />
      </Routes>
    </MemoryRouter>
  );
