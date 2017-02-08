

/*class Person {
  constructor () {

  }

}*/

class Users {
  constructor (){
    this.users = [];
  }
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    var user = getuser(id);
    var users = this.users.filter((user) => {
      return user.id != id;
    })
    this.users = users;
    return user;
  }
  getUser(id){
    return this.users.filter((user) => {
      return user.id == id;
    })[0];

  }
  getUserList(room){
    var users = this.users.filter((user) => {
      return user.room == room;
    })
    var namesArray = users.map((user) => {
        return user.name;
    };
    return namesArray;
  }
}

module.exports = {Users};
