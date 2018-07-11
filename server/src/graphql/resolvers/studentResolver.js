import { Student } from '../../models';

export default {
  Query: {
    students: () => {
      return Student.find({}).populate({
        path: 'info'
      });
    },
    student: () => {}
  }
};
