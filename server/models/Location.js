import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const LocationSchema = new Schema ({
    name: {
      type: String,
      trim: true,
      required: 'Please enter Name of Location'
    },
  
    maleResidents: {
      type: Number,
      default: 0,
      required: 'Please enter the total size of male'
    },
  
    femaleResidents: {
      type: Number,
      default: 0,
      required: 'Please enter the total size of female'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

export default mongoose.model('Location', LocationSchema);