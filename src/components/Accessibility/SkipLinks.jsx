import './SkipLinks.css';

const SkipLinks = () => {
  return (
    <div className="skip-links">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <a href="#main-navigation" className="skip-link">Skip to navigation</a>
      <a href="#footer" className="skip-link">Skip to footer</a>
    </div>
  );
};

export default SkipLinks;
