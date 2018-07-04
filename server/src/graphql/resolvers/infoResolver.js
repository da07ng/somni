import { Info } from '../../models';

export default {
  Query: {
    infos: () => {
      return Info.find({});
    },
    info: (obj, args, context, info) => {
      return Info.findOne({ _id: args.id });
    }
  }
};
