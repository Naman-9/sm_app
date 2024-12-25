import mongoose from 'mongoose';

export const connectDB = async (): Promise<Void> => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('MongoDB Connected.');
  } catch (error) {
    console.error('Database Connection Error:', error);
    process.exit(1);
  }
};

