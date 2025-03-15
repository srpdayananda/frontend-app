import { Link } from 'react-router-dom';

import './index.scss';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="unauthorized-title">403</h1>
        <p className="unauthorized-message">
          Sorry, you don't have permission to access this page.
        </p>
        <Link to="/" className="unauthorized-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
