import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <nav className="navbar navbar-dark bg-dark px-4">
        <a className="navbar-brand fw-bold" href="/">
          <i className="bi bi-building me-2" />
          Hotels App
        </a>
      </nav>
    </header>
  );
};

export default Header;
