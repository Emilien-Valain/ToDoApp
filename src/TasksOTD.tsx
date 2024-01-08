import React from 'react';
import { Todo } from './types'; // Assurez-vous que ce type est correctement défini dans vos types

interface TasksOTDProps {
  finishedTodos: Todo[];
}

const TasksOTD: React.FC<TasksOTDProps> = ({ finishedTodos }) => {

  const countTasksToday = (): number => {
    return finishedTodos.filter(todo => {
      return todo.dueDate?.toISOString().split('T')[0];
    }).length;
  };

  const tasksCountToday = countTasksToday();

  return (
    <div>
      <h3>Tasks Completed Today</h3>
      <p>{tasksCountToday} tasks completed today</p>
    </div>
  );
};

export default TasksOTD;
