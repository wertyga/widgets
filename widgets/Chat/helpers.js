export const getChatMeta = () => {
  if (typeof window ==='undefined') return {};
  const { settings: { chat: { support_name } } = {} } = window.W_widgets;
  return {
    support_name,
  };
};
