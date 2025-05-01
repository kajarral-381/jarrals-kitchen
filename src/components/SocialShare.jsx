import { useState } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaPinterestP, 
  FaWhatsapp, 
  FaEnvelope, 
  FaLink, 
  FaShareAlt 
} from 'react-icons/fa';
import './SocialShare.css';

const SocialShare = ({ url, title, image, description }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Use current URL if not provided
  const shareUrl = url || window.location.href;
  const shareTitle = title || document.title;
  const shareDescription = description || '';
  
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      color: '#3b5998',
      getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      color: '#1da1f2',
      getUrl: () => `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Pinterest',
      icon: <FaPinterestP />,
      color: '#bd081c',
      getUrl: () => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      color: '#25d366',
      getUrl: () => `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      color: '#333333',
      getUrl: () => `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareDescription + '\n\n' + shareUrl)}`
    }
  ];
  
  const toggleShare = () => {
    setIsOpen(!isOpen);
  };
  
  const handleShare = (platform) => {
    window.open(platform.getUrl(), '_blank', 'width=600,height=400');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    });
  };
  
  return (
    <div className="social-share">
      <button 
        className={`share-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleShare}
        aria-label="Share"
      >
        <FaShareAlt />
      </button>
      
      <div className={`share-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="share-platforms">
          {socialPlatforms.map((platform, index) => (
            <button 
              key={index}
              className="share-button"
              style={{ backgroundColor: platform.color }}
              onClick={() => handleShare(platform)}
              aria-label={`Share on ${platform.name}`}
            >
              {platform.icon}
            </button>
          ))}
          
          <button 
            className="share-button copy-link"
            onClick={copyToClipboard}
            aria-label="Copy link"
          >
            <FaLink />
            {showTooltip && <span className="tooltip">Link copied!</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
