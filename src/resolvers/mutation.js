const { prisma } = require("../database.js");

const Mutation = {
    registerStudent: (parent, args) => {
      return prisma.student.create({
        data: {
          email: args.email,
          fullName: args.fullName,
          dept: args.deptId && {
            connect: { id: args.deptId },
          },
        },
      });
    },
    enroll: (parent, args) => {
      return prisma.student.update({
        where: { id: Number(args.id) },
        data: {
          enrolled: true,
        },
      });
    },
  
    createTeacher: (parent, args) => {
      return prisma.teacher.create({
        data: {
          email: args.data.email,
          fullName: args.data.fullName,
          courses: {
            create: args.data.courses,
          },
        },
      });
    },
  
    createCourse: (parent, args) => {
      console.log(parent, args)
      return prisma.course.create({
        data: {
          code: args.code,
          title: args.title,
          teacher: args.teacherEmail && {
            connect: { email: args.teacherEmail },
          },
        },
      });
    },
  
    createDepartment: (parent, args) => {
      return prisma.department.create({
        data: {
          name: args.name,
          description: args.description,
        },
      });
    },
  };

  module.exports = {
    Mutation,
  }
  
  