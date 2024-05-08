/* eslint-disable no-unused-vars */

export  class DatabaseManager {
  constructor(storageKey="beanbagdb_local_store") {
    this.storageKey = storageKey;
    this.databases = this.loadFromLocalStorage() || {};
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.databases));
  }

  sanitizeName(name) {
    // Replace all symbols and spaces with dashes
    return name.replace(/[^a-zA-Z0-9]/g, '-').replace(/\s+/g, '-');
}


  addDatabase(name, info) {
    if (Object.prototype.hasOwnProperty.call(this.databases, name)) {
      throw new Error(`Database '${name}' already exists.`);
    } else {
      let nam = this.sanitizeName(name)
      info["name"] = this.sanitizeName(name)
      console.log(info)
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      this.databases[nam] = { ...info, createdOn: currentDate };
      this.saveToLocalStorage();
    }
  }

  modifyDatabase(name, info) {
    if (Object.prototype.hasOwnProperty.call(this.databases, name)) {
      this.databases[name] = { ...this.databases[name], ...info };
      this.saveToLocalStorage();
    } else {
      throw new Error(`Database '${name}' does not exist.`);
    }
  }

  syncDatabase(name) {
    // Assuming syncDatabase is an asynchronous function that returns a Promise
    // return syncDatabaseFunction(name)
    //   .then(() => {
    //     const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    //     this.databases[name].syncedOn = currentDate;
    //     this.saveToLocalStorage();
    //   })
    //   .catch(error => {
    //     console.error(`Error syncing database '${name}': ${error}`);
    //     throw error; // Propagate the error
    //   });
  }

  getDatabase(name) {
    if (Object.prototype.hasOwnProperty.call(this.databases, name)) {
      return this.databases[name];
    } else {
      throw new Error(`Database '${name}' does not exist.`);
    }
  }
  getAllDatabases() {
    return Object.entries(this.databases).map(([name, info]) => ({ name, ...info }));
  }
}

// // Example usage:
// const databaseManager = new DatabaseManager('databases');

// try {
//   databaseManager.addDatabase('db1', { description: 'Database 1' });
//   console.log(databaseManager.getDatabase('db1'));

//   // Assuming syncDatabaseFunction is an asynchronous function that syncs the database externally
//   databaseManager.syncDatabase('db1')
//     .then(() => {
//       console.log(databaseManager.getDatabase('db1'));
//     })
//     .catch(error => {
//       console.error(error.message);
//     });
// } catch (error) {
//   console.error(error.message);
// }
