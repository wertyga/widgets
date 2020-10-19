export const keys = {
  connectedUsers: origin => `connected_users_${origin}`,
  userMessageKey: (userID, origin) => `${userID}_${origin}`,
};
