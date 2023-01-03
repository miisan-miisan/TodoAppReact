import React from 'react';
import Router from './router';
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient} >
      <Router />
      <ToastContainer hideProgressBar={true} />
    </QueryClientProvider>
  )
}

export default App