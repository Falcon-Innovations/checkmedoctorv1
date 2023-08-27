export interface LoginResponse {
  status: string;
  token: string;
  data: Data;
}

interface Data {
  specialist: Specialist;
}

interface Specialist {
  _id: string;
  firstName: string;
  lastName: string;
  qualification: string;
  speciality: string;
  telephone: string;
  email: string;
  password: string;
  __v: number;
}
