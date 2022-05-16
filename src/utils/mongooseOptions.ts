const schemaOptions = {
  toJSON: {
    virtuals: true,
  },
  timestamps: true,
};

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export { schemaOptions, connectionOptions };
