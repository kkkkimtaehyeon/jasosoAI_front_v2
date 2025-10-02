import { useEffect, useState } from 'react';
import api from '../common/api-axios.js';

const useMyCoverLetterDetail = (id) => {
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/my-cover-letters/${id}`)
      .then(res => {
        // created_at → date로 변환, items 그대로
        const data = res.data;
        setCoverLetter({
          ...data,
          date: new Date(data.created_at).toISOString().split('T')[0],
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { coverLetter, loading, error };
};

export default useMyCoverLetterDetail;
