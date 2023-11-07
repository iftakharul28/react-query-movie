import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
type Props = {
  children: React.ReactNode;
};
const Provider = (props: Props) => {
  const queryClient = useMemo(() => new QueryClient({}), []);
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export default Provider;
