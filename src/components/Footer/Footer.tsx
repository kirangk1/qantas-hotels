import './Footer.scss';

const Footer = () => {
  return (
    <footer className="app-footer bg-dark text-white">
      <div className="container text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Hotels App</p>
      </div>
    </footer>
  );
};

export default Footer;
