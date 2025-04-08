
// Where are we handling the timestamp notification index, I meanthe function liek getPendingNotifications.

// import { currentUser } from "./app.js";

export class IndexedDBStorage {
    constructor(dbName = 'TaskforgeDB', version = 1, currentUser) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
        this.currentUser = currentUser;
    }

    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event )=> {
                const db = event.target.result;
                console.log("db inside open is ", db);


                // Create object stores

                // *** objectStoreNames is basically a db(i think) ***
                // It means that if no objectStore that is db for notifications don't exist then create one
                if (!db.objectStoreNames.contains('notifications')) {
                    const notificationStore = db.createObjectStore('notifications', { keyPath: 'id' });

                    // Create indices for efficient querying
                    notificationStore.createIndex('taskId', 'taskId', { unique: false });
                    notificationStore.createIndex('timestamp', 'timestamp', { unique: false });
                    notificationStore.createIndex('notified', 'notified', { unique: false });
                }

                if (!db.objectStoreNames.contains('preferences')) {
                    db.createObjectStore('preferences', {keyPath: 'id'});
                }

            };

            request.onsuccess = event => {
                this.db = event.target.result;
                console.log('IndexedDB successfully opened: ', this.dbName);
                resolve(this.db);
            };

            request.onerror = event => {
                console.error('Error opening IndexedDB:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    // Save user preferences
    async savePreferences(preferences) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['preferences'], 'readwrite');
            const store = transaction.objectStore('preferences');

            // Here we are using currentUser username because we are dealing with multi-user over a single user where we can set a constant id.
            preferences.id = `${this.currentUser.username}-preferences`;
            console.log(`currentUser preference id is ${this.currentUser.username}-preferences`, )
            // Updating the store
            const request = store.put(preferences);

            request.onsuccess = () => {
                console.log("Preferences saved successfully");
                resolve(true);
            }

            request.onerror = (event) => {
                console.log("Error in saving preferences: ", event.target.error);
                reject(event.target.error);
            }
        });
    }

    async getPreferences() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['preferences'], 'readonly');
            const store = transaction.objectStore('preferences');
            console.log("currentUserrr is ", this.currentUser);
            const request = store.get(`${this.currentUser.username}-preferences`);

            request.onsuccess = (event) => {
                const preferences = event.target.result || {
                    id: `${this.currentUser.username}-preferences`,
                    notificationsEnabled: false,
                    soundEnabled:false
                };
                resolve(preferences);
            };

            request.onerror = (event) => {
                console.error("Error getting preferences: ", event.target.error);
                reject(event.target.error);
            };
        });
    }

    async getAllNotifications() {
        await this.ensureOpen();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['notifications'], 'readonly');
            const store = transaction.objectStore('notifications');
            const request = store.getAll();

            request.onsuccess = event => {
                resolve(event.target.result);
            }

            request.onerror = event => {
                console.error('Error fetching notifications:', event.target.error);
                reject(event.target.error);
            }
        });
    }

    async addNotification(notification) {
        await this.ensureOpen();

        // *** Explicitly making notified boolean ***
        notification.notified = Boolean(notification.notified);

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['notifications'], 'readwrite');
            const store = transaction.objectStore('notifications');
            const request = store.add(notification);

            request.onsuccess = event => {
                console.log('Notification added successfully: ', notification.id);
                resolve(event.target.result);
            };

            request.onerror = event => {
                console.error("Error adding  notification: ", event.target.error);
                reject(event.target.error);
            };
        });
    }

    async updateNotification(notification) {
        await this.ensureOpen();

        // Ensure notified is a boolean
        notification.notified = Boolean(notification.notified);
        return new Promise((resolve, reject) => {

            const transaction = this.db.transaction(['notifications'], 'readwrite');
            const store = transaction.objectStore('notifications');
            const request = store.put(notification);

            request.onsuccess = event => {
                console.log('Notification updated successfully: ', notification.id);
                resolve(event.target.result);
            };

            request.onerror = event => {
                console.error("Error updating notification: ", event.target.error);
                reject(event.target.error);
            };
        });
    }

    async deleteNotification(id) {
        await this.ensureOpen();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['notifications'], 'readwrite');
            const store = transaction.objectStore('notifications');
            const request = store.delete(id);

            request.onsuccess = event => {
                console.log('Notification deleted successfully: ', id);
                console.log("event.target.result is ", event.target.result);
                resolve(true);
            };

            request.onerror = event => {
                console.error('Error while deleting notification', event.target.error);
                reject(event.target.error);
            };
        });
    }

    async getNotificationsByTaskId(taskId) {
        await this.ensureOpen();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['notifications'], 'readonly');
            const store = transaction.objectStore('notifications');
            const index = store.index('taskId');
            const request = index.getAll(taskId);

            request.onsuccess = event => {
                resolve(event.target.result);
            };

            request.onerror = event => {
                console.error('Error fetching notifications by taskId: ', event.target.error);
                reject(event.target.error);
            };
        });
    }

    async getPendingNotifications() {
        await this.ensureOpen();
        const now = Date.now();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['notifications'], 'readonly');
            const store = transaction.objectStore('notifications');
            // const index = store.index('notified');
            // const request = index.getAll(false); // // Get all non-notified notifications
            const request = store.getAll();

            request.onsuccess = event => {
                // Filter for notifications that should be shown now
                // Trying to know whether its an array or not.
                console.log("event.target.result is, ", event.target.result);
                const pendingNotifications = event.target.result.filter(
                    notification => notification.timestamp <= now && !notification.notified
                );
                console.log("Filtered pending notifications are ", pendingNotifications);
                resolve(pendingNotifications);
            };

            request.onerror = event => {
                console.error('Error fetching pending notifications: ', event.target.error);
                reject(event.target.error);
            };
        });
    }

    // async getPendingNotifications() {
    //     console.log("I am inside getPendingNotifications funcion.");

    //     await this.ensureOpen();
    //     console.log("After esnure open, ");
    //     const now = Date.now();

    //     return new Promise((resolve, reject) => {
    //         const transaction = this.db.transaction(['notifications'], 'readonly');
    //         const store = transaction.objectStore('notifications');
    //         const index = store.index('notified');
    //         console.log("Index is ", index);
    //         const request = index.openCursor(IDBKeyRange.only(false)); // Open a cursor for keys equal to false
    //         console.log("request is ", request);
    //         const pendingNotifications = [];

    //         request.onsuccess = event => {
    //             const cursor = event.target.result;
    //             if (cursor) {
    //                 console.log("Cursor key:", cursor.key, "Value:", cursor.value);
    //                 if (cursor.value.timestamp <= now && !cursor.value.notified) {
    //                     pendingNotifications.push(cursor.value);
    //                 }
    //                 cursor.continue();
    //             } else {
    //                 resolve(pendingNotifications);
    //             }
    //         };

    //         request.onerror = event => {
    //             console.error('Error opening cursor on notified index: ', event.target.error);
    //             reject(event.target.error);
    //         };
    //     });
    // }

    async ensureOpen() {
        if (!this.db) {
            await this.open();
        }
    }

    async debugDB() {
        await this.ensureOpen();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['notifications'], 'readonly');
            const store = transaction.objectStore('notifications');
            const request = store.getAll();

            request.onsuccess = event => {
                const notifications = event.target.result;
                console.group('IndexedDB Debug Info');
                console.log('Total notifications:', notifications.length);
                notifications.forEach(n => {
                    console.log('-------------------');
                    console.log('ID:', n.id);
                    console.log('TaskID:', n.taskId);
                    console.log('Timestamp:', new Date(n.timestamp));
                    console.log('Notified:', n.notified);
                    console.log('Type of notified:', typeof n.notified);
                });
                console.groupEnd();
                resolve(notifications);
            };

            request.onerror = event => reject(event.target.error);
        });
    }

}
