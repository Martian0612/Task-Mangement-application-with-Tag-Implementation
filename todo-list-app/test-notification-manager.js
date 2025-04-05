// test-notification-manager.js
import { NotificationManager } from './notification-manager.js';

async function testNotificationManager() {
  try {
    const notificationManager = new NotificationManager();
    await notificationManager.init();
    console.log('Notification Manager initialized');
    
    // Test permission request
    console.log('Current permission:', await notificationManager.checkPermission());
    if (notificationManager.hasPermission) {
      console.log('Permission already granted');
    } else {
      console.log('Requesting permission...');
      const granted = await notificationManager.requestPermission();
      console.log('Permission granted?', granted);
    }
    
    // Test scheduling a notification
    if (notificationManager.hasPermission) {
      const mockTask = {
        task_id: 'test-task-' + Date.now(),
        task: 'Test Task',
        description: 'This is a test task description',
        dueDate: new Date(Date.now() + 60000), // Due in 1 minute
        notificationSettings: {
          enabled: true,
          notificationTime: new Date(Date.now() + 30000), // Notify in 30 seconds
          notificationId: null,
          notified: false
        }
      };
      
      const scheduled = await notificationManager.scheduleNotification(mockTask);
      console.log('Notification scheduled?', scheduled);
      console.log('Task with notification:', mockTask);
      
      // Wait 35 seconds and check if notification fired
      console.log('Waiting for notification to fire...');
      setTimeout(async () => {
        console.log('Checking for notifications that should have fired');
        await notificationManager.checkForPendingNotifications();
        
        // Get all notifications to verify it was marked as notified
        const allNotifications = await notificationManager.getAllNotifications();
        console.log('All notifications after test:', allNotifications);
      }, 35000);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test when the document is loaded
document.addEventListener('DOMContentLoaded', testNotificationManager);
