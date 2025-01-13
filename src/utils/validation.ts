export const validatePhysicalInformation = (data: {
  height: string;
  weight: string;
  age: string;
  gender: string;
  activityLevel: string;
}) => {
  return !!(data.height && data.weight && data.age && data.gender && data.activityLevel);
};

