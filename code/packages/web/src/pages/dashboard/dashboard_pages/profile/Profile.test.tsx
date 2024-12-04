import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Profile } from './Profile';

describe('Profile Component', () => {
  test('renders the avatar with the correct alt text', () => {
    render(<Profile />);
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
  });

  test('renders the full name', () => {
    render(<Profile />);
    const fullName = screen.getByText('John Doe');
    expect(fullName).toBeInTheDocument();
  });

  test('renders the company name', () => {
    render(<Profile />);
    const companyName = screen.getByText('Tech Solutions');
    expect(companyName).toBeInTheDocument();
  });

  test('renders the "Edit Profile" button', () => {
    render(<Profile />);
    const editButton = screen.getByRole('button', { name: /Edit Profile/i });
    expect(editButton).toBeInTheDocument();
  });

  test('renders the contact information', () => {
    render(<Profile />);
    const username = screen.getByText('Username');
    const email = screen.getByText('Email');
    const phone = screen.getByText('Phone');

    expect(username).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();

    expect(email).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();

    expect(phone).toBeInTheDocument();
    expect(screen.getByText('+1 123-456-7890')).toBeInTheDocument();
  });

  test('renders the personal details', () => {
    render(<Profile />);
    const firstName = screen.getByText('First Name');
    const lastName = screen.getByText('Last Name');
    const company = screen.getByText('Company');

    expect(firstName).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();

    expect(lastName).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();

    expect(company).toBeInTheDocument();
    expect(screen.getByText('Tech Solutions')).toBeInTheDocument();
  });

  test('renders the Copyright component', () => {
    render(<Profile />);
    const copyright = screen.getByText(/©/i);
    expect(copyright).toBeInTheDocument();
  });
});
