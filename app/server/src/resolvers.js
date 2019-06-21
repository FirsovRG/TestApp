const users = [{
        firstName: 'Ivan',
        lastName: 'Ivanov',
        email: 'IIVanov@mail.com',
        username: 'user1',
        password: 'user1'
  }, {
        firstName: 'Petr',
        lastName: 'Petrov',
        email: 'PPetrov@mail.com',
        username: 'user2',
        password: 'user2'
  }, {
        firstName: 'Alexey',
        lastName: 'Alexeev',
        email: 'AAlexeev@mail.com',
        username: 'user3',
        password: 'user3'
  }, ];

  export const resolvers = {
    Query: {
        user: (parent, {username}, context, info) => {
            return users.find(user => user.username === username);
        },
      
      users: (parent, args, context, info) => {
        return users;
      },
    },
    Mutation: {
      addUser: (parent, { firstName, lastName, email, username, password }, context, info) => {
        const newUser = { firstName, lastName, email, username, password };
        users.push(newUser);
        return newUser;
      },
      login: (parent, { username, password }, context, info) => {
        const user = users.find(user=> user.username === username);
        if (!user) throw new Error("User not found!")
        if (user.password != password) throw new Error("Password is incorrect");
        else return user;
      },
      editUser: (parent, { firstName, lastName, email, username, password }, context, info) => {
        const user = users.find(user=> user.username === username);
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        return user;
      },
     
    },
  };