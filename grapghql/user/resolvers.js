const UserModel = require(`../../models/User`)
const EmailScalar = require('../../scalars/Email')

module.exports = {
  Email: EmailScalar,
  Query: {
    users: () => UserModel.find({}).exec(),
    user: (_, {id}) => UserModel.findById(id).exec(),
  },
  Mutation: {
    createUser: (_, args) => UserModel.create(args.input),

    updateUser: (_, {id, input}) => UserModel.findOneAndUpdate({ _id: id }, input, {useFindAndModify: false}).exec(),
    
    deleteUser: (_, {id}) => UserModel.findByIdAndDelete(id).exec()
  },
};