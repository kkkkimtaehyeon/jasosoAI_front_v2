import api from '../common/api-axios.js';

const usePostMyCoverLetter = () => {
  // postCoverLetter({ title, items })
  const postCoverLetter = async ({ title, items }) => {
    // items: [{question, char_limit, content}]
    const body = {
      title,
      items: items.map(item => ({
        question: item.question,
        char_limit: item.char_limit,
        content: item.content,
      })),
    };
    const res = await api.post('/my-cover-letters/user', body);
    return res.data;
  };
  return { postCoverLetter };
};

export default usePostMyCoverLetter;
