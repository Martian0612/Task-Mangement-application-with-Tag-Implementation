import { IndexedDBStorage } from "./indexedDB-storage.js";

async function testIndexedDB() {
  try {
    const dbStorage = new IndexedDBStorage();
    await dbStorage.open();
    console.log('Database opened successfully');
    
    // Test adding a notification
    const testNotification = {
      id: `test-notification-${Date.now()}`,
      taskId: 'test-task-1',
      title: 'Test Notification',
      body: 'This is a test notification',
      timestamp: Date.now(),
      notified: false
    };
    
    await dbStorage.addNotification(testNotification);
    console.log('Test notification added');
    
    // Test fetching all notifications
    const allNotifications = await dbStorage.getAllNotifications();
    console.log('All notifications:', allNotifications);
    
    // Test updating a notification
    testNotification.notified = true;
    await dbStorage.updateNotification(testNotification);
    console.log('Test notification updated');
    
    // Test fetching notifications by task ID
    const taskNotifications = await dbStorage.getNotificationsByTaskId('test-task-1');
    console.log('Notifications for test-task-1:', taskNotifications);
    
    // Test deleting a notification
    await dbStorage.deleteNotification(testNotification.id);
    console.log('Test notification deleted');
    
    const afterDelete = await dbStorage.getAllNotifications();
    console.log('Notifications after delete:', afterDelete);
    
    console.log('All tests completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
document.addEventListener('DOMContentLoaded', testIndexedDB);
