import { useState, useEffect } from 'react';
import { 
  FaUniversalAccess, 
  FaFont, 
  FaAdjust, 
  FaEye, 
  FaMouse, 
  FaKeyboard,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import './AccessibilityMenu.css';

const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    reducedMotion: false,
    focusHighlight: false,
    keyboardNavigation: false
  });
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        applySettings(parsedSettings);
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }
  }, []);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const applySettings = (currentSettings) => {
    // Apply font size
    document.documentElement.setAttribute('data-font-size', currentSettings.fontSize);
    
    // Apply contrast
    document.documentElement.setAttribute('data-contrast', currentSettings.contrast);
    
    // Apply reduced motion
    if (currentSettings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Apply focus highlight
    if (currentSettings.focusHighlight) {
      document.documentElement.classList.add('focus-highlight');
    } else {
      document.documentElement.classList.remove('focus-highlight');
    }
    
    // Apply keyboard navigation
    if (currentSettings.keyboardNavigation) {
      document.documentElement.classList.add('keyboard-navigation');
    } else {
      document.documentElement.classList.remove('keyboard-navigation');
    }
  };
  
  const changeFontSize = (size) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };
  
  const changeContrast = (contrast) => {
    setSettings(prev => ({ ...prev, contrast }));
  };
  
  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };
  
  const toggleFocusHighlight = () => {
    setSettings(prev => ({ ...prev, focusHighlight: !prev.focusHighlight }));
  };
  
  const toggleKeyboardNavigation = () => {
    setSettings(prev => ({ ...prev, keyboardNavigation: !prev.keyboardNavigation }));
  };
  
  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 'medium',
      contrast: 'normal',
      reducedMotion: false,
      focusHighlight: false,
      keyboardNavigation: false
    };
    
    setSettings(defaultSettings);
  };
  
  return (
    <div className="accessibility-container">
      <button 
        className="accessibility-toggle"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="Accessibility options"
      >
        <FaUniversalAccess />
        <span className="accessibility-label">Accessibility</span>
      </button>
      
      {isOpen && (
        <div className="accessibility-menu" role="dialog" aria-label="Accessibility settings">
          <div className="accessibility-header">
            <h2>Accessibility Settings</h2>
            <button 
              className="close-menu"
              onClick={toggleMenu}
              aria-label="Close accessibility menu"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="accessibility-options">
            <div className="option-group">
              <h3><FaFont /> Text Size</h3>
              <div className="button-group">
                <button 
                  className={`option-button ${settings.fontSize === 'small' ? 'active' : ''}`}
                  onClick={() => changeFontSize('small')}
                  aria-pressed={settings.fontSize === 'small'}
                >
                  Small
                </button>
                <button 
                  className={`option-button ${settings.fontSize === 'medium' ? 'active' : ''}`}
                  onClick={() => changeFontSize('medium')}
                  aria-pressed={settings.fontSize === 'medium'}
                >
                  Medium
                </button>
                <button 
                  className={`option-button ${settings.fontSize === 'large' ? 'active' : ''}`}
                  onClick={() => changeFontSize('large')}
                  aria-pressed={settings.fontSize === 'large'}
                >
                  Large
                </button>
                <button 
                  className={`option-button ${settings.fontSize === 'x-large' ? 'active' : ''}`}
                  onClick={() => changeFontSize('x-large')}
                  aria-pressed={settings.fontSize === 'x-large'}
                >
                  Extra Large
                </button>
              </div>
            </div>
            
            <div className="option-group">
              <h3><FaAdjust /> Contrast</h3>
              <div className="button-group">
                <button 
                  className={`option-button ${settings.contrast === 'normal' ? 'active' : ''}`}
                  onClick={() => changeContrast('normal')}
                  aria-pressed={settings.contrast === 'normal'}
                >
                  Normal
                </button>
                <button 
                  className={`option-button ${settings.contrast === 'high' ? 'active' : ''}`}
                  onClick={() => changeContrast('high')}
                  aria-pressed={settings.contrast === 'high'}
                >
                  High Contrast
                </button>
                <button 
                  className={`option-button ${settings.contrast === 'dark' ? 'active' : ''}`}
                  onClick={() => changeContrast('dark')}
                  aria-pressed={settings.contrast === 'dark'}
                >
                  Dark Mode
                </button>
              </div>
            </div>
            
            <div className="option-group">
              <h3>Additional Settings</h3>
              <div className="toggle-options">
                <div className="toggle-option">
                  <button 
                    className={`toggle-button ${settings.reducedMotion ? 'active' : ''}`}
                    onClick={toggleReducedMotion}
                    aria-pressed={settings.reducedMotion}
                  >
                    {settings.reducedMotion ? <FaCheck /> : ''}
                  </button>
                  <div className="toggle-label">
                    <FaEye /> Reduce Animations
                    <p>Minimize animations and motion effects</p>
                  </div>
                </div>
                
                <div className="toggle-option">
                  <button 
                    className={`toggle-button ${settings.focusHighlight ? 'active' : ''}`}
                    onClick={toggleFocusHighlight}
                    aria-pressed={settings.focusHighlight}
                  >
                    {settings.focusHighlight ? <FaCheck /> : ''}
                  </button>
                  <div className="toggle-label">
                    <FaMouse /> Focus Highlighting
                    <p>Enhance visibility of focused elements</p>
                  </div>
                </div>
                
                <div className="toggle-option">
                  <button 
                    className={`toggle-button ${settings.keyboardNavigation ? 'active' : ''}`}
                    onClick={toggleKeyboardNavigation}
                    aria-pressed={settings.keyboardNavigation}
                  >
                    {settings.keyboardNavigation ? <FaCheck /> : ''}
                  </button>
                  <div className="toggle-label">
                    <FaKeyboard /> Keyboard Navigation
                    <p>Improve keyboard navigation with skip links</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="accessibility-footer">
            <button 
              className="reset-button"
              onClick={resetSettings}
              aria-label="Reset all accessibility settings to default"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
