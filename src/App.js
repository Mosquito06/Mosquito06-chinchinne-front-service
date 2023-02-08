import 'App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



import Login from 'components/menu/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider  } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() 
{
  return (
      <QueryClientProvider client={ queryClient }>
        <ReactQueryDevtools initialIsOpen={true} />
        
        <Router>
          <Routes>
            <Route path="/" element={< Login />}/>
          </Routes>
        </Router>

      </QueryClientProvider>
  );
}

export default App;
