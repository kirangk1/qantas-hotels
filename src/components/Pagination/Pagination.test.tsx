import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination component', () => {
  it('should render page numbers and navigation controls', () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    expect(screen.getByRole('navigation', { name: 'Hotel list pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Prev' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('should call onPageChange with previous page when Prev is clicked', async () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Prev' }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should not call onPageChange when Prev is disabled on first page', async () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).toBeDisabled();
    await userEvent.click(prevButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should call onPageChange with next page when Next is clicked', async () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should not call onPageChange when Next is disabled on last page', async () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
    await userEvent.click(nextButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('should call onPageChange when specific page number is clicked', async () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole('button', { name: '3' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
