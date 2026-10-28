export const notificationService = {
  getNotifications: async () => Promise.resolve([]),
  markAsRead: async (id) => Promise.resolve({ id, read: true }),
  markAllAsRead: async () => Promise.resolve({ success: true }),
  updatePreferences: async (preferences) => Promise.resolve(preferences),
};
