// Owen Beattie Assignment 1 COMP3133 101379668

const { User, Employee } = require('./models'); 

const resolvers = {
    Query: {
        getAllEmployees: async () => {
            try {
                const employees = await Employee.find();
                return employees;
            } catch (error) {
                throw new Error('Cannot find employee');
            }
        },
        getEmployeeById: async (_, { id }) => {
            try {
                const employee = await Employee.findById(id);
                return employee;
            } catch (error) {
                throw new Error('Cannot find employee');
            }
        },
        login: async (_, { usernameOrEmail, password }) => {
            try {
                const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
                if (!user) {
                    throw new Error('User not found');
                }
                if (user.password !== password) {
                    throw new Error('Invalid password');
                }
                return user;
            } catch (error) {
                throw new Error('Failed to log user in');
            }
        },
    },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                throw new Error('Username or email already exists');
            }
            const newUser = await User.create({ username, email, password });
            return newUser;
        } catch (error) {
            throw new Error('Failed to add new user');
        }
    },
    addEmployee: async (_, { input }) => {
            try {
            const { first_name, last_name, email, gender, salary } = input;
            const newEmployee = await Employee.create({
                first_name,
                last_name,
                email,
                gender,
                salary,
            });
            return newEmployee;
            } catch (error) {
            throw new Error('Failed to add new employee');
            }
        },
    updateEmployee: async (_, { id, input }) => {
        try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id, 
            { $set: input }, 
            { new: true, runValidators: true }
        );
    
        if (!updatedEmployee) {
            throw new Error('No employee found');
        }
    
        return updatedEmployee;
        } catch (error) {
        throw new Error(error.message);
        }
    },
            
        deleteEmployee: async (_, { id }) => {
            try {
                const deletedEmployee = await Employee.findByIdAndDelete(id);
                return deletedEmployee;
            } catch (error) {
                throw new Error('Failed to delete employee');
            }
        },
    },
};

module.exports = resolvers;