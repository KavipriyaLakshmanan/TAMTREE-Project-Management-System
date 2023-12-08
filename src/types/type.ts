export type Project = {
  _id?: string;
  title: string;
  description: string;
  assignedTo: string;
  status: string;
  stories?: Storie[];
};

export type Storie = {
  _id?: string;
  name: string;
  description: string;
  tasks?: Task[];
};

export type Task = {
  _id: string;
  tname: string;
  description: string;
  duration: string;
  status: number;
};

export type Employee = {
  _id: string,
  employeeId: string,
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  gender: string;
}

export type ProjectProps = {
  projectDrawerOpen: boolean;
  projectDetail: Project;
  onDrawerClose: () => void;
  onSaveClick: (project: Project) => void;
};

