// import { currentUser } from "./app.js";
// import { IndexedDBStorage } from "./indexedDB-storage.js";

export class NotificationManager {
    constructor(dbStorage, currentUser) {
        this.serviceWorkerRegistration = null;
        this.hasPermission = false;
        this.dbStorage = dbStorage;
        // this.dbStorage = new IndexedDBStorage();
        this.isRequestingPermission = false;
        this.hasRequestedSoundBefore = false;
        // Sound need to be play after the notification is display or shown not before it.

        // this.hasRequestedSoundAfter = false;
        this.checkInterval;
        this.notificationsEnabled = false;
        this.soundEnabled = false;
        this.currentUser = currentUser;
    }

    async init() {
        // Initialize the IndexedDB
        await this.dbStorage.open();

        // Load user preferences
        await this.loadUserPreferences();

        // // Add debug logging
        // console.log('Initial state:', {
        //     hasPermission: this.hasPermission,
        //     notificationsEnabled: this.notificationsEnabled,
        //     serviceWorkerRegistration: this.serviceWorkerRegistration
        // });


        // Check if service workers are supported by the browser, some browsers don't support service workers.
        if ('serviceWorker' in navigator) {
            try {
                // Register service worker
                this.serviceWorkerRegistration = await navigator.serviceWorker.register('/service-worker.js');
                console.log('Service worker registered: ', this.serviceWorkerRegistration);

                // Wait for the service worker to be ready
                await navigator.serviceWorker.ready;
                console.log('Service worker is ready');


                const permission = await this.checkPermission();
                this.hasPermission = permission === 'granted';

                // Added it later imp for saving user preferences.
                if (this.hasPermission) {
                    await this.saveUserPreferences()
                }

                // Intialize sound UI elements
                this.initUI();

                // Set up periodic checking for notifications
                this.setupNotificationChecker();
                return true;
                // resolve(true);
            }
            catch (error) {
                console.error("Service worker registration failed or error in init(): ", error);
                return false;
                // reject(false);
            }
        }
        else {
            console.warn('Service workers not supported');
            return false;
            // resolve(false);
        }
    }

    // Load user preferences from IndexedDB
    async loadUserPreferences() {
        try {
            const preferences = await this.dbStorage.getPreferences();
            this.notificationsEnabled = preferences.notificationEnabled || false;
            this.soundEnabled = preferences.soundEnabled || false;
            console.log("User preferences loaded: ", preferences);
        }
        catch (error) {
            console.error("Error loading user preferences: ", error);
            this.notificationsEnabled = false;
            this.soundEnabled = false;
        }
    }

    // Save user preferences to IndexedDB

    async saveUserPreferences() {
        try {
            await this.dbStorage.savePreferences({
                notificationsEnabled: this.notificationsEnabled,
                soundEnabled: this.soundEnabled
            });

            console.log("Preferences saved:", {
                notificationsEnabled: this.notificationsEnabled,
                soundEnabled: this.soundEnabled
            });
            
        }
        catch (error) {
            console.error("Error saving user preferences: ", error);
        }
    }

    initUI() {
        // Initialize notification toggle
        // ** Already handled, so ignoring it for now. **

        // Initialize sound toggle

        const username = `${this.currentUser.username}`;
        console.log("currentUser username is ", username);
        const soundToggle = document.getElementById(`sound-toggle-${username}`);
        if (soundToggle) {
            const soundOnIcon = soundToggle.querySelector('.sound-on');
            const soundOffIcon = soundToggle.querySelector('.sound-off');

            // Set initial state of sound Icon based on stored preferences.
            if (!this.soundEnabled) {
                soundOnIcon.classList.add('hidden');
                soundOffIcon.classList.remove('hidden');
                soundToggle.title = "Sound is disabled";
            }

            else {
                soundOnIcon.classList.remove('hidden');
                soundOffIcon.classList.add("hidden");
                soundToggle.title = "Sound is enabled";
            }

            // Changing the sound Icon on click.
            soundToggle.addEventListener('click', async () => {
                // What does it mean !this.soundEnabled, does it mean if it is true/enabled then disable it and if it is disable then enable it.
                await this.toggleSound(!this.soundEnabled);

                // Updating ui based on actual preference of sound
                if (this.soundEnabled) {
                    soundOnIcon.classList.remove('hidden');
                    soundOffIcon.classList.add('hidden');
                    soundToggle.title = "Sound notifications enabled";
                } else {
                    soundOnIcon.classList.add('hidden');
                    soundOffIcon.classList.remove('hidden');
                    soundToggle.title = "Sound notifications disabled";
                }
            });
        }

    }



    // Set up periodic checking for notifications
    setupNotificationChecker() {

        // Clear any existing interval first
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
        }
        this.checkInterval = setInterval(() => {
            this.checkForPendingNotifications();
        }, 3000);

    }

    async checkPermission() {
        if (!('Notification' in window)) {
            console.warn('Notifications not supported');
            return 'denied';
        }

        // Add debug logging
        console.log('Current notification state:', {
            permission: Notification.permission,
            serviceWorkerActive: this.serviceWorkerRegistration?.active != null
        });

        // Make sure service worker is ready before checking permission
        if (this.serviceWorkerRegistration && !this.serviceWorkerRegistration.active) {
            await navigator.serviceWorker.ready;
        }
        return Notification.permission;
    }

    // show blocked popup and it is showing at center, after closing the notification center modal.
    // And we can't show customized popup, that's blocked by browser or user because browser can block anytime, its not on 3 attempts, sometimes it block even on 1 attempt or 2 attempts, it happened while testing.

    showNotificationBlockedPopup() {
        // Closing the notification center modal if popup exist.
        const notificationModal = document.querySelector('.notification-modal-wrapper');

        // If notificationModal is displayed then hide it.
        if (notificationModal) {
            notificationModal.style.display = 'none';
        }

        // Check if popup already exists to prevent multiple creations
        let existingPopup = document.querySelector('.notification-popup');
        if (existingPopup) {
            existingPopup.classList.add('show');
            return;
        }

        const popupHtml = `
            <div class="notification-popup">
                <div class="popup-content">
                    <h3>🚫 Notifications Blocked</h3>
                    <p>Notifications are currently blocked for this site. To enable:</p>
                    <ol>
                        <li>Click the site information icon in your browser's address bar</li>
                        <li>Select "Allow" for notifications</li>
                    </ol>
                    <button class="close-popup">Got It</button>
                </div>
            </div>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = popupHtml.trim();
        const popupElement = tempDiv.firstElementChild;

        document.body.appendChild(popupElement);

        const closeButton = popupElement.querySelector('.close-popup');
        closeButton.addEventListener('click', () => {
            // document.body.removeChild(popupElement);
            popupElement.classList.remove('show');
        });

        // Close when clicking outside the popup
        popupElement.addEventListener('click', (e) => {
            if (e.target === popupElement) {
                popupElement.classList.remove('show');
            }
        });

        // Show the popup
        popupElement.classList.add('show');
    }

    // Code including stop multiple permission request and also prevent mutliple popups
    // Most advance version.

    async requestPermission() {
        const notificationModal = document.querySelector('.notification-modal-wrapper');
        if (!('Notification' in window)) {
            console.warn("Notifications not supported");
            return false;
        }

        try {
            const notificationTrigger = document.querySelector('.toggle-switch input[type="checkbox"]');

            notificationTrigger.addEventListener('change', async () => {
                // If notifications are blocked and a request is already in progress further action

                if (Notification.permission === 'denied') {

                    if (this.isRequestingPermission) {
                        notificationTrigger.checked = false;
                        console.log("Permission request already handled");
                        return;
                    }

                    //  ??? Is this revert the toggle needed here, and if yes then why?
                    // Revert the toggle
                    notificationTrigger.checked = false;

                    // Show blocked notification popup only if not already showned
                    this.showNotificationBlockedPopup();
                    return;
                }

                // If already requesting permission, prevent multiple requests
                if (this.isRequestingPermission) {
                    console.log("Permission request already in progress");
                    // Revert the toggle to prevent multiple clicks
                    notificationTrigger.checked = false;
                    return;
                }

                //  Handle toggle to enable notifications
                // Tried to enable notifications (either for browser permission or for app notification.)
                if (notificationTrigger.checked) {
                    // If browser already provided permission, then enable means (enable app notifications.)

                    if (Notification.permission === 'granted') {
                        console.log("Notifications enabled (browser permission) and now we are enabling app notificaitons.");
                        this.notificationsEnabled = true;
                        this.soundEnabled = true;
                        // Enable app ntoification and store the user preference in IndexedDB
                        // Play a test sound to utilize the user interaction

                        // await this.playNotificationSound();

                        // Only enable sound if it was previously enabled or it's the first time
                        if (!this.hasRequestedSoundBefore) {
                            this.soundEnabled = true;
                            await this.playNotificationSound();
                            this.hasRequestedSoundBefore = true;
                        }
                    }
                    else {
                        try {
                            // Disable toggle during permission request
                            notificationTrigger.disabled = true;

                            // Set flag to preent multiple requests
                            this.isRequestingPermission = true;

                            const permission = await Notification.requestPermission();

                            switch (permission) {
                                case 'granted':
                                    console.log("Browser notification permission granted.");
                                    this.notificationsEnabled = true;
                                    this.hasPermission = true;
                                    // Enable sound when notifications are granted
                                    // or Enable sound on first permission grant
                                    this.soundEnabled = true;
                                    // Play a test sound to utilize the user interaction
                                    await this.playNotificationSound();
                                    this.hasRequestedSoundBefore = true;
                                    break;

                                case 'default':
                                    notificationTrigger.checked = false;
                                    this.notificationsEnabled = false;
                                    console.log("Permission request dismissed.");
                                    break;

                                case 'denied':
                                    notificationTrigger.checked = false;
                                    this.notificationsEnabled = false;
                                    console.log("Notifications are blocked");

                                    // this.showNotificationBlockedPopup();
                                    break;
                            }
                            if (notificationModal) {
                                // Close the notification modal whem user dismissed, allowed or block the notifications or even if notifications are automatically blocked by browser.
                                notificationModal.style.display = 'none';
                            }

                        }
                        catch (error) {
                            console.error("Error requesting permission ", error);
                            notificationTrigger.checked = false;
                            this.notificationsEnabled = false;
                        }
                        finally {
                            // Re-enable toggle
                            notificationTrigger.disabled = false;
                            // Reset the flag after request completes
                            this.isRequestingPermission = false;
                        }
                    }
                }
                else {
                    // Toggled to disable ntoificaitnos
                    console.log("App Notifications disabled");
                    this.notificationsEnabled = false;
                    // Since notifications are disabled we don't need to do anything with sound preferences.
                    // *** Or sound preferences are not just associated with notifications, they are also used while enable and disabling the notification toggle or sound icon. ***

                    // this.soundEnabled = false;
                    // Disable app notifications, but browser notifications is enabled.
                }   // Store the preference in IndexedDB

                // Store notification and sound preferences in IndexedDB
                // await this.storeUserPreferences(notificationTrigger.checked);
                await this.saveUserPreferences();
            });

            // Initial permission check
            const initialPermission = Notification.permission;
            this.hasPermission = initialPermission === 'granted';
            return this.hasPermission;
        }

        catch (error) {
            console.error("Error requesting notification permission: ", error);

        }
        return false;
    }

    // Method to store user preferences in indexedDB ( we changed the function.)
    // async storeUserPreferences(notificationEnabled) {
    //     try {
    //         // Store both notification and sound preferences
    //         await this.dbStorage.addPreference({
    //             notificationsEnabled: this.notificationsEnabled,
    //             soundEnabled: this.soundEnabled
    //         });
    //         console.log("User preferences stored in IndexedDB");
    //     } catch (error) {
    //         console.error("Error storing user preferences:", error);
    //     }        
    // }



    // Schedule a notification for a specific task
    async scheduleNotification(task) {
        if (!this.hasPermission) {
            console.warn('No notification permission');
            return false;
        }

        if (!task.dueDate || !task.notificationSettings.enabled) {
            console.warn('Task has no due date or notifications disabled');
            return false;
        }

        // Generate a unique ID for this notification
        const notificationId = `task-${task.task_id}-${Date.now()}`;

        // Create notification object
        const notification = {
            id: notificationId,
            taskId: task.task_id,
            title: task.task || 'Task Reminder',
            body: task.description || 'Your task is due soon',
            timestamp: task.notificationSettings.notificationTime.getTime(),
            notified: false
        };

        // Add notification to database
        await this.dbStorage.addNotification(notification);

        // Update task with notification ID
        task.notificationSettings.notificationId = notificationId;

        return true;
    }

    // Cancel a scheduled notification
    async cancelNotification(task) {
        if (!task.notificationSettings.notificationId) {
            return false;
        }

        // Delete notification from database
        await this.dbStorage.deleteNotification(task.notificationSettings.notificationId);

        // Update task
        task.notificationSettings.enabled = false;
        task.notificationSettings.notificationId = null;

        return true;
    }

    // Check for pending notifications
    async checkForPendingNotifications() {
        // Add state debugging
        console.log('Checking notifications:', {
            hasPermission: this.hasPermission,
            notificationEnabled: this.notificationsEnabled,
            serviceWorker: !!this.serviceWorkerRegistration
        });

        if (!this.hasPermission) return;

        // Get pending notifications that are due
        const pendingNotifications = await this.dbStorage.getPendingNotifications();

        // Show pending notifications
        for (const notification of pendingNotifications) {
            await this.showNotification(notification);

            // Mark as notified in the database
            notification.notified = true;
            await this.dbStorage.updateNotification(notification);
        }
    }

    // Show a notification
    async showNotification(notificationData) {
        // if (!this.serviceWorkerRegistration || !this.hasPermission || !this.notificationsEnabled) {
        //     console.warn('Cannot show notification: service worker not registered or notifications disabled');
        //     return false;
        // }

        // Add detailed validation checking
        const checks = {
            serviceWorker: !!this.serviceWorkerRegistration,
            permission: await this.checkPermission() === 'granted',
            notificationsEnabled: this.notificationsEnabled
        };

        console.log('Notification checks:', checks);

        if (!checks.serviceWorker || !checks.permission || !checks.notificationsEnabled) {
            console.warn('Cannot show notification:', {
                missingServiceWorker: !checks.serviceWorker,
                missingPermission: !checks.permission,
                notificationsDisabled: !checks.notificationsEnabled
            });
            return false;
        }

        // if (!this.serviceWorkerRegistration) {
        //     console.warn('Service worker not registered');
        //     return false;
        // }

        try {

            await this.serviceWorkerRegistration.showNotification(
                notificationData.title,
                {
                    body: notificationData.body,
                    icon: 'appIconn.jpeg',
                    //   icon: 'C:\Users\Lenovo\Desktop\coding stuff\javascript_projects\todo-list-app\applogo.jpg', 
                    tag: notificationData.id,
                    data: {
                        taskId: notificationData.taskId
                    },
                    // silent: false
                    silent: this.soundEnabled
                }
            );
            // this.playNotificationSound();

            // Play notification sound after notification is displayed or shown.
            if (this.soundEnabled) {
                await this.playNotificationSound();
            }

            return true;
        }
        catch (error) {
            console.error('Error showing notification:', error);
            return false;
        }
    }

    // Play notification sound
    async playNotificationSound() {
        if (!this.soundEnabled) {
            console.log("sound is not enabled.");
            return;
        }

        try {
            console.log("sound is enabled, playing notification sound.");
            // Use absolute path from root of your web app
            const audio = new Audio('/assets/sounds/notify.mp3');
            // const audio = new Audio('C:\Users\Lenovo\Desktop\coding stuff\javascript_projects\todo-list-app\assets\sounds\notify.mp3');

            // Add event listeners for debugging
            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
                console.log('Audio error code:', audio.error.code);
                console.log('Source:', audio.src);
            });

            await audio.play();
        } catch (error) {
            console.error('Sound play error:', error);
            // Don't disable sound on first error
            // this.soundEnabled = false;
        }
    }
    // async playNotificationSound() {
    //     if (!this.soundEnabled) {
    //         return;
    //     }

    //     try {
    //         const audio = new Audio('notify.mp3');
    //         await audio.play();
    //     }
    //     // audio.play().catch(error => console.error('Error playing sound:', error));
    //     catch (error) {
    //         console.log('Sound play prevented: ', error);
    //         // Disable sound if it fails
    //         this.soundEnabled = false;
    //     }
    // }

    async toggleSound(enabled) {
        this.soundEnabled = enabled;
        console.log(`Sound notifications ${enabled ? 'enabled' : 'disabled'}`);

        // If enabling sound, play a test sound
        if (enabled) {
            await this.playNotificationSound();
        }
        // Save preferences
        await this.saveUserPreferences();
        return true;

    }

    // Get all scheduled notifications (for the notification center)
    async getAllNotifications() {
        return await this.dbStorage.getAllNotifications();
    }

}
