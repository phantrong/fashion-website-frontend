import React, { Suspense, useState, useLayoutEffect } from 'react';
import { createBrowserHistory } from 'history';
import RootWrapper from './wrappers/RootWrapper';
import { Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import configs from 'config';
import { ConfigProvider } from 'antd';

import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';

moment.locale('vi');

export const history = createBrowserHistory();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
    },
  },
});

interface CustomRouterInterface {
  history: any;
}
const CustomRouter: React.SFC<CustomRouterInterface> = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={locale}>
        <CustomRouter history={history}>
          <Suspense fallback={null}>
            <RootWrapper />
          </Suspense>
        </CustomRouter>
        {configs.APP_ENV !== 'prod' && <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />}
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
