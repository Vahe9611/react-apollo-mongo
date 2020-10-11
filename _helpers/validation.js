module.exports = () => next => async (root, args, context, info) => {
  if (!args.input) return 

  for (const [_, value] of Object.entries(args.input)) {
    const {error, message, ErrorType} = value;
    
    if( error ) throw new ErrorType(message);
  }

  return next(root, args, context, info);
};