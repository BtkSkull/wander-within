export const SERVICES = [
  { value: "Individual Therapy", label: "Individual Therapy (50-60 min)", price: 999 },
  { value: "Child, Adolescent & Parent Support", label: "Child, Adolescent & Parent Support", price: 1199 },
  { value: "Relationship & Family Counseling", label: "Relationship & Family Counseling", price: 1799 },
  { value: "Group Programs & Mental Health Workshops", label: "Group Programs & Mental Health Workshops", price: 499 },
  { value: "Addiction Recovery & Lifestyle Wellness", label: "Addiction Recovery & Lifestyle Wellness", price: 1199 },
];

export function getPriceForService(serviceName) {
  const found = SERVICES.find((s) => s.value === serviceName);
  return found ? found.price : 999;
}