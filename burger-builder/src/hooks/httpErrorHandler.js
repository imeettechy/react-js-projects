import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const requestIncenpt = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const responseIncenpt = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(requestIncenpt);
      httpClient.interceptors.request.eject(responseIncenpt);
    };
  }, [requestIncenpt, responseIncenpt]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
