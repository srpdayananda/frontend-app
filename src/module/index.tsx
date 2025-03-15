import { BrowserRouter } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';

import Routes from '../router';

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </BrowserRouter>
  );
}

export default App;
