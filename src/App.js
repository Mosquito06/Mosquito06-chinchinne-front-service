import 'App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider  } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import GlobalContextProvider from 'context/GlobalContext';
import PrivateRoute from 'components/common/PrivateRoute';
import PublicRoute from 'components/common/PublicRoute';

import GlobalModal from 'components/common/GlobalModal';
import MyAccountModal from 'components/modal/MyAccountModal';
import Login from 'components/menu/Login';
import Main from 'components/menu/Main';

const queryClient = new QueryClient();

function App() 
{
  return (
      <QueryClientProvider client={ queryClient }>
          <ReactQueryDevtools initialIsOpen={true} />
          <GlobalContextProvider>

            <Router>
              <Routes>
                <Route path="/" element={<PrivateRoute component={ Main } />}/>
                <Route path="/login" element={<PublicRoute component={ Login } restricted={true}/>}/>
              </Routes>
            </Router>
          
          
            <MyAccountModal />
            <GlobalModal />
          </GlobalContextProvider>
      </QueryClientProvider>
  );
}

export default App;
