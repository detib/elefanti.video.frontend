import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function useFetch(from, take) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(false);
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos?from=${from}&take=${take}`)
      .then((response) => {
        console.log(response.data);
        setVideos((prev) => prev = [...prev, ...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [from, take]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos, from, take]);

  return { loading, error, videos, setVideos };
}

export default useFetch;
