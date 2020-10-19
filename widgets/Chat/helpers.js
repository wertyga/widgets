export const getChatMeta = () => {
  if (typeof window ==='undefined') return {};
  return window.W_widgets.chat || { managerName: 'Jim' };
};
